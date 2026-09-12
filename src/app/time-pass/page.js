'use client';

import { useRef } from 'react';
import ChromaGrid from '@/components/reactbits/ChromaGrid';
import PhysicsTags from '@/components/timepass/PhysicsTags';
import { Reveal, SectionHeader } from '@/components/ui/primitives';
import { GradientText, ShinyText } from '@/components/reactbits/TextEffects';
import { TIME_PASS_ITEMS, TIME_PASS_GRID } from '@/data/timepass';
import styles from './timepass.module.css';

export default function TimePassPage() {
  return (
    <>
      <header className={styles.hero}>
        <div className="container">
          <p className="eyebrow">Time Pass</p>
          <h1 className={styles.heroTitle}>Made just to <GradientText>see what happens.</GradientText></h1>
          <p className="lead" style={{ marginTop: '1.5rem' }}>
            Not every idea is a project. This is the studio’s playground — timelapses, experiments and
            things we made purely because we wanted to.
          </p>
        </div>
      </header>

      {/* Vertical timelapse videos — native 9:16, never cropped */}
      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div className={styles.videoRow}>
            {TIME_PASS_ITEMS.map((item, i) => (
              <Reveal key={i} delay={i * 80}>
                <VerticalVideo item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Experimental chroma grid */}
      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Fragments" title="Bits and pieces." />
          <ChromaGrid items={TIME_PASS_GRID} columns={3} />
        </div>
      </section>

      {/* Matter.js physics play */}
      <section className={`section ${styles.playSection}`}>
        <div className="container">
          <SectionHeader eyebrow="Just for fun" title="Poke the physics." />
          <PhysicsTags tags={['Create', 'Experiment', 'Break', 'Repeat', 'Play', 'Build', 'Ship', 'Wear']} />
        </div>
      </section>

      <section className={styles.outro}>
        <div className="container">
          <p className={styles.outroText}><ShinyText>Curiosity is the point.</ShinyText></p>
        </div>
      </section>
    </>
  );
}

function VerticalVideo({ item }) {
  const ref = useRef(null);
  return (
    <figure className={styles.videoCard} style={{ '--vc': item.color }}>
      <div className={styles.videoStage}>
        <video
          ref={ref}
          className={styles.video}
          src={item.src}
          muted
          loop
          playsInline
          preload="metadata"
          onMouseEnter={(e) => e.currentTarget.play()}
          onMouseLeave={(e) => { e.currentTarget.pause(); }}
        />
      </div>
      <figcaption>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </figcaption>
    </figure>
  );
}
