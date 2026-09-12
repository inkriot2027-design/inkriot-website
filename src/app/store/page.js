'use client';

import SpecularButton from '@/components/reactbits/SpecularButton';
import GlareHover from '@/components/reactbits/GlareHover';
import { Reveal, SectionHeader } from '@/components/ui/primitives';
import { ShinyText, GradientText } from '@/components/reactbits/TextEffects';
import styles from './store.module.css';

const DROPS = [
  { name: "Ideas Don't Wait Tee", price: '₹799', img: '/images/work-ideas.jpg', tag: 'Graphic Tee', color: 'var(--ink-red)' },
  { name: 'Undo The Ordinary Tee', price: '₹799', img: '/images/work-undo.jpg', tag: 'Graphic Tee', color: 'var(--ink-green)' },
  { name: 'Harvest Creativity Tee', price: '₹849', img: '/images/work-harvest.jpg', tag: 'Limited', color: 'var(--ink-yellow)' },
  { name: 'Keep Moving Tee', price: '₹799', img: '/images/work-keepmoving.jpg', tag: 'Graphic Tee', color: 'var(--ink-blue)' },
];

export default function StorePage() {
  return (
    <>
      <header className={styles.hero}>
        <div className="container">
          <p className="eyebrow">INKRIOT Store</p>
          <h1 className={styles.heroTitle}>Wear the <GradientText>rebellion.</GradientText></h1>
          <p className="lead" style={{ marginTop: '1.5rem' }}>
            Original graphics, limited designs and streetwear built around typography, culture and
            attitude. Designed by INKRIOT. Made to be worn.
          </p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <SectionHeader eyebrow="Latest drops" title="Fresh from the studio." />
          <div className={styles.grid}>
            {DROPS.map((d, i) => (
              <Reveal key={d.name} delay={(i % 4) * 50}>
                <article className={styles.product} style={{ '--pc': d.color }}>
                  <GlareHover className={styles.media}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={d.img} alt={d.name} loading="lazy" />
                    <span className={styles.tag}>{d.tag}</span>
                  </GlareHover>
                  <div className={styles.info}>
                    <h3>{d.name}</h3>
                    <div className={styles.row}>
                      <span className={styles.price}>{d.price}</span>
                      <button className={styles.add}>Add</button>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.bannerSection}>
        <div className="container">
          <p className={styles.banner}><ShinyText>More drops coming soon.</ShinyText></p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <SpecularButton href="/contact" variant="ghost">Collaborate on a drop</SpecularButton>
          </div>
        </div>
      </section>
    </>
  );
}
