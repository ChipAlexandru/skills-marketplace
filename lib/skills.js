// All skill data lives here. Add, edit, or remove skills — push to deploy.

export const SKILLS = [
  {
    id: 1,
    slug: "data",
    name: "Data",
    author: "Unknown",
    description: "Turn raw data into validated insights, interactive dashboards, and publication-quality charts — from a single conversation.",
    long_description: "This plugin transforms Claude into a data analyst collaborator that handles the full analytics workflow. Upload a spreadsheet or connect a data warehouse, ask a question in plain language, and get back validated findings with charts — not just raw numbers. It works with any SQL dialect and produces self-contained deliverables that open in any browser.",
    repo_url: null,
    installs: 0,
    stars: 0,
    badge: null,
    version: "1.1.0",
    category: "Data Analytics & Business Intelligence",
    industries: [
      "financial",
      "retail",
      "cpg",
      "industrials",
      "tmt",
      "healthcare",
      "logistics"
    ],
    functions: [
      "data",
      "operations",
      "finance",
      "strategy"
    ],
    use_cases: [
      {
        ask: "What's driving the drop in our conversion rate this quarter?",
        returns: "A multi-dimensional analysis breaking down conversion by channel, device, and cohort — with charts highlighting the key driver and caveats noted before you share it"
      },
      {
        ask: "Explore our orders table and tell me what's interesting",
        returns: "A full data profile covering row counts, null rates, distributions, quality flags, and recommended follow-up analyses — so you know what to trust before building on it"
      },
      {
        ask: "Build me a dashboard showing monthly revenue, top products, and regional breakdown",
        returns: "A self-contained interactive HTML file with KPI cards, filterable Chart.js visualizations, and a sortable detail table — opens in any browser, no server needed"
      }
    ],
    inputs: [
      {
        label: "CSV or Excel files",
        detail: "required if no warehouse connected",
        required: false
      },
      {
        label: "Natural-language questions or analysis requests",
        detail: "required",
        required: false
      },
      {
        label: "Data warehouse connection via MCP server",
        detail: "optional — enables direct querying",
        required: false
      },
      {
        label: "SQL dialect preference",
        detail: "optional — auto-detected when warehouse connected",
        required: false
      },
      {
        label: "Chart type or dashboard layout preferences",
        detail: "optional",
        required: false
      }
    ],
    outputs: [
      {
        label: "Narrative analysis reports with embedded findings and caveats",
        detail: ""
      },
      {
        label: "Interactive HTML dashboards with Chart.js charts and dropdown filters",
        detail: ""
      },
      {
        label: "Publication-quality PNG charts generated with matplotlib or plotly",
        detail: ""
      },
      {
        label: "Optimized SQL queries with dialect-specific syntax and performance notes",
        detail: ""
      },
      {
        label: "Data profiling summaries with quality scores and follow-up recommendations",
        detail: ""
      },
      {
        label: "Pre-delivery validation reports rating analysis readiness",
        detail: ""
      }
    ],
    how_it_works: [
      {
        title: "Adaptive complexity routing",
        detail: "Classifies each question as a quick lookup, full analysis, or formal report, then adjusts the depth of SQL, validation, and narrative accordingly, so a simple count finishes in seconds while a quarterly review gets the rigor it needs."
      },
      {
        title: "Built-in validation before delivery",
        detail: "Every analysis passes through sanity checks (row counts, null rates, magnitude plausibility, trend continuity) before results are shown, catching errors that typically surface only after a stakeholder asks an awkward question."
      },
      {
        title: "Dialect-aware SQL generation",
        detail: "Writes optimized queries for the user's specific warehouse, using partition filters, clustering keys, and dialect-specific functions, reducing both query cost and analyst back-and-forth."
      },
      {
        title: "Self-contained dashboard output",
        detail: "Produces single HTML files with embedded data, Chart.js visualizations, and filter logic that open in any browser with no server, so anyone on the team can interact with the results immediately."
      },
      {
        title: "Statistical guardrails",
        detail: "Applies standard caution around correlation-versus-causation, survivorship bias, average-of-averages, and small sample sizes, flagging risks before conclusions are drawn rather than after."
      },
      {
        title: "Company-context learning",
        detail: "The Data Context Extractor captures tribal knowledge (entity definitions, metric formulas, standard filters, common gotchas) into a reusable skill, so the plugin remembers how your organization defines \"active user\" or \"revenue\" across future sessions."
      }
    ],
    tools: "Works standalone with uploaded files. Connects optionally to data warehouses (Snowflake, BigQuery, Databricks, Redshift, PostgreSQL), notebook platforms (Hex, Jupyter), product analytics tools (Amplitude, Mixpanel), and project trackers (Jira, Confluence) via MCP servers.",
    skills_list: [
      {
        name: "analyze",
        description: "Answer data questions from quick lookups to full formal reports",
        type: "Invocable"
      },
      {
        name: "explore-data",
        description: "Profile a dataset's shape, quality, and patterns before analysis",
        type: "Invocable"
      },
      {
        name: "build-dashboard",
        description: "Build interactive HTML dashboards with KPI cards, charts, and filters",
        type: "Invocable"
      },
      {
        name: "create-viz",
        description: "Generate publication-quality Python visualizations",
        type: "Invocable"
      },
      {
        name: "validate-data",
        description: "QA an analysis for methodology, accuracy, and bias before sharing",
        type: "Invocable"
      },
      {
        name: "write-query",
        description: "Write optimized SQL for any dialect with performance notes",
        type: "Invocable"
      },
      {
        name: "data-context-extractor",
        description: "Generate company-specific data skills from analyst tribal knowledge",
        type: "Invocable"
      },
      {
        name: "sql-queries",
        description: "Reference library of SQL patterns, dialect syntax, and performance tips",
        type: "Reference"
      },
      {
        name: "data-visualization",
        description: "Chart selection guide, design principles, and Python code patterns",
        type: "Reference"
      },
      {
        name: "statistical-analysis",
        description: "Statistical methods, trend analysis, outlier detection, and hypothesis testing",
        type: "Reference"
      }
    ],
    install_steps: [
      "Method 1 — Browse (Anthropic plugins)"
    ]
  },
  {
    id: 2,
    slug: "finance",
    name: "Finance",
    author: "Anthropic",
    description: "Automate month-end close, journal entries, reconciliations, variance analysis, and SOX testing so your finance team closes faster and audits cleaner.",
    long_description: "This plugin handles the core workflows of a corporate accounting team: preparing journal entries, reconciling accounts, generating financial statements with variance analysis, managing the month-end close process, and supporting SOX 404 compliance testing. It works standalone from uploaded spreadsheets or pasted data, and becomes more powerful when connected to your ERP, data warehouse, or BI tools via MCP integrations.",
    repo_url: null,
    installs: 0,
    stars: 0,
    badge: null,
    version: "1.2.0",
    category: "Finance & Accounting",
    industries: [
      "financial",
      "retail",
      "cpg",
      "industrials",
      "tmt",
      "healthcare",
      "privatecapital"
    ],
    functions: [
      "finance",
      "risk",
      "operations"
    ],
    use_cases: [
      {
        ask: "Book AP accruals for December 2025",
        returns: "Formatted journal entry with debits, credits, department codes, supporting calculations, reversal flag, and a review checklist"
      },
      {
        ask: "Reconcile our bank account for March",
        returns: "Two-sided reconciliation showing adjusted bank and GL balances, categorized reconciling items with aging analysis, and escalation flags for stale items"
      },
      {
        ask: "Run SOX testing for revenue recognition Q4",
        returns: "Control matrix, risk-based sample selections, testing workpaper templates with pre-built test steps, and a deficiency classification framework"
      }
    ],
    inputs: [
      {
        label: "Trial balance or GL account data",
        detail: "paste, upload spreadsheet, or connect ERP",
        required: true
      },
      {
        label: "Prior period data for comparison, budget/forecast figures, bank statements, fixed asset registers, depreciation schedules, contract details for revenue recognition, and organization-specific materiality thresholds",
        detail: "",
        required: false
      }
    ],
    outputs: [
      {
        label: "Formatted journal entries with debits, credits, and supporting detail",
        detail: "Account reconciliation workpapers with categorized reconciling items"
      },
      {
        label: "Multi-column income statements with variance flags and key metrics",
        detail: "Waterfall variance decompositions with narrative explanations"
      },
      {
        label: "SOX control matrices, sample selections, and testing workpaper templates",
        detail: "Month-end close checklists with task sequencing and status tracking"
      }
    ],
    how_it_works: [
      {
        title: "Structured entry templates",
        detail: "Generates journal entries in standard accounting format with balanced debits and credits, department coding, and auto-reversal flags, so entries are audit-ready before they reach the reviewer."
      },
      {
        title: "Two-sided reconciliation",
        detail: "Compares GL balances against bank statements or subledgers from both directions, categorizes every reconciling item by type (timing, adjustment, investigation), and ages outstanding items to surface stale balances that need attention."
      },
      {
        title: "Variance decomposition",
        detail: "Breaks down financial variances into specific business drivers (volume, price, mix, timing, one-time) using standard analytical techniques, so leadership sees the \"why\" behind the numbers rather than just the gap."
      },
      {
        title: "Materiality-driven flagging",
        detail: "Applies configurable dollar and percentage thresholds to automatically highlight variances that warrant investigation, preventing both over-analysis of immaterial items and under-investigation of significant ones."
      },
      {
        title: "Risk-based sample selection",
        detail: "Calculates SOX testing sample sizes based on control frequency, risk level, and prior-year results, then generates random or targeted sample selections with full documentation of the selection methodology."
      },
      {
        title: "Close sequencing engine",
        detail: "Maps task dependencies across the entire month-end close process, identifies the critical path, and provides day-by-day checklists with status tracking so nothing falls through the cracks."
      }
    ],
    tools: "Works standalone from uploaded files or pasted data. Optionally connects to ERP/accounting systems (NetSuite, SAP), data warehouses (Snowflake, BigQuery, Databricks), spreadsheet tools, BI platforms (Tableau, Looker), email (Microsoft 365), and team chat (Slack) for automated data pulls and status updates.",
    skills_list: [
      {
        name: "journal-entry",
        description: "Prepare journal entries with debits, credits, and supporting detail for any standard entry type",
        type: "Invocable"
      },
      {
        name: "journal-entry-prep",
        description: "Best practices, standard accrual types, documentation requirements, and review workflows",
        type: "Reference"
      },
      {
        name: "reconciliation",
        description: "Account reconciliation methodology for GL-to-subledger, bank, and intercompany",
        type: "Invocable"
      },
      {
        name: "financial-statements",
        description: "Income statement, balance sheet, and cash flow generation with GAAP presentation",
        type: "Invocable"
      },
      {
        name: "variance-analysis",
        description: "Variance decomposition, waterfall analysis, and narrative generation",
        type: "Invocable"
      },
      {
        name: "sox-testing",
        description: "SOX 404 sample selections, testing workpapers, and control assessments",
        type: "Invocable"
      },
      {
        name: "close-management",
        description: "Month-end close checklists, task sequencing, dependencies, and status tracking",
        type: "Reference"
      },
      {
        name: "audit-support",
        description: "SOX 404 testing methodology, documentation standards, and deficiency classification",
        type: "Reference"
      }
    ],
    install_steps: [
      "Open the Claude Desktop app and switch to the Cowork tab",
      "Click Customize in the left sidebar, then Browse plugins",
      "Search for “Finance” and click Install"
    ]
  },
  {
    id: 3,
    slug: "human-resources",
    name: "Human Resources",
    author: "Anthropic",
    description: "Turn people operations into structured, audit-ready deliverables — from offer letters and onboarding plans to compensation benchmarks and calibration packages.",
    long_description: "The Human Resources plugin handles the full people operations lifecycle. It drafts offer letters with complete compensation packages and negotiation guidance, generates onboarding checklists with day-by-day schedules, structures performance reviews with self-assessment templates and calibration documents, benchmarks compensation against market data, and produces workforce analytics reports covering headcount, attrition, and diversity. Every deliverable follows a consistent, professional format ready for leadership review.",
    repo_url: null,
    installs: 0,
    stars: 0,
    badge: null,
    version: "1.2.0",
    category: "Human Resources & People Operations",
    industries: [
      "financial",
      "retail",
      "cpg",
      "industrials",
      "tmt",
      "healthcare"
    ],
    functions: [
      "people",
      "operations"
    ],
    use_cases: [
      {
        ask: "What should we pay a Senior Product Manager in Austin?",
        returns: "Percentile-banded compensation table with base, equity, and total comp benchmarks, location adjustment, and retention risk flags"
      },
      {
        ask: "Prep calibration for my team's H1 performance reviews",
        returns: "Rating distribution table, promotion candidates with evidence, compensation action recommendations, and discussion points for borderline cases"
      },
      {
        ask: "Generate a headcount and attrition report from this employee data",
        returns: "Executive summary with key metrics, department-level breakdown, turnover trends, flight risk indicators, and data-driven retention recommendations"
      }
    ],
    inputs: [
      {
        label: "Role details",
        detail: "(required for offers and comp) — title, level, location, hiring manager",
        required: false
      },
      {
        label: "Compensation parameters",
        detail: "(required for offers, optional for comp) — base salary, equity, signing bonus, vesting schedule",
        required: false
      },
      {
        label: "Employee data file —",
        detail: "CSV or spreadsheet with names, departments, titles, levels, start dates, compensation, demographics",
        required: false
      },
      {
        label: "Review context —",
        detail: "review period, employee accomplishments, goals from prior cycle",
        required: false
      },
      {
        label: "Policy documents —",
        detail: "employee handbook text or connected knowledge base for policy lookup",
        required: false
      }
    ],
    outputs: [
      {
        label: "Offer letters",
        detail: "complete draft with compensation table, terms, benefits summary, and hiring manager negotiation notes"
      },
      {
        label: "Onboarding plans",
        detail: "pre-start checklist, Day 1 schedule, Week 1 tasks, 30/60/90-day goals, key contacts, and tool access matrix"
      },
      {
        label: "Performance reviews",
        detail: "self-assessment templates, manager review forms with behavioral examples, and calibration packages with rating distributions"
      },
      {
        label: "Compensation analysis",
        detail: "market benchmark tables at four percentile bands, band placement analysis, outlier flags, and equity modeling"
      },
      {
        label: "People reports",
        detail: "executive summaries with key metrics, departmental breakdowns, trend analysis, and action recommendations"
      }
    ],
    how_it_works: [
      {
        title: "Role-aware compensation framing",
        detail: "Structures every compensation discussion around total comp (base, equity, bonus, benefits) rather than just salary, ensuring candidates and managers see the full picture."
      },
      {
        title: "Competency-mapped interview design",
        detail: "Maps each interview question to a specific skill or behavior the role requires, then scores them on a consistent rubric so hiring decisions are based on evidence rather than gut feel."
      },
      {
        title: "Calibration-ready review packaging",
        detail: "Bundles individual performance assessments into a team-level view with rating distributions and promotion cases, so managers walk into calibration meetings prepared."
      },
      {
        title: "Structured onboarding sequencing",
        detail: "Breaks the new hire experience into timed phases (pre-start, Day 1, Week 1, 30/60/90 days) with owner assignments, ensuring nothing falls through the cracks."
      },
      {
        title: "Multi-dimension workforce analytics",
        detail: "Slices employee data across departments, levels, tenure, and demographics simultaneously, surfacing patterns (like attrition clustering in a specific team) that single-dimension reports miss."
      }
    ],
    tools: "Works entirely standalone — provide details manually or upload data files. Optionally connects to HRIS systems (Workday, BambooHR, Rippling) for live employee data, applicant tracking systems (Greenhouse, Lever, Ashby) for pipeline management, compensation platforms (Pave, Radford) for verified benchmarks, knowledge bases (Notion, Confluence) for policy documents, and communication tools (Slack, Gmail, Calendar) for candidate coordination and scheduling.",
    skills_list: [
      {
        name: "comp-analysis",
        description: "Benchmark compensation against market data with percentile bands, band placement, and equity modeling",
        type: "Invocable"
      },
      {
        name: "draft-offer",
        description: "Draft complete offer letters with compensation tables, terms, and negotiation guidance",
        type: "Invocable"
      },
      {
        name: "interview-prep",
        description: "Create structured interview plans with competency-mapped questions and scoring rubrics",
        type: "Reference"
      },
      {
        name: "onboarding",
        description: "Generate phased onboarding plans with checklists, schedules, and goal-setting",
        type: "Invocable"
      },
      {
        name: "org-planning",
        description: "Model headcount plans, org structure, and team design with cost analysis",
        type: "Reference"
      },
      {
        name: "people-report",
        description: "Produce workforce analytics reports on headcount, attrition, diversity, and org health",
        type: "Invocable"
      },
      {
        name: "performance-review",
        description: "Structure reviews with self-assessments, manager templates, and calibration packages",
        type: "Invocable"
      },
      {
        name: "policy-lookup",
        description: "Search and explain company policies in plain language from connected knowledge bases",
        type: "Invocable"
      },
      {
        name: "recruiting-pipeline",
        description: "Track candidates through pipeline stages with conversion metrics",
        type: "Reference"
      }
    ],
    install_steps: [
      "This plugin is available through the Anthropic open-source repository and can also be installed via direct upload."
    ]
  },
  {
    id: 4,
    slug: "legal",
    name: "Legal",
    author: "Unknown",
    description: "Automates contract review, NDA triage, compliance checks, and legal briefings so in-house counsel can focus on judgment calls.",
    long_description: "The Legal plugin turns contract review, NDA screening, and compliance checks into structured, repeatable workflows for in-house legal teams. Instead of starting from scratch on every agreement, counsel reviews AI-generated analysis anchored to their own negotiation playbook and risk framework. The plugin also consolidates vendor agreement status, generates legal briefings from connected tools, and produces templated responses with built-in escalation safeguards.",
    repo_url: null,
    installs: 0,
    stars: 0,
    badge: null,
    version: "1.2.0",
    category: "Legal & Compliance",
    industries: [
      "financial",
      "retail",
      "cpg",
      "industrials",
      "tmt",
      "healthcare",
      "privatecapital"
    ],
    functions: [
      "legal",
      "risk",
      "operations"
    ],
    use_cases: [
      {
        ask: "What you ask",
        returns: "What you get"
      },
      {
        ask: "Review this vendor MSA and flag anything outside our playbook",
        returns: "Clause-by-clause analysis with GREEN/YELLOW/RED ratings, specific redline language, negotiation strategy, and business impact summary"
      },
      {
        ask: "Triage this NDA from the sales team — can we sign as-is?",
        returns: "Screening report classifying the NDA as GREEN (approve), YELLOW (counsel review), or RED (reject/counter), with specific issues flagged and suggested fixes"
      },
      {
        ask: "Run a compliance check on launching biometric login in our EU app",
        returns: "Applicable regulations mapped (GDPR, ePrivacy), requirements checklist with status, risk areas ranked by severity, and recommended approvals"
      }
    ],
    inputs: [
      {
        label: "Contract or NDA document",
        detail: "PDF, DOCX, or pasted text for review and triage skills",
        required: true
      },
      {
        label: "Negotiation playbook",
        detail: "Organization-specific standard positions, acceptable ranges, and escalation triggers configured in a local settings file",
        required: false
      },
      {
        label: "Business context",
        detail: "Your side of the deal, deadline, focus areas, and deal size to tailor analysis",
        required: false
      },
      {
        label: "Initiative description (required for compliance)",
        detail: "Plain-language description of a proposed action, feature, or campaign to check against regulations",
        required: false
      },
      {
        label: "Vendor name (required for vendor check)",
        detail: "Company name to search across connected systems",
        required: false
      }
    ],
    outputs: [
      {
        label: "Contract review report",
        detail: "Clause-by-clause analysis with deviation flags, specific redline language, fallback positions, and a negotiation strategy organized by priority tier"
      },
      {
        label: "NDA triage report",
        detail: "Screening checklist results, GREEN/YELLOW/RED classification, flagged issues with suggested fixes, and routing recommendation"
      },
      {
        label: "Compliance assessment",
        detail: "Regulation-to-requirement mapping, requirements checklist, risk matrix, approval chain, and recommended actions"
      },
      {
        label: "Risk assessment memo",
        detail: "Formal risk memo with severity-by-likelihood scoring, mitigation options, residual risk estimate, and monitoring plan"
      },
      {
        label: "Legal briefings",
        detail: "Structured daily, topic, or incident briefings compiled from connected sources with action items"
      },
      {
        label: "Templated responses",
        detail: "Customized legal responses for data subject requests, discovery holds, vendor inquiries, NDA requests, and subpoenas"
      }
    ],
    how_it_works: [
      {
        title: "Playbook-anchored review",
        detail: "Every contract clause is compared against your organization’s own standard positions, acceptable ranges, and escalation triggers — so the output reflects your risk appetite, not generic advice."
      },
      {
        title: "Three-tier triage classification",
        detail: "Incoming NDAs and contract clauses are classified GREEN, YELLOW, or RED, giving reviewers an instant priority map and clear routing for signature, counsel review, or rejection."
      },
      {
        title: "Regulation-aware compliance mapping",
        detail: "Proposed business actions are matched against applicable privacy and data-protection regulations (GDPR, CCPA, PIPL, and others) with jurisdiction-specific requirements and timelines."
      },
      {
        title: "Structured risk scoring",
        detail: "Legal risks are scored on a severity-times-likelihood matrix (1–25) with defined escalation paths, so the team applies a consistent framework instead of ad-hoc judgment."
      },
      {
        title: "Multi-source context gathering",
        detail: "Briefings and vendor checks pull from email, calendar, chat, document storage, and CLM simultaneously, assembling a single view that would otherwise require manual searches across systems."
      },
      {
        title: "Escalation-gated templating",
        detail: "Templated legal responses include built-in escalation triggers that block the template and route to counsel when the situation is too complex or sensitive for a standard reply."
      }
    ],
    tools: "Works standalone with uploaded documents and user-provided context. Connects optionally to Slack, Gmail, Google Calendar, Box, Egnyte, Microsoft 365, Atlassian (Jira/Confluence), DocuSign, and CLM or CRM systems via MCP. When tools are not connected, the plugin notes gaps and suggests manual checks.",
    skills_list: [
      {
        name: "review-contract",
        description: "Review contracts clause-by-clause against your negotiation playbook",
        type: "Invocable"
      },
      {
        name: "triage-nda",
        description: "Screen incoming NDAs and classify as GREEN/YELLOW/RED for routing",
        type: "Invocable"
      },
      {
        name: "compliance-check",
        description: "Check proposed actions against applicable regulations and flag requirements",
        type: "Invocable"
      },
      {
        name: "legal-risk-assessment",
        description: "Score legal risks on a severity-by-likelihood matrix with escalation paths",
        type: "Invocable"
      },
      {
        name: "brief",
        description: "Generate daily, topic, or incident briefings from connected sources",
        type: "Invocable"
      },
      {
        name: "meeting-briefing",
        description: "Prepare structured meeting briefings with legal context and action tracking",
        type: "Invocable"
      },
      {
        name: "legal-response",
        description: "Generate templated responses with escalation gates for common inquiries",
        type: "Invocable"
      },
      {
        name: "vendor-check",
        description: "Consolidate vendor agreement status and gap analysis across systems",
        type: "Invocable"
      },
      {
        name: "signature-request",
        description: "Run pre-signature checklists and route documents for e-signature",
        type: "Invocable"
      }
    ],
    install_steps: [
      "Open the Claude Desktop app and switch to the Cowork tab",
      "Click Customize in the left sidebar, then Browse plugins",
      "Search for \"Legal\" and click Install"
    ]
  },
  {
    id: 5,
    slug: "marketing",
    name: "Marketing",
    author: "Unknown",
    description: "Turn marketing goals into structured campaign plans, brand-consistent content, and data-driven performance reports without switching tools.",
    long_description: "The Marketing plugin handles the full marketing workflow from planning through execution and measurement. Give it a campaign objective, and it produces a complete brief with audience segmentation, channel strategy, content calendar, and success metrics. Hand it a draft, and it checks the copy against your brand voice, flags compliance risks, and suggests specific rewrites. At the end of a campaign cycle, feed it your performance data and it returns an executive report with trend analysis, attribution insights, and prioritized next-period recommendations.",
    repo_url: null,
    installs: 0,
    stars: 0,
    badge: null,
    version: "1.2.0",
    category: "Marketing & Content",
    industries: [
      "retail",
      "cpg",
      "tmt",
      "travel",
      "healthcare"
    ],
    functions: [
      "marketing",
      "sales",
      "strategy"
    ],
    use_cases: [
      {
        ask: "You Ask...",
        returns: "You Get..."
      },
      {
        ask: "Plan a 6-week product launch campaign targeting enterprise CTOs with a $25K budget",
        returns: "A complete campaign brief with SMART objectives, audience profile, core messaging, channel-by-channel strategy with budget splits, a week-by-week content calendar, and KPIs with targets"
      },
      {
        ask: "Review this blog post against our brand voice and flag anything that could be a compliance issue",
        returns: "A severity-ranked findings table covering voice deviations, terminology violations, and legal flags, plus before-and-after rewrites for the top issues"
      },
      {
        ask: "Build a monthly performance report from this campaign data and tell me what to do differently next month",
        returns: "An executive summary with key metrics dashboard, trend analysis, attribution insights, a what-worked/what-didn't breakdown, and a prioritized impact-vs-effort recommendation matrix"
      }
    ],
    inputs: [
      {
        label: "Campaign goal, audience, timeline, and budget",
        detail: "required for campaign planning; the plugin asks for any missing details before proceeding",
        required: false
      },
      {
        label: "Draft content (pasted, file, or URL)",
        detail: "required for brand review; works with any text format",
        required: false
      },
      {
        label: "Performance data (spreadsheet, CSV, or key numbers)",
        detail: "required for reporting; the plugin prompts for the specific metrics it needs",
        required: false
      },
      {
        label: "Brand voice guidelines",
        detail: "optional; if configured in local settings, applied automatically to all content and review skills",
        required: false
      },
      {
        label: "Competitor names or domains",
        detail: "optional; triggers competitive research and positioning analysis",
        required: false
      }
    ],
    outputs: [
      {
        label: "Campaign briefs",
        detail: "structured documents with objectives, messaging, channel strategy, content calendar, budget allocation, and success metrics"
      },
      {
        label: "Content drafts",
        detail: "channel-ready copy for blog posts, social media, email newsletters, landing pages, press releases, and case studies with headline options and SEO recommendations"
      },
      {
        label: "Brand review reports",
        detail: "severity-ranked findings tables with before-and-after rewrites and legal compliance flags"
      },
      {
        label: "Email sequences",
        detail: "complete multi-email flows with full copy, timing, branching logic, exit conditions, flow diagrams, and A/B test suggestions"
      },
      {
        label: "Competitive briefs",
        detail: "positioning comparisons, messaging matrices, content gap analyses, and actionable battlecards"
      },
      {
        label: "Performance reports",
        detail: "executive summaries with metrics dashboards, trend analysis, attribution notes, and prioritized optimization recommendations"
      },
      {
        label: "SEO audits",
        detail: "keyword opportunity tables, on-page issue lists, technical checklists, competitor comparisons, and quick-win action plans"
      }
    ],
    how_it_works: [
      {
        title: "Structured brief generation",
        detail: "Turns a campaign goal into a ten-section brief covering objectives, audience, messaging, channels, calendar, budget, and risks so nothing falls through the cracks between strategy and execution"
      },
      {
        title: "Brand voice enforcement",
        detail: "Checks every piece of content against a configurable voice framework with attributes, tone spectrums, and terminology lists, then flags deviations by severity with specific before-and-after fixes"
      },
      {
        title: "Multi-channel content templating",
        detail: "Applies channel-specific formatting rules and best practices for each platform so a blog post, LinkedIn update, and email newsletter all sound like the same brand but fit their medium"
      },
      {
        title: "Lifecycle email sequencing",
        detail: "Designs complete email flows with branching logic, exit conditions, and suppression rules mapped to industry benchmarks so sequences adapt to recipient behavior instead of blasting the same path to everyone"
      },
      {
        title: "Performance diagnosis framework",
        detail: "Walks through each funnel stage to find where metrics break down, then maps every recommendation to an impact-versus-effort matrix so the highest-value fixes get done first"
      },
      {
        title: "Competitive positioning analysis",
        detail: "Reverse-engineers each competitor's value proposition, narrative arc, and content strategy, then identifies the messaging angles and audience segments they have left open"
      }
    ],
    tools: "Works standalone with no external connections. Optionally connects to Slack for sharing drafts, HubSpot or Marketo for campaign data and lead scoring, Amplitude or Mixpanel for product analytics, Ahrefs or Semrush for SEO keyword data, Klaviyo or Mailchimp for email sequence setup, Canva or Figma for design assets, and Notion or Confluence for briefs and style guides. When tools are connected, the plugin pulls live data automatically; when they are not, it works from user-provided inputs and web research.",
    skills_summary: "Invocable Skills: Campaign Plan (generates full campaign briefs from a goal and audience), Draft Content (produces channel-ready marketing copy across seven content types), Brand Review (audits content against brand voice and flags compliance risks), Email Sequence (designs multi-email flows with branching logic and full copy), Competitive Brief (researches competitors and builds positioning comparisons with battlecards), Performance Report (builds executive marketing reports with trend analysis and optimization recommendations), SEO Audit (runs keyword research, on-page checks, content gap analysis, and technical audits). Reference Skill: Content Creation (channel-specific writing templates, SEO fundamentals, headline formulas, and CTA guidance used by the content-producing skills).",
    install_steps: [
      "Browse (Anthropic Plugin Catalog)"
    ]
  },
  {
    id: 6,
    slug: "operations",
    name: "Operations",
    author: "Anthropic",
    description: "Turn operational chaos into structured processes, plans, and reports your team can actually follow.",
    long_description: "Helps operations teams document processes, review vendors, plan capacity, track compliance, manage changes, and report status — all from a single plugin. Works standalone with your descriptions and uploads, or connects to project trackers, knowledge bases, and IT service management tools for richer, automated output.",
    repo_url: null,
    installs: 0,
    stars: 0,
    badge: null,
    version: "1.2.0",
    category: "Business Operations",
    industries: [
      "retail",
      "cpg",
      "industrials",
      "logistics",
      "tmt",
      "healthcare"
    ],
    functions: [
      "operations",
      "procurement",
      "strategy"
    ],
    use_cases: [
      {
        ask: "You ask...",
        returns: "You get..."
      },
      {
        ask: "Review this vendor proposal and tell me if we should renew",
        returns: "Cost analysis with total cost of ownership, risk flags, negotiation leverage points, and a proceed/negotiate/pass recommendation"
      },
      {
        ask: "Document our employee offboarding process",
        returns: "Complete SOP with RACI matrix, step-by-step procedures, exception handling, and process metrics"
      },
      {
        ask: "How's our team's capacity looking for next quarter?",
        returns: "Utilization analysis per person, bottleneck identification, upcoming demand gaps, and hire-or-deprioritize scenarios"
      }
    ],
    inputs: [
      {
        label: "Process descriptions",
        detail: "Verbal walkthrough or existing documentation (.docx, .md, .pdf) — optional",
        required: false
      },
      {
        label: "Vendor proposals or contracts",
        detail: "Pricing, terms, SLAs in any document format — optional, for vendor reviews",
        required: false
      },
      {
        label: "Team and workload data",
        detail: "Headcount, roles, current assignments (.xlsx, verbal) — optional, for capacity planning",
        required: false
      },
      {
        label: "Project updates and KPIs",
        detail: "Status, metrics, risks — optional, for status reports",
        required: false
      }
    ],
    outputs: [
      {
        label: "Standard operating procedures",
        detail: "Step-by-step process documents with RACI matrices, flowcharts, exception handling, and metrics"
      },
      {
        label: "Vendor evaluations",
        detail: "Cost breakdowns with total cost of ownership, risk registers, strengths/concerns, and negotiation points"
      },
      {
        label: "Capacity plans",
        detail: "Utilization tables by person, demand forecasts, bottleneck flags, and hire-or-deprioritize scenarios"
      },
      {
        label: "Change requests",
        detail: "Impact analysis, risk assessment, implementation timeline, communication plan, and rollback procedures"
      },
      {
        label: "Runbooks",
        detail: "Repeatable step-by-step procedures with troubleshooting guides, escalation paths, and verification checklists"
      },
      {
        label: "Status reports",
        detail: "Executive summaries with KPI dashboards, risk tables, decision requests, and next-period priorities"
      }
    ],
    how_it_works: [
      {
        title: "Structured frameworks for every deliverable",
        detail: "Each skill applies a proven operational framework — assess-plan-execute-sustain for changes, total cost of ownership for vendors, likelihood-impact matrices for risks — so outputs follow industry best practice rather than ad hoc formatting."
      },
      {
        title: "Scenario-based capacity modeling",
        detail: "Resource plans include multiple what-if scenarios (do nothing, hire, deprioritize) with utilization targets calibrated by role type, so leaders can compare trade-offs side by side."
      },
      {
        title: "Edge case and exception capture",
        detail: "Process documentation explicitly prompts for and documents the unusual scenarios that informal knowledge transfer misses — the situations that cause the most confusion."
      }
    ],
    tools: "Works entirely standalone — describe your situation and get a complete deliverable. Optionally connects to IT service management tools (ServiceNow, Zendesk), project trackers (Asana, Jira), knowledge bases (Notion, Confluence), chat platforms (Slack, Teams), calendars, email, and procurement systems to pull data automatically instead of manual input.",
    skills_list: [
      {
        name: "vendor-review",
        description: "Evaluate a vendor with cost analysis, risk assessment, and renewal recommendation",
        type: "Invocable"
      },
      {
        name: "process-doc",
        description: "Document a business process with flowcharts, RACI matrices, and SOPs",
        type: "Invocable"
      },
      {
        name: "change-request",
        description: "Create a change management request with impact analysis and rollback plan",
        type: "Invocable"
      },
      {
        name: "capacity-plan",
        description: "Plan resource capacity with workload analysis and utilization forecasting",
        type: "Invocable"
      },
      {
        name: "status-report",
        description: "Generate a status report with KPIs, risks, and action items",
        type: "Invocable"
      },
      {
        name: "runbook",
        description: "Create operational runbooks with step-by-step procedures and troubleshooting",
        type: "Invocable"
      },
      {
        name: "process-optimization",
        description: "Analyze and improve business processes, identifying bottlenecks and waste",
        type: "Reference"
      },
      {
        name: "risk-assessment",
        description: "Identify, assess, and mitigate operational risks with prioritized registers",
        type: "Reference"
      },
      {
        name: "compliance-tracking",
        description: "Track compliance requirements, audit readiness, and regulatory deadlines",
        type: "Reference"
      }
    ],
    install_steps: [
      "Method 1 — Browse (Anthropic Plugin Catalog)",
      "Open the Claude Desktop app and switch to the Cowork tab",
      "Click Customize in the left sidebar, then Browse plugins",
      "Search for \"Operations\" and click Install",
      "Visit github.com/anthropics/knowledge-work-plugins",
      "Download the operations plugin folder or .skill file",
      "In Cowork, click Customize → Upload plugin and select the downloaded file"
    ]
  },
  {
    id: 7,
    slug: "sales",
    name: "Sales",
    author: "Unknown",
    description: "Turn web research, pipeline data, and call notes into personalized outreach, deal forecasts, and meeting prep in minutes — no integrations required.",
    long_description: "Sales is a productivity plugin that helps reps prospect, prepare for calls, manage their pipeline, and craft outreach that moves deals forward. It works immediately with web search and whatever context you provide — paste call notes, upload a pipeline CSV, or just name a company. Connect your CRM, email, or call recording tool and every skill automatically pulls richer data without any configuration changes.",
    repo_url: null,
    installs: 0,
    stars: 0,
    badge: null,
    version: "1.2.0",
    category: "Sales & Revenue",
    industries: [
      "financial",
      "retail",
      "cpg",
      "tmt",
      "industrials",
      "healthcare"
    ],
    functions: [
      "sales",
      "marketing",
      "strategy"
    ],
    use_cases: [
      {
        ask: "What You Ask",
        returns: "What You Get"
      },
      {
        ask: "Research Acme Corp before my call tomorrow",
        returns: "Company profile with recent news, key contacts, hiring signals, qualification signals, and a recommended outreach approach"
      },
      {
        ask: "Process these call notes and draft a follow-up email",
        returns: "Structured summary with action items, objection log, competitive intel, and a ready-to-send follow-up email"
      },
      {
        ask: "Generate my Q2 forecast from this pipeline CSV",
        returns: "Weighted forecast with best/likely/worst scenarios, commit vs. upside breakdown, risk flags, and gap-to-quota analysis"
      }
    ],
    inputs: [
      {
        label: "Pipeline data",
        detail: "CSV export from any CRM, or describe your deals in plain text",
        required: false
      },
      {
        label: "Call notes or transcript",
        detail: "paste rough notes, a transcript, or describe the call",
        required: false
      },
      {
        label: "Company or contact name",
        detail: "(required for research/outreach) — domain or name is enough",
        required: false
      },
      {
        label: "Quota and period",
        detail: "(required for forecasting) — annual or quarterly target and close date",
        required: false
      }
    ],
    outputs: [
      {
        label: "Structured Markdown reports",
        detail: "account research briefs, call summaries, pipeline reviews, forecasts, daily briefings"
      },
      {
        label: "Self-contained HTML files",
        detail: "interactive competitive battlecards and custom sales assets (landing pages, one-pagers, demos)"
      },
      {
        label: "Ready-to-send emails",
        detail: "plain-text follow-ups and outreach drafts formatted for any email client"
      }
    ],
    how_it_works: [
      {
        title: "Research-first workflow",
        detail: "Every outreach and prep skill researches the prospect before generating output, so messaging reflects real company context rather than generic templates."
      },
      {
        title: "Stage-weighted probability model",
        detail: "The forecasting engine assigns conversion probabilities by deal stage and adjusts for activity recency, producing three scenarios instead of a single-point estimate."
      },
      {
        title: "Multi-signal risk scoring",
        detail: "Pipeline review combines deal age, activity gaps, close-date accuracy, and contact coverage into a composite health score that flags problems before they stall."
      },
      {
        title: "Connector-agnostic enrichment",
        detail: "Skills define what data they need by category (CRM, enrichment, transcripts) rather than specific products, so any compatible tool upgrades the output automatically."
      }
    ],
    tools: "Works fully standalone using web search. Optionally connects to CRM (HubSpot, Close, Salesforce, Pipedrive), email (Gmail, Microsoft 365), calendar, chat (Slack, Teams), call transcription (Fireflies, Gong, Chorus), data enrichment (Clay, ZoomInfo, Apollo), knowledge bases (Notion, Confluence), and sales engagement platforms (Outreach, Salesloft). Connectors are category-based: swap any tool in a category without reconfiguration.",
    skills_list: [
      {
        name: "account-research",
        description: "Researches any company or person via web search, producing a profile with news, hiring signals, and recommended outreach angle",
        type: "Invocable"
      },
      {
        name: "call-prep",
        description: "Builds a complete meeting prep brief with attendee research, suggested agenda, discovery questions, and objection handling",
        type: "Invocable"
      },
      {
        name: "call-summary",
        description: "Processes call notes or transcripts into a structured summary with action items and a customer follow-up email",
        type: "Invocable"
      },
      {
        name: "competitive-intelligence",
        description: "Researches competitors and generates an interactive HTML battlecard with comparison matrix and talk tracks",
        type: "Invocable"
      },
      {
        name: "create-an-asset",
        description: "Generates tailored sales assets (landing pages, one-pagers, workflow demos) customized to a specific prospect and audience",
        type: "Invocable"
      },
      {
        name: "daily-briefing",
        description: "Produces a prioritized daily sales briefing covering meetings, pipeline alerts, email priorities, and suggested actions",
        type: "Invocable"
      },
      {
        name: "draft-outreach",
        description: "Researches a prospect then drafts personalized cold email and LinkedIn messages with follow-up sequences",
        type: "Invocable"
      },
      {
        name: "forecast",
        description: "Generates a weighted sales forecast with three scenarios, commit vs. upside breakdown, and gap-to-quota analysis",
        type: "Invocable"
      },
      {
        name: "pipeline-review",
        description: "Analyzes pipeline health with a composite score, deal prioritization matrix, risk flags, and weekly action plan",
        type: "Invocable"
      }
    ],
    install_steps: [
      "Browse (Anthropic Plugin Catalog)",
      "Open the Claude Desktop app and switch to the Cowork tab",
      "Click Customize in the left sidebar, then Browse plugins",
      "Search for \"Sales\" and click Install",
      "Visit github.com/anthropics/knowledge-work-plugins",
      "Download the sales plugin folder or .skill file",
      "In Cowork, click Customize → Upload plugin and select the downloaded file"
    ]
  },
  {
    id: 8,
    slug: "strategy-consultant",
    name: "Strategy Consultant",
    author: "Chip Alexandru",
    description: "Runs a complete consulting-grade analytical workflow from problem definition to an executive-grade, source-traced Word document in a single engagement.",
    long_description: "Takes a business question and runs the full analytical cycle a strategy consultant would perform: scoping the problem into a decision-oriented question, dispatching two independent research agents in parallel to reduce confirmation bias, cross-validating all findings through a third agent, pressure-testing the evidence through triangulation and counter-argument construction, building a storyline that answers the client question, and delivering a professionally formatted Word document with full source traceability. Supports multiple data tiers including public research, uploaded client data, and expert interview transcripts, adjusting the research strategy based on what is available. All outputs are designed as high-quality working drafts for expert review, covering the analytical workload so the consultant can focus on client relationship judgment and final recommendations.",
    repo_url: null,
    installs: 0,
    stars: 0,
    badge: null,
    version: "1.3.1",
    category: "Strategy & Management Consulting",
    industries: [
      "financial",
      "retail",
      "cpg",
      "industrials",
      "tmt",
      "healthcare",
      "privatecapital"
    ],
    functions: [
      "strategy",
      "finance",
      "operations",
      "ma"
    ],
    use_cases: [
      {
        ask: "Run a full engagement on whether our client should enter the European EV charging market",
        returns: "A scoped problem statement, validated research from three agents, a sense-check report, a synthesized storyline, and a 4-6 page executive brief with numbered Research Notes tracing every claim to its source."
      },
      {
        ask: "Research the competitive landscape for retail media networks in grocery",
        returns: "Two independent research memos covering different angles, a validated and cross-checked evidence base, and an executive summary with confidence scores and identified gaps."
      },
      {
        ask: "Define the problem for this client brief\" (with uploaded documents)",
        returns: "A structured problem statement with context, tension, question, and scope; a Precision Anchor to prevent analytical drift; a Deliverable Blueprint; and a Client Question Checklist extracted from the source material."
      }
    ],
    inputs: [
      {
        label: "•  Business question or client brief",
        detail: "required. Can be a vague challenge or a specific decision.",
        required: false
      },
      {
        label: "•  Client documents",
        detail: "optional. Decks, reports, call transcripts, prior analyses, or data files. The plugin extracts every factual claim, question, and concern with structural coordinates.",
        required: false
      },
      {
        label: "•  Expert interview notes",
        detail: "optional. Transcripts or notes from industry practitioners, processed with confidence scoring and cross-referenced against public findings.",
        required: false
      },
      {
        label: "•  Internal data files",
        detail: "optional. Spreadsheets, financial models, or operational metrics that set the analytical direction.",
        required: false
      }
    ],
    outputs: [
      {
        label: "•  Executive brief (.docx)",
        detail: "4-6 page default, or comprehensive 10-20 page report. Includes executive summary, evidence-backed body sections, counter-argument section, numbered recommendations, and mandatory Research Notes with URLs and confidence scores."
      },
      {
        label: "•  Alternative formats available: Excel (.xlsx) for structured dimension mapping, or PowerPoint (.pptx) for stakeholder presentations. Source traceability is required regardless of format.",
        detail: ""
      },
      {
        label: "•  Intermediate artifacts: problem statement with Precision Anchor, research memos from independent agents, validated evidence base, sense-check report, and synthesis storyline document.",
        detail: ""
      }
    ],
    how_it_works: [
      {
        title: "Precision Anchor architecture",
        detail: "Every engagement starts by distilling the business question into a decision-oriented problem statement, a Deliverable Blueprint describing the ideal output, and a success metric that defines what a precise answer looks like. This anchor travels through every downstream phase, preventing the common failure where the analysis drifts to answer an easier question than the one the client asked."
      },
      {
        title: "Dual-agent parallel research",
        detail: "Two independent research agents investigate the question simultaneously from dynamically generated, non-overlapping angles. Neither agent sees the other's findings. This architecture reduces confirmation bias: where a single researcher tends to find evidence supporting their initial direction, two independent threads surface contradictions and blind spots."
      },
      {
        title: "Three-tier validation",
        detail: "A dedicated validator agent cross-checks both research memos for consistency, flags contradictions, scores every source on a four-level confidence scale, and compiles a unified source registry with URLs. The user can optionally dispatch a third deep-dive agent targeting specific under-explored areas identified by the validator."
      },
      {
        title: "Answer-first synthesis",
        detail: "The storyline starts with a one-sentence governing message that directly answers the client question, then builds 2-4 supporting arguments with evidence mapped to each. The structure follows the logic of the answer, not a rigid framework, choosing from patterns like recommendation-with-pillars, option comparison, or diagnostic-then-prescription based on what fits the question."
      },
      {
        title: "Independent deliverable validation",
        detail: "The agent that wrote the report never audits its own output. A separate validator checks the final document against the source registry, the sense-check report, the synthesis storyline, and the Client Question Checklist. The report must pass source completeness, counter-argument coverage, headline fidelity, and banned-language checks before delivery."
      }
    ],
    tools: "Works fully standalone using built-in web search, file creation, and document generation. Optional document storage connectors (Google Drive, SharePoint, OneDrive, Box, Dropbox) allow pulling client briefs from and saving reports to shared drives. No external APIs or paid data subscriptions are required.",
    skills_list: [
      {
        name: "engagement-manager",
        description: "Orchestrates the full end-to-end workflow with mandatory checkpoints",
        type: "Invocable"
      },
      {
        name: "problem-definition",
        description: "Scopes the client question into a decision-oriented problem statement with Precision Anchor",
        type: "Invocable"
      },
      {
        name: "hypothesis-tree",
        description: "Builds testable hypothesis trees when structured decomposition adds value",
        type: "Invocable"
      },
      {
        name: "research",
        description: "Dispatches three agents for parallel research and cross-validation",
        type: "Invocable"
      },
      {
        name: "sense-check",
        description: "Seven-step pressure test on evidence robustness and analytical precision",
        type: "Invocable"
      },
      {
        name: "synthesis",
        description: "Builds the answer-first storyline with evidence mapping",
        type: "Invocable"
      },
      {
        name: "client-report",
        description: "Produces the executive-grade Word document with mandatory quality checks",
        type: "Invocable"
      },
      {
        name: "expert-interview",
        description: "Plans interview guides and processes transcripts with confidence scoring",
        type: "Invocable"
      }
    ],
    install_steps: [
      "Upload (.skill file)",
      "Obtain the .skill file from the plugin author or colleague.",
      "Open the Claude Desktop app and switch to the Cowork tab.",
      "Click Customize in the left sidebar, then Upload plugin.",
      "Select the .skill file and confirm installation."
    ]
  }
];
