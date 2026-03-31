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

export default function SkillDetailPage() {
  const params = useParams();
  const skill = getSkillBySlug(params.slug);

  if (!skill) return <div style={{ padding: '100px 0', textAlign: 'center', color: '#a1a1aa' }}>Skill not found.</div>;

  const useCases = skill.use_cases || [];
  const installCmd = `/plugin install ${skill.slug}`;

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* HEADER */}
      <div style={{ background: 'linear-gradient(160deg,#0f0f0f 0%,#1a1a1a 30%,#8b2500 100%)', color: '#fff' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '14px 36px 28px' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: '#fb923c', fontSize: 12, fontWeight: 500, textDecoration: 'none', marginBottom: 20 }}>
            <BackIcon /> Back to directory
          </Link>
          <div style={{ fontSize: 12, color: '#a1a1aa', marginBottom: 6 }}>{skill.author} &middot; {skill.installs} installs</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 10, letterSpacing: '-.02em' }}>{skill.name}</h1>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: '#e8cdb5', maxWidth: 600 }}>{skill.long_description || skill.description}</p>
        </div>
      </div>

      {/* BODY */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '28px 36px 60px' }}>

        {/* USE CASES */}
        {useCases.length > 0 && (
          <section style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#18181b', marginBottom: 14 }}>What you can ask</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {useCases.map((uc, i) => (
                <div key={i} style={{ background: '#fff', border: '1px solid #e4e4e7', borderRadius: 8, padding: '16px 20px', animation: `fadeUp .3s ease ${i * .06}s both` }}>
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

        {/* INSTALL + GITHUB */}
        <section style={{ display: 'flex', gap: 14, animation: 'fadeUp .35s ease .25s both' }}>
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
