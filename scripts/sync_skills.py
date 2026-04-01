#!/usr/bin/env python3
"""
sync_skills.py — Scan evaluation docs folder, parse DOCX files, update skills.js

Usage:
  python3 scripts/sync_skills.py [--dry-run] [--commit] [--push]

Paths are configured as constants below. Edit them if your folder structure changes.
"""

import argparse
import json
import os
import re
import subprocess
import sys
import tempfile
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

# ─── CONFIGURATION ───
EVALUATIONS_DIR = Path(os.path.expanduser(
    "~/Library/CloudStorage/GoogleDrive-chip.alexandru@gmail.com/My Drive/"
    "++++ Claude consulting/10. Marketplace/Skills evaluation"
))
MARKETPLACE_DIR = Path(os.path.expanduser(
    "~/Library/CloudStorage/GoogleDrive-chip.alexandru@gmail.com/My Drive/"
    "++++ Claude consulting/10. Marketplace/files/skills-marketplace"
))
SKILLS_JS = MARKETPLACE_DIR / "lib" / "skills.js"
METADATA_JSON = EVALUATIONS_DIR / "metadata.json"

NS = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}

# ─── XML HELPERS ───

def get_text(element):
    """Get all text from a w:p or w:tc element."""
    parts = []
    for t in element.iter(f"{{{NS['w']}}}t"):
        if t.text:
            parts.append(t.text)
    return "".join(parts).strip()


def get_runs(p):
    """Get list of (text, is_bold) tuples from a paragraph."""
    runs = []
    for r in p.findall(f"{{{NS['w']}}}r", NS):
        rpr = r.find(f"{{{NS['w']}}}rPr", NS)
        is_bold = rpr is not None and rpr.find(f"{{{NS['w']}}}b", NS) is not None
        text = ""
        for t in r.findall(f"{{{NS['w']}}}t", NS):
            if t.text:
                text += t.text
        if text:
            runs.append((text, is_bold))
    return runs


def get_font_size(p):
    """Get font size (half-points) from first run of paragraph."""
    rpr = p.find(f".//{{{NS['w']}}}rPr", NS)
    if rpr is not None:
        sz = rpr.find(f"{{{NS['w']}}}sz", NS)
        if sz is not None:
            val = sz.get(f"{{{NS['w']}}}val")
            if val:
                return int(val)
    return 0


def get_color(p):
    """Get color value from first run of paragraph."""
    rpr = p.find(f".//{{{NS['w']}}}rPr", NS)
    if rpr is not None:
        color = rpr.find(f"{{{NS['w']}}}color", NS)
        if color is not None:
            return color.get(f"{{{NS['w']}}}val", "").upper()
    return ""


def get_font(p):
    """Get font name from first run of paragraph."""
    rpr = p.find(f".//{{{NS['w']}}}rPr", NS)
    if rpr is not None:
        fonts = rpr.find(f"{{{NS['w']}}}rFonts", NS)
        if fonts is not None:
            return fonts.get(f"{{{NS['w']}}}ascii", "")
    return ""


KNOWN_SECTIONS = {
    "WHAT IT DOES", "WHAT YOU CAN ASK", "INPUTS", "INPUT", "OUTPUT", "OUTPUTS",
    "TOOLS & INTEGRATIONS", "HOW IT WORKS", "SKILLS", "INSTALL",
}

def is_section_heading(p):
    """Check if paragraph is a section heading (uppercase, bold or orange)."""
    text = get_text(p)
    if not text:
        return False
    # Skip numbered lines like "1. Open the..."
    if re.match(r"^\d+[\.\)]\s", text):
        return False
    color = get_color(p)
    # Orange headings
    if color in ("E97316", "E9731600") and text == text.upper():
        return True
    runs = get_runs(p)
    all_text = "".join(t for t, _ in runs)
    # All-caps bold text (not numbers, not short)
    if runs and all(b for _, b in runs) and all_text == all_text.upper() and len(all_text) > 3:
        if not re.match(r"^\d+$", all_text.strip()):
            return True
    # Bold text matching a known section name (handles Title Case docs)
    if runs and all_text.upper().strip() in KNOWN_SECTIONS:
        if any(b for _, b in runs):
            return True
    return False


