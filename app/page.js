'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { getSkills } from '@/lib/data';
import { INDUSTRIES, FUNCTIONS, BADGE_COLORS } from '@/lib/constants';

const skills = getSkills();

/* ─── ICONS ─── */
const StarIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="#d4d4d8"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>;
const DownloadIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#d4d4d8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
const ArrowIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
const ChevronIcon = ({ open }) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform .2s', transform: open ? 'rotate(180deg)' : 'none' }}><polyline points="6 9 12 15 18 9"/></svg>;
const CloseIcon = () => <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;

/* ─── RATING PILL ─── */
const RATING_LABELS = { 1: 'Functional', 2: 'Working draft', 3: 'Production-ready' };
const RATING_DESCRIPTIONS = {
  1: 'Functional, generic. The plugin produces substantive output that reflects real analytical work. However, the work is a midpoint rather than a near-final draft. The level of specificity and expert-level input is lacking. Output formatting can be improved. A senior practitioner can extract value, but the plugin likely needs customization and iteration before it is consistently useful.',
  2: 'Professional working draft. The plugin produces well-structured output that is approximately 90% complete. A user with deep domain expertise would assess this as solid work that needs refinement. The remaining gaps require expert-level input and judgment.',
  3: 'Production-ready. The plugin delivers finished work product in professional formats and handles edge cases gracefully. A user with deep domain expertise would assess this output as expert-level. This is the standard where you\'d be comfortable putting the output in front of a stakeholder with only light review.',
};
// Signal bars: 3 bars of increasing height, filled up to rating
function SignalBars({ rating, filled = '#16a34a', empty = '#d4d4d8' }) {
  const bars = [5, 9, 13]; // heights
  const w = 5, gap = 3, totalW = w * 3 + gap * 2, totalH = 13;
  return (
    <svg width={totalW} height={totalH} viewBox={`0 0 ${totalW} ${totalH}`} style={{ display: 'block' }}>
      {bars.map((h, i) => (
        <rect key={i} x={i*(w+gap)} y={totalH-h} width={w} height={h} rx={1.5}
          fill={i < rating ? filled : empty} />
      ))}
    </svg>
  );
}

// Simple label — no tooltip
function RatingPill({ rating }) {
  if (!rating) return null;
  const color = rating === 3 ? '#15803d' : rating === 2 ? '#16a34a' : '#71717a';
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
      <SignalBars rating={rating} />
      <span style={{ fontSize: 11, fontWeight: 600, color }}>{RATING_LABELS[rating]}</span>
    </div>
  );
}

