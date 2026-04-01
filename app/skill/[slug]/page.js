'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getSkillBySlug } from '@/lib/data';

/* ─── ICONS ─── */
const BackIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>;
const ExternalIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>;
const CopyIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>;
const CheckIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const OrangeArrow = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fb923c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;

function CopyBtn({ text }) {
  const [ok, setOk] = useState(false);
  return (
    <button onClick={() => { navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 2000); }} style={{
      display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 5,
      border: '1px solid #e4e4e7', background: ok ? '#f0fdf4' : '#fff', color: ok ? '#16a34a' : '#a1a1aa',
      fontFamily: 'var(--sans)', fontSize: 11, fontWeight: 500, cursor: 'pointer', transition: 'all .15s',
    }}>
      {ok ? <><CheckIcon /> Copied</> : <><CopyIcon /> Copy</>}
    </button>
  );
}

function SectionHeading({ children }) {
  return <h2 style={{ fontSize: 13, fontWeight: 700, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 12 }}>{children}</h2>;
}

export default function SkillDetailPage() {
  const params = useParams();
  const skill = getSkillBySlug(params.slug);

  if (!skill) return <div style={{ padding: '100px 0', textAlign: 'center', color: '#a1a1aa' }}>Skill not found.</div>;

  const useCases = skill.use_cases || [];
  const inputs = skill.inputs || [];
  const outputs = skill.outputs || [];
  const howItWorks = skill.how_it_works || [];
  const installCmd = `/plugin install ${skill.slug}`;

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* HEADER */}
      <div style={{ background: 'linear-gradient(160deg,#0f0f0f 0%,#1a1a1a 30%,#8b2500 100%)', color: '#fff' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '14px 36px 28px' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: '#fb923c', fontSize: 12, fontWeight: 500, textDecoration: 'none', marginBottom: 20 }}>
            <BackIcon /> Back to directory
          </Link>

          {/* META ROW */}
          <div style={{ display: 'flex', gap: 24, fontSize: 12, color: '#a1a1aa', marginBottom: 8 }}>
            {skill.version && <span><span style={{ color: '#71717a' }}>Version</span> <span style={{ color: '#d4d4d8', fontWeight: 600 }}>{skill.version}</span></span>}
            <span><span style={{ color: '#71717a' }}>Publisher</span> <span style={{ color: '#d4d4d8', fontWeight: 600 }}>{skill.author}</span></span>
            {skill.category && <span><span style={{ color: '#71717a' }}>Category</span> <span style={{ color: '#d4d4d8', fontWeight: 600 }}>{skill.category}</span></span>}
          </div>

          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 10, letterSpacing: '-.02em' }}>{skill.name}</h1>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: '#e8cdb5', maxWidth: 680 }}>{skill.description}</p>
        </div>
      </div>

      {/* BODY */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '28px 36px 60px' }}>

        {/* WHAT IT DOES */}
        <section style={{ marginBottom: 32, animation: 'fadeUp .3s ease both' }}>
          <SectionHeading>What it does</SectionHeading>
          <p style={{ fontSize: 14, lineHeight: 1.75, color: '#52525b' }}>{skill.long_description || skill.description}</p>
        </section>

        {/* WHAT YOU CAN ASK */}
        {useCases.length > 0 && (
          <section style={{ marginBottom: 32, animation: 'fadeUp .3s ease .06s both' }}>
            <SectionHeading>What you can ask</SectionHeading>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {useCases.map((uc, i) => (
                <div key={i} style={{ background: '#fff', border: '1px solid #e4e4e7', borderRadius: 8, padding: '16px 20px' }}>
                  <p style={{ fontSize: 13.5, fontWeight: 600, color: '#18181b', lineHeight: 1.5, marginBottom: 8 }}>&ldquo;{uc.ask}&rdquo;</p>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <span style={{ flexShrink: 0, marginTop: 1 }}><OrangeArrow /></span>
                    <p style={{ fontSize: 12.5, lineHeight: 1.6, color: '#71717a' }}>{uc.returns}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* INPUTS */}
        {inputs.length > 0 && (
          <section style={{ marginBottom: 32, animation: 'fadeUp .3s ease .12s both' }}>
            <SectionHeading>Inputs</SectionHeading>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {inputs.map((inp, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 10, padding: '10px 16px', background: '#fff', border: '1px solid #e4e4e7', borderRadius: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#18181b', whiteSpace: 'nowrap' }}>{inp.label}</span>
                  {!inp.required && <span style={{ fontSize: 10, fontWeight: 600, color: '#a1a1aa', background: '#f4f4f5', padding: '1px 6px', borderRadius: 3, whiteSpace: 'nowrap' }}>optional</span>}
                  <span style={{ fontSize: 12.5, color: '#71717a', lineHeight: 1.5 }}>{inp.detail}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* OUTPUT */}
        {outputs.length > 0 && (
          <section style={{ marginBottom: 32, animation: 'fadeUp .3s ease .18s both' }}>
            <SectionHeading>Output</SectionHeading>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {outputs.map((out, i) => (
                <div key={i} style={{ padding: '14px 18px', background: '#fff', border: '1px solid #e4e4e7', borderLeft: '3px solid #fb923c', borderRadius: 8 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#18181b', marginBottom: 4 }}>{out.label}</div>
                  <p style={{ fontSize: 12.5, lineHeight: 1.6, color: '#71717a' }}>{out.detail}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TOOLS & INTEGRATIONS */}
        {skill.tools && (
          <section style={{ marginBottom: 32, animation: 'fadeUp .3s ease .24s both' }}>
            <SectionHeading>Tools & Integrations</SectionHeading>
            <p style={{ fontSize: 13.5, lineHeight: 1.7, color: '#52525b' }}>{skill.tools}</p>
          </section>
        )}

        {/* HOW IT WORKS */}
        {howItWorks.length > 0 && (
          <section style={{ marginBottom: 32, animation: 'fadeUp .3s ease .3s both' }}>
            <SectionHeading>How it works</SectionHeading>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {howItWorks.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, padding: '16px 18px', background: '#fff', border: '1px solid #e4e4e7', borderRadius: 8 }}>
                  <span style={{
                    width: 28, height: 28, borderRadius: 14, background: '#1a1a1a', color: '#fb923c',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0,
                  }}>{i + 1}</span>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: '#18181b', marginBottom: 4 }}>{step.title}</div>
                    <p style={{ fontSize: 12.5, lineHeight: 1.65, color: '#71717a' }}>{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SKILLS SUMMARY */}
        {skill.skills_summary && (
          <section style={{ marginBottom: 32, animation: 'fadeUp .3s ease .36s both' }}>
            <SectionHeading>Skills</SectionHeading>
            <p style={{ fontSize: 13.5, lineHeight: 1.7, color: '#52525b' }}>{skill.skills_summary}</p>
          </section>
        )}

        {/* INSTALL + GITHUB */}
        <section style={{ display: 'flex', gap: 14, animation: 'fadeUp .35s ease .4s both' }}>
          <div style={{ flex: 1, background: '#fff', border: '1px solid #e4e4e7', borderRadius: 8, padding: '16px 18px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#18181b', marginBottom: 10 }}>Install</div>
            <div style={{ fontSize: 11, color: '#a1a1aa', marginBottom: 4 }}>In Cowork</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#52525b', background: '#f4f4f5', padding: '6px 10px', borderRadius: 5, marginBottom: 10 }}>
              Customize &rarr; Add marketplace &rarr; paste repo URL
            </div>
            <div style={{ fontSize: 11, color: '#a1a1aa', marginBottom: 4 }}>In Claude Code</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <code style={{ flex: 1, fontFamily: 'var(--mono)', fontSize: 11, color: '#52525b', background: '#f4f4f5', padding: '6px 10px', borderRadius: 5 }}>{installCmd}</code>
              <CopyBtn text={installCmd} />
            </div>
          </div>
          {skill.repo_url && (
            <a href={skill.repo_url} target="_blank" rel="noopener noreferrer" style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: 160, background: '#18181b', borderRadius: 8, padding: '16px', textDecoration: 'none', color: '#fff', gap: 8,
            }}>
              <ExternalIcon />
              <span style={{ fontSize: 13, fontWeight: 700 }}>View on GitHub</span>
            </a>
          )}
        </section>
      </div>
    </div>
  );
}