def get_table_data(tbl):
    """Extract table as list of rows, each row is list of cell texts."""
    rows = []
    for tr in tbl.findall(f"{{{NS['w']}}}tr", NS):
        cells = []
        for tc in tr.findall(f"{{{NS['w']}}}tc", NS):
            cells.append(get_text(tc))
        rows.append(cells)
    return rows


def get_table_cell_paragraphs(tbl):
    """Extract table as list of rows, each cell is list of paragraph texts."""
    rows = []
    for tr in tbl.findall(f"{{{NS['w']}}}tr", NS):
        cells = []
        for tc in tr.findall(f"{{{NS['w']}}}tc", NS):
            paras = []
            for p in tc.findall(f"{{{NS['w']}}}p", NS):
                text = get_text(p)
                if text:
                    paras.append(text)
            cells.append(paras)
        rows.append(cells)
    return rows


# ─── DOCX PARSER ───

def parse_evaluation_docx(docx_path):
    """Parse an evaluation DOCX and return structured skill data."""
    # Extract document.xml from the DOCX zip
    with tempfile.TemporaryDirectory() as tmpdir:
        with zipfile.ZipFile(docx_path, "r") as z:
            z.extract("word/document.xml", tmpdir)
        tree = ET.parse(os.path.join(tmpdir, "word", "document.xml"))

    root = tree.getroot()
    body = root.find(f"{{{NS['w']}}}body", NS)
    if body is None:
        raise ValueError(f"No w:body found in {docx_path}")

    # Collect all top-level elements (paragraphs and tables)
    elements = []
    for child in body:
        tag = child.tag.split("}")[-1] if "}" in child.tag else child.tag
        if tag == "p":
            elements.append(("p", child))
        elif tag == "tbl":
            elements.append(("tbl", child))

    # ─── State machine ───
    skill = {
        "category": "",
        "name": "",
        "version": "",
        "author": "",
        "description": "",
        "long_description": "",
        "use_cases": [],
        "inputs": [],
        "outputs": [],
        "tools": "",
        "how_it_works": [],
        "skills_list": [],
        "skills_summary": "",
        "install_steps": [],
    }

    current_section = "HEADER"
    i = 0

    while i < len(elements):
        etype, elem = elements[i]

        # ─── HEADER: category + name ───
        if current_section == "HEADER" and etype == "p":
            text = get_text(elem)
            if not text:
                i += 1
                continue

            # Category: orange colored, uppercase
            color = get_color(elem)
            if color in ("E97316", "E9731600") and text == text.upper():
                skill["category"] = text.title()
                i += 1
                continue

            # Skill name: large font (Georgia or large size)
            font = get_font(elem)
            size = get_font_size(elem)
            if font == "Georgia" or size >= 40:
                skill["name"] = text
                i += 1
                continue

            # Small header text like "Skills Marketplace · Evaluation Card" — skip
            if size <= 12:
                i += 1
                continue

        # ─── Version/Publisher/Category table ───
        if current_section == "HEADER" and etype == "tbl":
            rows = get_table_data(elem)
            if len(rows) >= 2:
                headers = [h.strip().lower() for h in rows[0]]
                # Layout A: 3-column horizontal (Version | Publisher | Category headers, then values row)
                if len(rows[0]) >= 3 and any("version" in h for h in headers):
                    values = rows[1]
                    for j, h in enumerate(headers):
                        if j < len(values):
                            if "version" in h:
                                skill["version"] = values[j].strip()
                            elif "publisher" in h:
                                skill["author"] = values[j].strip()
                            elif "category" in h:
                                skill["category"] = values[j].strip()
                # Layout B: 2-column vertical (Label | Value per row)
                elif len(rows[0]) == 2:
                    for row in rows:
                        if len(row) >= 2:
                            label = row[0].strip().lower()
                            value = row[1].strip()
                            if "version" in label:
                                skill["version"] = value
                            elif "publisher" in label:
                                skill["author"] = value
                            elif "category" in label:
                                skill["category"] = value
            # After the meta table, look for description paragraph
            current_section = "DESCRIPTION"
            i += 1
            continue

        # ─── Description (paragraph between meta table and first section heading) ───
        if current_section == "DESCRIPTION" and etype == "p":
            text = get_text(elem)
            if not text:
                i += 1
                continue
            if is_section_heading(elem):
                heading = text.upper().strip()
                current_section = heading
                i += 1
                continue
            # First non-empty paragraph after meta table is the description
            if not skill["description"]:
                skill["description"] = text
            i += 1
            continue

        # ─── Section heading detection ───
        if etype == "p" and is_section_heading(elem):
            text = get_text(elem).upper().strip()
            current_section = text
            i += 1
            continue

        # ─── WHAT IT DOES ───
        if current_section == "WHAT IT DOES":
            if etype == "p":
                text = get_text(elem)
                if text and not is_section_heading(elem):
                    if skill["long_description"]:
                        skill["long_description"] += " " + text
                    else:
                        skill["long_description"] = text
            elif etype == "tbl":
                # Could be use_cases table embedded without heading
                rows = get_table_data(elem)
                if len(rows) >= 1 and len(rows[0]) == 2:
                    skill["use_cases"] = _parse_use_cases_table(rows)
                    current_section = "AFTER_USE_CASES"
            i += 1
            continue

        # ─── WHAT YOU CAN ASK ───
        if current_section == "WHAT YOU CAN ASK":
            if etype == "tbl":
                rows = get_table_data(elem)
                skill["use_cases"] = _parse_use_cases_table(rows)
                current_section = "AFTER_USE_CASES"
            elif etype == "p":
                # Skip header row labels
                pass
            i += 1
            continue

        # ─── INPUTS ───
        if current_section == "INPUTS":
            if etype == "p":
                text = get_text(elem)
                if text and not is_section_heading(elem):
                    inp = _parse_input_line(text, get_runs(elem))
                    if inp:
                        skill["inputs"].append(inp)
            elif etype == "tbl":
                rows = get_table_data(elem)
                for row in rows:
                    text = " ".join(c for c in row if c.strip())
                    if text:
                        inp = _parse_input_line(text, [])
                        if inp:
                            skill["inputs"].append(inp)
            i += 1
            continue

        # ─── OUTPUT ───
        if current_section == "OUTPUT":
            if etype == "p":
                text = get_text(elem)
                if text and not is_section_heading(elem):
                    outputs = _parse_output_text(text, get_runs(elem))
                    skill["outputs"].extend(outputs)
            elif etype == "tbl":
                rows = get_table_data(elem)
                for row in rows:
                    text = " ".join(c for c in row if c.strip())
                    if text:
                        outputs = _parse_output_text(text, [])
                        skill["outputs"].extend(outputs)
            i += 1
            continue

        # ─── TOOLS & INTEGRATIONS ───
        if current_section == "TOOLS & INTEGRATIONS":
            if etype == "p":
                text = get_text(elem)
                if text and not is_section_heading(elem):
                    if skill["tools"]:
                        skill["tools"] += " " + text
                    else:
                        skill["tools"] = text
            i += 1
            continue

        # ─── HOW IT WORKS ───
        if current_section == "HOW IT WORKS":
            if etype == "p":
                text = get_text(elem)
                if text and not is_section_heading(elem):
                    # Skip bare step numbers
                    if re.match(r"^\d+$", text.strip()):
                        i += 1
                        continue
                    step = _parse_how_it_works_step(text)
                    if step:
                        skill["how_it_works"].append(step)
            elif etype == "tbl":
                rows = get_table_data(elem)
                for row in rows:
                    # Skip header rows
                    if any("step" in c.lower() for c in row):
                        continue
                    # Find the cell with the description (longest text)
                    text = max(row, key=len) if row else ""
                    if text:
                        step = _parse_how_it_works_step(text)
                        if step:
                            skill["how_it_works"].append(step)
            i += 1
            continue

        # ─── SKILLS ───
        if current_section == "SKILLS":
            if etype == "tbl":
                rows = get_table_data(elem)
                skill["skills_list"] = _parse_skills_table(rows)
            elif etype == "p":
                text = get_text(elem)
                if text and not is_section_heading(elem):
                    if skill["skills_summary"]:
                        skill["skills_summary"] += " " + text
                    else:
                        skill["skills_summary"] = text
            i += 1
            continue

        # ─── INSTALL ───
        if current_section == "INSTALL":
            if etype == "p":
                text = get_text(elem)
                if text and not is_section_heading(elem):
                    # Check for numbered steps
                    if re.match(r"^\d+\.", text.strip()):
                        step = re.sub(r"^\d+\.\s*", "", text.strip())
                        skill["install_steps"].append(step)
                    # Skip labels like "Cowork", "Claude Code"
                    elif text.strip().lower() not in ("cowork", "claude code"):
                        # Could be a description line — only add if no steps found yet
                        if not skill["install_steps"]:
                            # Check if the text contains embedded numbered steps
                            numbered = re.findall(r"\d+\.\s+([^0-9]+?)(?=\d+\.|$)", text)
                            if numbered:
                                for s in numbered:
                                    skill["install_steps"].append(s.strip())
                            else:
                                skill["install_steps"].append(text.strip())
            elif etype == "tbl":
                cell_paras = get_table_cell_paragraphs(elem)
                for row in cell_paras:
                    for paras in row:
                        for para in paras:
                            para = para.strip()
                            if re.match(r"^\d+\.", para):
                                step = re.sub(r"^\d+\.\s*", "", para)
                                if step:
                                    skill["install_steps"].append(step)
            i += 1
            continue

        i += 1

    return skill