/* ─── SKILL CARD ─── */
function SkillCard({ skill, index }) {
  const bc = skill.badge ? BADGE_COLORS[skill.badge] : '#e4e4e7';
  return (
    <Link href={`/skill/${skill.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="skill-card" style={{
        background: '#fff', border: '1px solid #e4e4e7', borderLeft: `3px solid ${bc}`, borderRadius: 10,
        padding: '20px 22px 18px', display: 'flex', flexDirection: 'column', gap: 12,
        transition: 'all .15s', cursor: 'pointer', height: '100%',
        animation: `fadeUp .35s ease ${index * .04}s both`,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: '#18181b' }}>{skill.name}</span>
              {skill.badge && <span style={{ fontSize: 10, fontWeight: 700, color: bc, background: `${bc}12`, border: `1px solid ${bc}30`, padding: '1px 8px', borderRadius: 4 }}>{skill.badge}</span>}
            </div>
            <span style={{ fontSize: 12, color: '#a1a1aa' }}>{skill.author}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
            <RatingPill rating={skill.rating} />
            <span className="skill-card-arrow" style={{ color: '#d4d4d8', transition: 'color .15s' }}><ArrowIcon /></span>
          </div>
        </div>
        <p style={{ fontSize: 13.5, lineHeight: 1.65, color: '#52525b', margin: 0, flex: 1 }}>{skill.description}</p>
        <div style={{ display: 'flex', gap: 12, paddingTop: 8, borderTop: '1px solid #f4f4f5' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--mono)', fontSize: 11, color: '#a1a1aa' }}><StarIcon />{skill.stars}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--mono)', fontSize: 11, color: '#a1a1aa' }}><DownloadIcon />{skill.installs}</span>
        </div>
      </div>
    </Link>
  );
}

export default function DirectoryPage() {
  const [ind, setInd] = useState(null);
  const [fns, setFns] = useState([]);

  const [showDetail, setShowDetail] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showMaturity, setShowMaturity] = useState(false);

  const togFn = id => setFns(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const clear = () => { setInd(null); setFns([]); };
  const vis = INDUSTRIES;
  const res = skills.filter(p => {
    if (ind && !p.industries.includes(ind)) return false;
    if (fns.length && !fns.some(f => p.functions.includes(f))) return false;
    return true;
  });
  const cnt = id => skills.filter(p => p.industries.includes(id)).length;
  const any = ind || fns.length;

  return (
    <div style={{ minHeight: '100vh' }}>
      <style>{`
        .skill-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,.06); transform: translateY(-1px); }
        .skill-card:hover .skill-card-arrow { color: #c2410c !important; }
      `}</style>

      {/* HEADER */}
      <div style={{ background: 'linear-gradient(160deg,#0f0f0f 0%,#1a1a1a 30%,#8b2500 100%)', color: '#fff' }}>
        <nav style={{ maxWidth: 1140, margin: '0 auto', padding: '18px 36px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 24, fontWeight: 700, color: '#fff', letterSpacing: '-.02em' }}>Business Skills for Claude Cowork</span>
          <div style={{ display: 'flex', gap: 24 }}>
            <button onClick={() => setShowAbout(true)} style={{ fontSize: 13, fontWeight: 500, color: '#fb923c', background: 'none', border: 'none' }}>About</button>
          </div>
        </nav>


        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '14px 36px 22px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>

          <p style={{ fontSize: 18, fontStyle: 'italic', color: '#a1a1aa', textAlign: 'right', marginBottom: 18, lineHeight: 1.5 }}>
            "Turn expertise, procedures, and best practices into reusable capabilities so Claude can apply them automatically, every time."<br />
            <span style={{ fontStyle: 'normal', fontWeight: 600 }}>Anthropic</span>
          </p>

          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <button onClick={() => setShowMaturity(!showMaturity)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: 0, border: 'none', background: 'transparent' }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#fb923c' }}>{showMaturity ? 'Hide' : 'What do the'} maturity ratings mean?</span>
              <ChevronIcon open={showMaturity} />
            </button>
            <button onClick={() => setShowDetail(!showDetail)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: 0, border: 'none', background: 'transparent' }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#fb923c' }}>{showDetail ? 'Hide' : 'See'} example & how it works</span>
              <ChevronIcon open={showDetail} />
            </button>
          </div>

          {showMaturity && (
            <div style={{ marginTop: 10, width: '100%', maxWidth: 860, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
              {[1, 2, 3].map(level => (
                <div key={level} style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 8, padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <SignalBars rating={level} filled="#16a34a" empty="rgba(255,255,255,.2)" />
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#fb923c' }}>Level {level} — {RATING_LABELS[level]}</span>
                  </div>
                  <p style={{ fontSize: 12, lineHeight: 1.65, color: '#d4d4d8', margin: 0 }}>{RATING_DESCRIPTIONS[level]}</p>
                </div>
              ))}
            </div>
          )}

          {showDetail && (
            <div style={{ marginTop: 10, width: '100%', maxWidth: 860 }}>
              <div style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 8, padding: '10px 24px', display: 'flex' }}>
                <div style={{ flex: 1, paddingRight: 24, fontFamily: 'var(--mono)', fontSize: 11.5, lineHeight: 1.9, color: '#d4d4d8' }}>
                  <div><span style={{ color: '#fb923c' }}>name:</span> <span style={{ color: '#fff', fontWeight: 600 }}>Vendor Scorecard</span></div>
                  <div><span style={{ color: '#fb923c' }}>description:</span> <span style={{ color: '#e4e4e7' }}>Evaluate and rank supplier performance</span></div>
                </div>
                <div style={{ width: 1, background: 'rgba(255,255,255,.1)', flexShrink: 0 }} />
                <div style={{ flex: 1, paddingLeft: 24, fontSize: 13, lineHeight: 1.8, color: '#e4e4e7' }}>
                  Score suppliers on <strong style={{ color: '#fff' }}>delivery</strong>, <strong style={{ color: '#fff' }}>quality</strong>, <strong style={{ color: '#fff' }}>cost</strong>, and <strong style={{ color: '#fff' }}>responsiveness</strong>. Flag anyone below 60%. Return a ranked table.
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                {[
                  { title: 'Install a skill', desc: 'Browse this directory, pick a skill, add it to Claude Cowork or Code in one click.' },
                  { title: 'Use in Claude', desc: 'Work normally. When your question matches a skill, Claude automatically draws on that expertise.' },
                  { title: 'Customize and improve', desc: 'Edit any skill to match your company\'s frameworks, terminology, and standards. Skills improve as you refine them.' },
                ].map(s => (
                  <div key={s.title} style={{ flex: 1, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 8, padding: '12px 14px' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{s.title}</div>
                    <div style={{ fontSize: 11.5, lineHeight: 1.55, color: '#d4a574' }}>{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* BODY */}
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '16px 36px 60px', display: 'flex', gap: 36, alignItems: 'flex-start' }}>
        {/* SIDEBAR */}
        <aside style={{ width: 220, flexShrink: 0, position: 'sticky', top: 24 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 10, paddingLeft: 10 }}>Industry</p>
          {(() => {
            const active = vis.filter(i => cnt(i.id) > 0).sort((a, b) => cnt(b.id) - cnt(a.id));
            const inactive = vis.filter(i => cnt(i.id) === 0);
            return (
              <>
                <button onClick={() => setInd(null)} style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '8px 10px', borderRadius: 7, border: 'none', background: !ind ? '#fff7ed' : 'transparent' }}>
                  <span style={{ flex: 1, fontSize: 13.5, fontWeight: !ind ? 600 : 400, color: !ind ? '#c2410c' : '#71717a', textAlign: 'left' }}>All industries</span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: !ind ? '#ea580c' : '#d4d4d8' }}>{skills.length}</span>
                </button>
                {active.map(item => {
                  const a = ind === item.id; const c = cnt(item.id);
                  return (
                    <button key={item.id} onClick={() => setInd(a ? null : item.id)} style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '8px 10px', borderRadius: 7, border: 'none', background: a ? '#fff7ed' : 'transparent', cursor: 'pointer', marginTop: 1 }}>
                      <span style={{ width: 6, height: 6, borderRadius: 3, background: item.color, marginRight: 8, flexShrink: 0 }} />
                      <span style={{ flex: 1, fontSize: 13.5, fontWeight: a ? 600 : 400, color: a ? '#c2410c' : '#18181b', textAlign: 'left' }}>{item.label}</span>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: a ? '#ea580c' : '#a1a1aa' }}>{c}</span>
                    </button>
                  );
                })}
              </>
            );
          })()}
        </aside>

        {/* MAIN */}
        <main style={{ flex: 1, minWidth: 0 }}>
          <div style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 8 }}>Function</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {FUNCTIONS.map(fn => {
                const a = fns.includes(fn.id);
                const hasSkills = skills.some(s => s.functions.includes(fn.id));
                return (
                  <button key={fn.id} onClick={() => hasSkills ? togFn(fn.id) : null} style={{ padding: '6px 14px', borderRadius: 7, border: `1.5px solid ${a ? fn.color + '50' : hasSkills ? '#e4e4e7' : '#f4f4f5'}`, background: a ? fn.color + '0a' : hasSkills ? '#fff' : '#fafafa', cursor: hasSkills ? 'pointer' : 'default' }}>
                    <span style={{ fontSize: 13, fontWeight: a ? 700 : 500, color: a ? fn.color : hasSkills ? '#52525b' : '#d4d4d8', lineHeight: 1.2 }}>{fn.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {any && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 18, flexWrap: 'wrap' }}>
              {ind && (() => { const item = INDUSTRIES.find(i => i.id === ind); return (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 600, padding: '4px 12px', borderRadius: 20, background: `${item.color}10`, color: item.color, border: `1px solid ${item.color}25` }}>
                  {item.label} <span onClick={() => setInd(null)} style={{ cursor: 'pointer', opacity: .5 }}><CloseIcon /></span>
                </span>); })()}
              {fns.map(fid => { const fn = FUNCTIONS.find(f => f.id === fid); return (
                <span key={fid} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 600, padding: '4px 12px', borderRadius: 20, background: `${fn.color}10`, color: fn.color, border: `1px solid ${fn.color}25` }}>
                  {fn.label} <span onClick={() => togFn(fid)} style={{ cursor: 'pointer', opacity: .5 }}><CloseIcon /></span>
                </span>); })}
              <button onClick={clear} style={{ fontSize: 12, fontWeight: 500, color: '#a1a1aa', background: 'none', border: 'none', textDecoration: 'underline', textUnderlineOffset: 3 }}>Clear all</button>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 14 }}>
            {res.map((p, i) => <SkillCard key={p.id} skill={p} index={i} />)}
          </div>

          {!res.length && (
            <div style={{ padding: '64px 0', textAlign: 'center', fontSize: 14, color: '#a1a1aa' }}>No skills match these filters.</div>
          )}
        </main>
      </div>

      {/* ABOUT POPOVER */}
      {showAbout && (
        <>
          <div onClick={() => setShowAbout(false)} style={{ position: 'fixed', inset: 0, zIndex: 99 }} />
          <div style={{
            position: 'fixed', top: 48, right: 36, zIndex: 100,
            background: '#1a1a1a', border: '1px solid rgba(255,255,255,.12)', borderRadius: 10,
            padding: '18px 22px', width: 300, boxShadow: '0 12px 40px rgba(0,0,0,.4)',
            animation: 'fadeUp .2s ease both',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h2 style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Chip Alexandru</h2>
              <button onClick={() => setShowAbout(false)} style={{ background: 'none', border: 'none', padding: 2, color: '#a1a1aa', fontSize: 16, lineHeight: 1 }}>&times;</button>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.65, color: '#d4a574', marginBottom: 14 }}>
              Strategy consultant with 20+ years at BCG, PwC, and Accenture.
            </p>
            <a href="https://www.linkedin.com/in/chip-alexandru/" target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 6,
              background: '#fb923c', color: '#1a1a1a', fontSize: 12, fontWeight: 700, textDecoration: 'none',
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="#1a1a1a"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>
          </div>
        </>
      )}
    </div>
  );
}
