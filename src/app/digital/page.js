'use client';

import GradientWaves from '@/components/reactbits/GradientWaves';
import BorderGlow from '@/components/reactbits/BorderGlow';
import SpecularButton from '@/components/reactbits/SpecularButton';
import { Reveal, SectionHeader } from '@/components/ui/primitives';
import { GradientText, BlurText } from '@/components/reactbits/TextEffects';
import styles from './digital.module.css';

const CAPS = [
  { t: 'Web Design', d: 'Distinctive, art-directed interfaces — never a template.', c: 'var(--ink-blue)' },
  { t: 'Web Development', d: 'Fast, responsive, accessible builds with modern frameworks.', c: 'var(--ink-green)' },
  { t: 'UI / UX', d: 'Flows and interfaces designed around how people actually behave.', c: 'var(--ink-orange)' },
  { t: 'Landing Pages', d: 'Focused pages built to convert a single, clear action.', c: 'var(--ink-red)' },
  { t: 'E-commerce', d: 'Storefronts that make buying feel effortless.', c: 'var(--ink-yellow)' },
  { t: 'Interactive Experiences', d: 'WebGL, motion and interaction that make a brand memorable.', c: 'var(--ink-blue)' },
];

export default function DigitalPage() {
  return (
    <>
      <header className={styles.hero}>
        <GradientWaves colors={['#f5f4f0', '#2b4cff', '#16b357']} opacity={0.4} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <p className="eyebrow">Digital</p>
          <h1 className={styles.heroTitle}>
            Design it.<br />Build it.<br /><GradientText>Put it online.</GradientText>
          </h1>
          <p className="lead" style={{ marginTop: '2rem' }}>
            We design and develop digital experiences that look distinctive, feel intuitive and work
            everywhere — from business sites to interactive, experimental builds.
          </p>
          <div style={{ marginTop: '2rem' }}>
            <SpecularButton href="/contact" variant="accent">Build something digital</SpecularButton>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Capabilities" title="Your brand deserves more than a template." />
          <div className={styles.grid}>
            {CAPS.map((c, i) => (
              <Reveal key={c.t} delay={(i % 3) * 50}>
                <BorderGlow glow={c.c} className={styles.card}>
                  <h3>{c.t}</h3>
                  <p>{c.d}</p>
                </BorderGlow>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${styles.processSection}`}>
        <div className="container">
          <div className={styles.process}>
            <h2 className={styles.processTitle}>
              <BlurText text="Strategy. Design. Build. Launch." />
            </h2>
            <p className="lead">
              Every digital project runs through the same creative engine — understand the goal,
              design the experience, build it properly, and ship it into the real world.
            </p>
            <SpecularButton href="/portfolio">See digital work</SpecularButton>
          </div>
        </div>
      </section>
    </>
  );
}
