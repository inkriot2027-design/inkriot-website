'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * LoadingExperience — a clean, light INKRIOT intro. An off-white field
 * with the wordmark and a counter, a thin accent progress line, then it
 * fades out and unmounts. Shown once per session. No dark background.
 */
export default function LoadingExperience({ onDone }) {
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const progressRef = useRef(0);

  useEffect(() => {
    let raf = 0;
    let val = 0;
    const started = performance.now();
    const MIN_MS = 1300;

    const tick = () => {
      const elapsed = performance.now() - started;
      const target = Math.min(100, (elapsed / MIN_MS) * 100);
      val += (target - val) * 0.14;
      const shown = Math.min(100, Math.round(val));
      progressRef.current = shown;
      setCount(shown);
      if (shown >= 100) {
        setLeaving(true);
        setTimeout(() => onDone && onDone(), 600);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        background: '#f5f4f0',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '1.4rem',
        opacity: leaving ? 0 : 1,
        transition: 'opacity 0.55s cubic-bezier(0.22,1,0.36,1)',
        pointerEvents: leaving ? 'none' : 'auto',
      }}
    >
      <div style={{
        fontFamily: 'var(--font-tungsten), sans-serif',
        fontSize: 'clamp(2rem, 6vw, 3.4rem)',
        letterSpacing: '-0.01em', textTransform: 'uppercase',
        color: '#0a0a0b', lineHeight: 0.9,
      }}>
        INKRIOT<span style={{ fontSize: '0.4em', verticalAlign: 'super' }}>&reg;</span>
      </div>

      <div style={{ width: 'min(240px, 60vw)', height: 2, background: 'rgba(10,10,11,0.12)', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0, transformOrigin: 'left',
          transform: `scaleX(${count / 100})`,
          background: 'linear-gradient(90deg, #2b4cff, #ff7a1a, #e5262b)',
          transition: 'transform 0.1s linear',
        }} />
      </div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'baseline' }}>
        <span style={{
          fontFamily: 'var(--font-tungsten), sans-serif',
          fontSize: '1.6rem', color: '#0a0a0b',
        }}>{String(count).padStart(3, '0')}</span>
        <span style={{
          fontSize: '0.62rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#85858e',
        }}>Loading the creative engine</span>
      </div>
    </div>
  );
}