def _parse_use_cases_table(rows):
    """Parse use cases from a 2-column table."""
    cases = []
    for row in rows:
        if len(row) < 2:
            continue
        ask = row[0].strip().strip("\u201c\u201d\"'")
        returns = row[1].strip()
        # Skip header rows
        if ask.lower() in ("your prompt", "prompt", "what you can ask", "what you ask"):
            continue
        if returns.lower() in ("what you get", "you get", "output"):
            continue
        # Strip leading arrow
        returns = re.sub(r"^[\u2192\u2794→>]\s*", "", returns)
        if ask and returns:
            cases.append({"ask": ask, "returns": returns})
    return cases


def _parse_input_line(text, runs):
    """Parse an input line into {label, detail, required}."""
    required = False

    # Pattern 1: "Required — Label (detail)" or "Required — Label"
    m = re.match(r"^(Required|Optional)\s*[\u2014\u2013—–-]+\s*(.+)", text, re.IGNORECASE)
    if m:
        required = m.group(1).lower() == "required"
        remainder = m.group(2).strip()
        # Try to split label from parenthetical detail
        pm = re.match(r"^(.+?)\s*\((.+)\)$", remainder)
        if pm:
            return {"label": pm.group(1).strip(), "detail": pm.group(2).strip(), "required": required}
        # Try split on " — "
        parts = re.split(r"\s*[\u2014\u2013—–]\s*", remainder, maxsplit=1)
        if len(parts) == 2:
            return {"label": parts[0].strip(), "detail": parts[1].strip(), "required": required}
        return {"label": remainder, "detail": "", "required": required}

    # Pattern 2: "Label (required) — detail"
    m = re.match(r"^(.+?)\s*\((required|optional)\)\s*[\u2014\u2013—–-]+\s*(.+)", text, re.IGNORECASE)
    if m:
        required = m.group(2).lower() == "required"
        return {"label": m.group(1).strip(), "detail": m.group(3).strip(), "required": required}

    # Pattern 3: Bold label — detail (from runs)
    if runs:
        bold_parts = []
        plain_parts = []
        for t, b in runs:
            if b:
                bold_parts.append(t)
            else:
                plain_parts.append(t)
        if bold_parts and plain_parts:
            label = "".join(bold_parts).strip().rstrip("\u2014\u2013—–- ")
            detail = "".join(plain_parts).strip().lstrip("\u2014\u2013—–- ")
            required = "(required)" in label.lower() or "required" in label.lower().split()[0:1]
            label = re.sub(r"\s*\((?:required|optional)\)", "", label, flags=re.IGNORECASE).strip()
            return {"label": label, "detail": detail, "required": required}

    # Fallback: split on " — "
    parts = re.split(r"\s*[\u2014\u2013—–]\s*", text, maxsplit=1)
    if len(parts) == 2:
        label = parts[0].strip()
        detail = parts[1].strip()
        required = "(required)" in text.lower()
        label = re.sub(r"\s*\((?:required|optional)\)", "", label, flags=re.IGNORECASE).strip()
        return {"label": label, "detail": detail, "required": required}

    return None


