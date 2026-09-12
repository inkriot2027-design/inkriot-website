'use client';

import GradientWaves from '@/components/reactbits/GradientWaves';
import GlassIcons from '@/components/reactbits/GlassIcons';
import AnimatedList from '@/components/reactbits/AnimatedList';
import SpecularButton from '@/components/reactbits/SpecularButton';
import { Reveal, SectionHeader } from '@/components/ui/primitives';
import { FoldText } from '@/components/reactbits/TextEffects';
import { ICONS } from '@/components/ui/icons';
import { SERVICES } from '@/data/services';
import styles from './services.module.css';

export default function ServicesPage() {
  const glassItems = SERVICES.slice(0, 8).map((s) => {
    const Icon = ICONS[s.icon] || ICONS.design;
    return { icon: <Icon />, label: s.title.split(' ')[0], color: s.color };
  });

  return (
    <>
      <header className={styles.hero}>
        <GradientWaves colors={['#f5f4f0', '#e5262b', '#ff7a1a']} opacity={0.4} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <p className="eyebrow">Services</p>
          <h1 className={styles.heroTitle}>Everything we make.</h1>
          <p className="lead" style={{ marginTop: '1.5rem' }}>
            One studio across design, digital, media, advertising, 3D, architecture, content and product.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <GlassIcons items={glassItems} />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className={styles.listGrid}>
            <div>
              <SectionHeader eyebrow="At a glance" title={<FoldText text="Everything under one roof." />} />
              <p className="lead">From a single logo to a full campaign, a website, a film or a physical product — scroll the list, or explore each below.</p>
            </div>
            <AnimatedList
              items={SERVICES.map((s) => s.title)}
              showGradients
              enableArrowNavigation
              displayScrollbar={false}
              className={styles.animList}
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.list}>
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 40}>
                <article className={styles.card} style={{ '--sc': s.color }}>
                  <div className={styles.cardHead}>
                    <span className={styles.cardNo}>{String(i + 1).padStart(2, '0')}</span>
                    <h2>{s.title}</h2>
                  </div>
                  <p className={styles.tagline}>{s.tagline}</p>
                  <ul className={styles.items}>
                    {s.items.map((it) => <li key={it}>{it}</li>)}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
          <div className={styles.cta}>
            <SpecularButton href="/contact" variant="accent">Start a project</SpecularButton>
          </div>
        </div>
      </section>
    </>
  );
}
