'use client';

import GradientWaves from '@/components/reactbits/GradientWaves';
import SpecularButton from '@/components/reactbits/SpecularButton';
import { Reveal, SectionHeader } from '@/components/ui/primitives';
import { GradientText, TrueFocus } from '@/components/reactbits/TextEffects';
import styles from './lab.module.css';

const EXPERIMENTS = [
  { t: 'AI-Assisted Design', d: 'Using generative tools to explore directions faster — then refining with human craft.', c: 'var(--ink-blue)' },
  { t: 'Generative 3D', d: 'Procedural and generative approaches to 3D form and motion.', c: 'var(--ink-yellow)' },
  { t: 'Interactive WebGL', d: 'Shader-driven experiences, particle systems and real-time graphics.', c: 'var(--ink-green)' },
  { t: 'Creative Automation', d: 'Systems that scale creative output without losing the idea.', c: 'var(--ink-orange)' },
  { t: 'Experimental Type', d: 'Typography that moves, reacts and behaves in unexpected ways.', c: 'var(--ink-red)' },
  { t: 'Physical + Digital', d: '3D printing, projection and bridging the screen and the real world.', c: 'var(--ink-blue)' },
];

export default function LabPage() {
  return (
    <>
      <header className={styles.hero}>
        <GradientWaves colors={['#f5f4f0', '#16b357', '#2b4cff']} opacity={0.4} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <p className="eyebrow">INKRIOT Lab</p>
          <h1 className={styles.heroTitle}>Where we <GradientText>experiment.</GradientText></h1>
          <p className="lead" style={{ marginTop: '1.5rem' }}>
            The Lab is where we test new tools, techniques and ideas — the stuff that isn’t a client
            project yet, but might change how we make everything.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Current explorations" title="Ideas in progress." />
          <div className={styles.grid}>
            {EXPERIMENTS.map((e, i) => (
              <Reveal key={e.t} delay={(i % 3) * 50}>
                <article className={styles.card} style={{ '--ec': e.c }}>
                  <span className={styles.dot} />
                  <h3>{e.t}</h3>
                  <p>{e.d}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.philoSection}>
        <div className="container">
          <h2 className={styles.philo}>
            <TrueFocus sentence="New tools create new possibilities." />
          </h2>
          <p className="lead" style={{ maxWidth: '52ch' }}>
            We don’t adopt technology for its own sake. We explore it, break it, and figure out how it
            can make creative work better.
          </p>
          <div style={{ marginTop: '2rem' }}>
            <SpecularButton href="/contact" variant="accent">Experiment with us</SpecularButton>
          </div>
        </div>
      </section>
    </>
  );
}