def _parse_output_text(text, runs):
    """Parse output text into list of {label, detail}."""
    outputs = []

    # Try splitting on " — " for multi-item paragraphs
    # Pattern: "Bold label details — Bold label details — ..."
    # First check if runs have bold/plain alternation
    if runs:
        current_label = ""
        current_detail = ""
        items = []
        for t, b in runs:
            if b and current_detail:
                # New bold item starts, save previous
                items.append({"label": current_label.strip(), "detail": current_detail.strip()})
                current_label = t
                current_detail = ""
            elif b:
                current_label += t
            else:
                current_detail += t
        if current_label:
            items.append({"label": current_label.strip(), "detail": current_detail.strip()})
        if items and any(i["detail"] for i in items):
            # Clean up em-dash separators
            for item in items:
                item["label"] = item["label"].rstrip("\u2014\u2013—–- ").strip()
                item["detail"] = item["detail"].lstrip("\u2014\u2013—–- ").strip()
            return [i for i in items if i["label"]]

    # Fallback: split on " — " delimiters
    segments = re.split(r"\s*[\u2014\u2013—–]\s*", text)
    if len(segments) >= 2:
        # Pair them: label, detail, label, detail...
        for j in range(0, len(segments) - 1, 2):
            outputs.append({
                "label": segments[j].strip(),
                "detail": segments[j + 1].strip() if j + 1 < len(segments) else "",
            })
        # Handle odd trailing segment
        if len(segments) % 2 == 1 and len(segments) > 1:
            outputs.append({"label": segments[-1].strip(), "detail": ""})
        return [o for o in outputs if o["label"]]

    # Single item
    if text.strip():
        return [{"label": text.strip(), "detail": ""}]
    return []


