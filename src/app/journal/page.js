'use client';

import { useState } from 'react';
import { Reveal } from '@/components/ui/primitives';
import { GradientText } from '@/components/reactbits/TextEffects';
import { ARTICLES, JOURNAL_CATEGORIES } from '@/data/journal';
import styles from './journal.module.css';

export default function JournalPage() {
  const [cat, setCat] = useState('All');
  const shown = cat === 'All' ? ARTICLES : ARTICLES.filter((a) => a.category === cat);

  return (
    <>
      <header className={styles.hero}>
        <div className="container">
          <p className="eyebrow">Journal / Insights</p>
          <h1 className={styles.heroTitle}>Ideas, <GradientText>out loud.</GradientText></h1>
          <p className="lead" style={{ marginTop: '1.5rem' }}>
            Thoughts on design, digital, marketing, 3D, AI and the creative process — and the
            occasional look behind the scenes.
          </p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div className={styles.filters}>
            {JOURNAL_CATEGORIES.map((c) => (
              <button key={c} className={`${styles.filter} ${cat === c ? styles.active : ''}`} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>

          <div className={styles.grid}>
            {shown.map((a, i) => (
              <Reveal key={a.slug} delay={(i % 3) * 50}>
                <article className={styles.card} style={{ '--cc': a.color }}>
                  <div className={styles.cardTop}>
                    <span className={styles.cat}>{a.category}</span>
                    <span className={styles.read}>{a.read}</span>
                  </div>
                  <h2>{a.title}</h2>
                  <p>{a.excerpt}</p>
                  <span className={styles.more}>Read →</span>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
