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

function Section({ title, children }) {
  return (
    <section style={{ marginBottom: 0 }}>
      <div style={{ padding: '24px 0 10px', borderBottom: '2px solid #18181b', marginBottom: 16 }}>
        <h2 style={{ fontSize: 13, fontWeight: 700, color: '#18181b', textTransform: 'uppercase', letterSpacing: '.1em' }}>{title}</h2>
      </div>
      {children}
    </section>
  );
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
      {/* HEADER — name only */}
      <div style={{ background: 'linear-gradient(160deg,#0f0f0f 0%,#1a1a1a 30%,#8b2500 100%)', color: '#fff' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '14px 36px 28px' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: '#fb923c', fontSize: 12, fontWeight: 500, textDecoration: 'none', marginBottom: 18 }}>
            <BackIcon /> Back to directory
          </Link>
          {skill.category && (
            <div style={{ fontSize: 11, fontWeight: 700, color: '#fb923c', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 6 }}>{skill.category}</div>
          )}
          <h1 style={{ fontSize: 30, fontWeight: 700, color: '#fff', letterSpacing: '-.02em' }}>{skill.name}</h1>
        </div>
      </div>

      {/* BODY */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 36px 60px' }}>

        {/* HERO CARD — metadata + description */}
        <div style={{
          background: '#fff', border: '1px solid #e4e4e7', borderRadius: 10,
          padding: '24px 28px', marginTop: -1, marginBottom: 8,
          boxShadow: '0 2px 12px rgba(0,0,0,.04)',
        }}>
          {/* META ROW */}
          <div style={{ display: 'flex', gap: 32, marginBottom: 16, paddingBottom: 14, borderBottom: '1px solid #f4f4f5' }}>
            {skill.version && (
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 2 }}>Version</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#18181b' }}>{skill.version}</div>
              </div>
            )}
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 2 }}>Publisher</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#18181b' }}>{skill.author}</div>
            </div>
            {skill.category && (
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 2 }}>Category</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#18181b' }}>{skill.category}</div>
              </div>
            )}
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.75, color: '#52525b' }}>{skill.description}</p>
        </div>

        {/* WHAT IT DOES */}
        <Section title="What it does">
          <p style={{ fontSize: 14, lineHeight: 1.75, color: '#52525b', marginBottom: 8 }}>{skill.long_description || skill.description}</p>
        </Section>

        {/* WHAT YOU CAN ASK */}
        {useCases.length > 0 && (
          <Section title="What you can ask">
            {/* Table header */}
            <div style={{ display: 'flex', padding: '0 16px 8px' }}>
              <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '.06em' }}>Prompt</span>
              <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '.06em' }}>What you get</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 8 }}>
              {useCases.map((uc, i) => (
                <div key={i} style={{ display: 'flex', background: '#fff', border: '1px solid #e4e4e7', borderRadius: 8, padding: '14px 16px', gap: 20 }}>
                  <p style={{ flex: 1, fontSize: 13.5, fontWeight: 600, color: '#18181b', lineHeight: 1.55 }}>&ldquo;{uc.ask}&rdquo;</p>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <span style={{ flexShrink: 0, marginTop: 2 }}><OrangeArrow /></span>
                    <p style={{ fontSize: 12.5, lineHeight: 1.6, color: '#71717a' }}>{uc.returns}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* INPUTS */}
        {inputs.length > 0 && (
          <Section title="Inputs">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 8 }}>
              {inputs.map((inp, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 8, fontSize: 13.5, lineHeight: 1.65, color: '#52525b' }}>
                  <span style={{ color: '#fb923c', fontSize: 18, lineHeight: 1, flexShrink: 0 }}>&bull;</span>
                  <span><span style={{ fontWeight: 700, color: '#18181b' }}>{inp.label}</span> — {inp.detail}{inp.required ? ' (required)' : ''}</span>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* OUTPUT */}
        {outputs.length > 0 && (
          <Section title="Output">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 8 }}>
              {outputs.map((out, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 8, fontSize: 13.5, lineHeight: 1.65, color: '#52525b' }}>
                  <span style={{ color: '#fb923c', fontSize: 18, lineHeight: 1, flexShrink: 0 }}>&bull;</span>
                  <span><span style={{ fontWeight: 700, color: '#18181b' }}>{out.label}</span> — {out.detail}</span>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* TOOLS & INTEGRATIONS */}
        {skill.tools && (
          <Section title="Tools & Integrations">
            <p style={{ fontSize: 14, lineHeight: 1.75, color: '#52525b', marginBottom: 8 }}>{skill.tools}</p>
          </Section>
        )}

        {/* HOW IT WORKS */}
        {howItWorks.length > 0 && (
          <Section title="How it works">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 8 }}>
              {howItWorks.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <span style={{
                    width: 26, height: 26, borderRadius: 13, background: '#1a1a1a', color: '#fb923c',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0, marginTop: 1,
                  }}>{i + 1}</span>
                  <p style={{ fontSize: 13.5, lineHeight: 1.65, color: '#52525b' }}>
                    <span style={{ fontWeight: 700, color: '#18181b' }}>{step.title}</span> — {step.detail}
                  </p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* SKILLS */}
        {skill.skills_summary && (
          <Section title="Skills">
            <p style={{ fontSize: 14, lineHeight: 1.75, color: '#52525b', marginBottom: 8 }}>{skill.skills_summary}</p>
          </Section>
        )}

        {/* INSTALL */}
        <Section title="Install">
          <div style={{ display: 'flex', gap: 14 }}>
            <div style={{ flex: 1, background: '#fff', border: '1px solid #e4e4e7', borderRadius: 8, padding: '16px 18px' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#18181b', marginBottom: 6 }}>Cowork</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#52525b', background: '#f4f4f5', padding: '6px 10px', borderRadius: 5, marginBottom: 12 }}>
                Customize &rarr; Add marketplace &rarr; paste repo URL
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#18181b', marginBottom: 6 }}>Claude Code</div>
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
          </div>
        </Section>
      </div>
    </div>
  );
}