def _parse_how_it_works_step(text):
    """Parse a how-it-works step: 'Title — Detail'."""
    # Strip leading number
    text = re.sub(r"^\d+[\.\)]\s*", "", text.strip())
    parts = re.split(r"\s*[\u2014\u2013—–]\s*", text, maxsplit=1)
    if len(parts) == 2:
        return {"title": parts[0].strip(), "detail": parts[1].strip()}
    if text:
        return {"title": text, "detail": ""}
    return None


def _parse_skills_table(rows):
    """Parse skills table (Skill, Description, Type columns)."""
    skills = []
    for row in rows:
        if len(row) < 3:
            continue
        name = row[0].strip()
        desc = row[1].strip()
        stype = row[2].strip()
        # Skip header row
        if name.lower() in ("skill", "name"):
            continue
        if name:
            skills.append({"name": name, "description": desc, "type": stype})
    return skills


# ─── FOLDER SCANNER ───

def discover_evaluations(eval_dir):
    """Find evaluation DOCX files in subfolders matching the naming pattern."""
    pattern = re.compile(r"^(\d{4}-\d{2}-\d{2})\s+(.+?)\s+v([\d.]+\S*)$")
    found = {}

    for entry in sorted(eval_dir.iterdir()):
        if not entry.is_dir():
            continue
        m = pattern.match(entry.name)
        if not m:
            continue

        date_str = m.group(1)
        skill_name = m.group(2)
        version = m.group(3)

        # Find the "* - Evaluation.docx" file
        docx_files = list(entry.glob("* - Evaluation.docx"))
        if not docx_files:
            print(f"  SKIP {entry.name}: no '* - Evaluation.docx' found", file=sys.stderr)
            continue

        key = skill_name
        # Keep latest date + highest version if duplicates
        if key in found:
            existing = found[key]
            if (date_str, version) <= (existing["date"], existing["version"]):
                continue

        found[key] = {
            "date": date_str,
            "skill_name": skill_name,
            "folder_version": version,
            "docx_path": docx_files[0],
        }

    return found


