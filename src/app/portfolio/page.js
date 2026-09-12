'use client';

import { useState } from 'react';
import Link from 'next/link';
import DissolveImage from '@/components/portfolio/DissolveImage';
import GlassIcons from '@/components/reactbits/GlassIcons';
import { Reveal } from '@/components/ui/primitives';
import { GradientText } from '@/components/reactbits/TextEffects';
import { ICONS } from '@/components/ui/icons';
import { PROJECTS, PORTFOLIO_CATEGORIES } from '@/data/portfolio';
import styles from './portfolio.module.css';

export default function PortfolioPage() {
  const [filter, setFilter] = useState('All');
  const shown = filter === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === filter || p.disciplines?.includes(filter));

  const glass = [
    { icon: <ICONS.design />, label: 'Design', color: 'var(--ink-red)' },
    { icon: <ICONS.digital />, label: 'Web', color: 'var(--ink-blue)' },
    { icon: <ICONS.move />, label: 'Motion', color: 'var(--ink-orange)' },
    { icon: <ICONS.build />, label: '3D', color: 'var(--ink-yellow)' },
    { icon: <ICONS.wear />, label: 'Street', color: 'var(--ink-green)' },
  ];

  return (
    <>
      <header className={styles.hero}>
        <div className="container">
          <p className="eyebrow">Portfolio / Work</p>
          <h1 className={styles.heroTitle}>Ideas <GradientText>made visible.</GradientText></h1>
          <p className="lead" style={{ marginTop: '1.5rem' }}>
            A selection of projects across design, digital, advertising, media, 3D, architecture and streetwear.
          </p>
          <div className={styles.glassRow}>
            <GlassIcons items={glass} />
          </div>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className={styles.filters}>
            {PORTFOLIO_CATEGORIES.map((c) => (
              <button
                key={c}
                className={`${styles.filter} ${filter === c ? styles.active : ''}`}
                onClick={() => setFilter(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className={styles.grid}>
            {shown.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 40} className={styles.cell}>
                <Link href={`/portfolio/${p.slug}`} className={styles.card}>
                  <DissolveImage src={p.cover} alt={p.name} className={styles.media} />
                  <div className={styles.meta}>
                    <span style={{ color: p.color }}>{p.category} · {p.year}</span>
                    <h3>{p.name}</h3>
                    <p className={styles.client}>{p.client}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          {shown.length === 0 && <p className="muted" style={{ textAlign: 'center', padding: '3rem' }}>No projects in this category yet.</p>}
        </div>
      </section>
    </>
  );
}