# ─── SKILLS.JS WRITER ───

def to_slug(name):
    """Convert skill name to URL slug."""
    slug = name.lower().strip()
    slug = re.sub(r"[^a-z0-9\s-]", "", slug)
    slug = re.sub(r"[\s]+", "-", slug)
    slug = re.sub(r"-+", "-", slug).strip("-")
    return slug


def is_valid_semver(v):
    """Check if version string is valid semver-ish."""
    return bool(re.match(r"^\d+\.\d+\.\d+", v))


def build_skills_array(parsed_skills, metadata, existing_skills=None):
    """Build the final SKILLS array for skills.js."""
    existing_by_slug = {}
    if existing_skills:
        for s in existing_skills:
            existing_by_slug[s.get("slug", "")] = s

    max_id = max((s.get("id", 0) for s in (existing_skills or [])), default=0)
    result = []

    for skill_name, data in sorted(parsed_skills.items()):
        parsed = data["parsed"]
        slug = to_slug(parsed["name"])

        # Version: prefer parsed if valid semver, else folder version
        version = parsed["version"]
        if not is_valid_semver(version):
            version = data["folder_version"]
        if not is_valid_semver(version):
            version = "0.0.1"

        # Metadata for industries/functions/rating
        meta = metadata.get(skill_name, {})
        industries = meta.get("industries", [])
        functions = meta.get("functions", [])
        rating = meta.get("rating", None)
        if not industries and not functions:
            print(f"  WARN {skill_name}: no industries/functions in metadata.json", file=sys.stderr)

        # Preserve existing fields (installs, stars, badge)
        existing = existing_by_slug.get(slug, {})
        skill_id = existing.get("id", max_id + 1)
        if skill_id > max_id:
            max_id = skill_id

        # Fall back to first sentence of long_description if description is empty
        description = parsed["description"]
        if not description and parsed["long_description"]:
            first_sentence = re.split(r"(?<=[.!?])\s", parsed["long_description"])[0]
            description = first_sentence[:200] if len(first_sentence) > 200 else first_sentence

        entry = {
            "id": skill_id,
            "slug": slug,
            "name": parsed["name"],
            "author": parsed["author"] or "Unknown",
            "description": description,
            "long_description": parsed["long_description"],
            "repo_url": existing.get("repo_url", None),
            "installs": existing.get("installs", 0),
            "stars": existing.get("stars", 0),
            "badge": existing.get("badge", None),
            "rating": rating,
            "version": version,
            "category": parsed["category"],
            "industries": industries,
            "functions": functions,
            "use_cases": parsed["use_cases"],
            "inputs": parsed["inputs"],
            "outputs": parsed["outputs"],
            "how_it_works": parsed["how_it_works"],
            "tools": parsed["tools"],
        }

        if parsed["skills_list"]:
            entry["skills_list"] = parsed["skills_list"]
        elif parsed["skills_summary"]:
            entry["skills_summary"] = parsed["skills_summary"]

        if parsed["install_steps"]:
            entry["install_steps"] = parsed["install_steps"]

        result.append(entry)

    # Sort by id
    result.sort(key=lambda s: s["id"])
    return result


def skills_to_js(skills_array):
    """Convert skills array to skills.js file content."""
    # Use json.dumps then convert to JS style (unquoted keys)
    raw = json.dumps(skills_array, indent=2, ensure_ascii=False)
    # Unquote keys that are valid JS identifiers
    js = re.sub(r'"([a-zA-Z_]\w*)":', r"\1:", raw)
    # Convert Python null to JS null (json.dumps already does this)
    # Convert true/false (json.dumps already outputs lowercase)
    return (
        "// All skill data lives here. Add, edit, or remove skills — push to deploy.\n\n"
        f"export const SKILLS = {js};\n"
    )


def read_existing_skills():
    """Parse existing skills.js to get current skill data."""
    if not SKILLS_JS.exists():
        return []
    content = SKILLS_JS.read_text()
    # Extract the array portion
    m = re.search(r"export const SKILLS\s*=\s*(\[.*\]);", content, re.DOTALL)
    if not m:
        return []
    array_str = m.group(1)
    # Convert JS to valid JSON: add quotes to keys
    json_str = re.sub(r"(\w+):", r'"\1":', array_str)
    # Handle trailing commas
    json_str = re.sub(r",\s*([}\]])", r"\1", json_str)
    try:
        return json.loads(json_str)
    except json.JSONDecodeError as e:
        print(f"  WARN: Could not parse existing skills.js: {e}", file=sys.stderr)
        return []


# ─── MAIN ───

def main():
    parser = argparse.ArgumentParser(description="Sync evaluation docs to skills.js")
    parser.add_argument("--dry-run", action="store_true", help="Print output without writing files")
    parser.add_argument("--commit", action="store_true", help="Git commit after updating")
    parser.add_argument("--push", action="store_true", help="Git push after committing")
    args = parser.parse_args()

    print(f"Scanning: {EVALUATIONS_DIR}")

    # Load metadata
    if METADATA_JSON.exists():
        metadata = json.loads(METADATA_JSON.read_text())
    else:
        print("  WARN: metadata.json not found, industries/functions will be empty", file=sys.stderr)
        metadata = {}

    # Discover evaluation folders
    evals = discover_evaluations(EVALUATIONS_DIR)
    if not evals:
        print("  No evaluation docs found.")
        return

    print(f"  Found {len(evals)} evaluation(s):")
    for name, data in sorted(evals.items()):
        print(f"    - {name} v{data['folder_version']} ({data['date']})")

    # Parse each DOCX
    parsed = {}
    for name, data in evals.items():
        print(f"\n  Parsing: {data['docx_path'].name}")
        try:
            result = parse_evaluation_docx(data["docx_path"])
            data["parsed"] = result
            parsed[name] = data
            print(f"    name: {result['name']}")
            print(f"    category: {result['category']}")
            print(f"    version: {result['version']}")
            print(f"    use_cases: {len(result['use_cases'])}")
            print(f"    inputs: {len(result['inputs'])}")
            print(f"    outputs: {len(result['outputs'])}")
            print(f"    how_it_works: {len(result['how_it_works'])}")
            print(f"    skills_list: {len(result['skills_list'])}")
            print(f"    install_steps: {len(result['install_steps'])}")
        except Exception as e:
            print(f"    ERROR: {e}", file=sys.stderr)

    if not parsed:
        print("\n  No skills parsed successfully.")
        return

    # Read existing skills for ID preservation
    existing = read_existing_skills()

    # Build skills array
    skills_array = build_skills_array(parsed, metadata, existing)

    # Generate JS
    js_content = skills_to_js(skills_array)

    if args.dry_run:
        print("\n─── DRY RUN: skills.js would be ───")
        print(js_content)
        return

    # Write skills.js
    SKILLS_JS.write_text(js_content)
    print(f"\n  Updated: {SKILLS_JS}")
    print(f"  Skills: {len(skills_array)}")

    # Git operations
    if args.commit:
        skill_names = [f"{s['name']} v{s['version']}" for s in skills_array]
        msg = f"Update skills: {', '.join(skill_names)}"
        subprocess.run(["git", "add", "lib/skills.js"], cwd=MARKETPLACE_DIR)
        subprocess.run(["git", "commit", "-m", msg], cwd=MARKETPLACE_DIR)
        print(f"  Committed: {msg}")

        if args.push:
            subprocess.run(["git", "push"], cwd=MARKETPLACE_DIR)
            print("  Pushed to remote.")


if __name__ == "__main__":
    main()
