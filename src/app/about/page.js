'use client';

import GradientWaves from '@/components/reactbits/GradientWaves';
import DissolveImage from '@/components/portfolio/DissolveImage';
import SpecularButton from '@/components/reactbits/SpecularButton';
import { Reveal, SectionHeader } from '@/components/ui/primitives';
import { BlurText, GradientText, FoldText, TrueFocus } from '@/components/reactbits/TextEffects';
import styles from './about.module.css';

const DRIVERS = [
  { t: 'Curiosity', d: 'We want to know what happens when different disciplines collide.' },
  { t: 'Creativity', d: 'We don’t start with templates. We start with ideas.' },
  { t: 'Experimentation', d: 'New tools create new possibilities. We want to explore them.' },
  { t: 'Craft', d: 'A good idea still needs good execution.' },
  { t: 'Impact', d: 'Creative work should make people feel something, remember something or do something.' },
];

const APPROACH = [
  { t: 'Think', d: 'Understand the problem, audience, objective and opportunity.' },
  { t: 'Create', d: 'Develop ideas, concepts, visuals and directions.' },
  { t: 'Build', d: 'Design, develop, shoot, animate, write, model or produce.' },
  { t: 'Launch', d: 'Put the work into the real world.' },
  { t: 'Measure', d: 'Understand what worked and what can become better.' },
];

export default function AboutPage() {
  return (
    <>
      <header className={styles.hero}>
        <GradientWaves colors={['#f5f4f0', '#2b4cff', '#ff7a1a']} opacity={0.4} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <p className="eyebrow">About INKRIOT</p>
          <h1 className={styles.heroTitle}>
            We’re not<br />just a design<br /><GradientText>studio.</GradientText>
          </h1>
          <p className="lead" style={{ marginTop: '2rem' }}>
            INKRIOT is a multidisciplinary creative company built around one simple belief:
            good ideas shouldn’t be limited by one medium.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className={styles.storyGrid}>
            <div>
              <SectionHeader eyebrow="Our story" title="Started with a t-shirt." />
            </div>
            <div className={styles.storyBody}>
              <p>What began with graphics, typography and streetwear gradually expanded into a much bigger creative practice.</p>
              <p>Today, we work across graphic design, digital experiences, advertising, video, photography, cinematography, 3D, architecture, content, web development and physical products.</p>
              <p className={styles.thread}>The common thread is simple: <strong>we like making things.</strong></p>
            </div>
          </div>
        </div>
      </section>

      {/* Dissolve visual (portfolio/about animation) */}
      <section className={styles.visualSection}>
        <div className="container">
          <div className={styles.dissolveRow}>
            <DissolveImage src="/images/work-keepmoving.jpg" alt="INKRIOT creative work" className={styles.dissolve} />
            <DissolveImage src="/images/work-undo.jpg" alt="INKRIOT creative work" className={styles.dissolve} />
          </div>
          <p className={styles.hoverNote}>Hover to dissolve →</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="What drives us" title="Five things we keep returning to." />
          <div className={styles.drivers}>
            {DRIVERS.map((d, i) => (
              <Reveal key={d.t} delay={i * 50}>
                <article className={styles.driver}>
                  <span className={styles.driverNo}>{String(i + 1).padStart(2, '0')}</span>
                  <h3>{d.t}</h3>
                  <p>{d.d}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${styles.approachSection}`}>
        <div className="container">
          <SectionHeader eyebrow="Our approach" title="Think. Create. Build. Launch. Measure." />
          <ol className={styles.approach}>
            {APPROACH.map((a, i) => (
              <Reveal key={a.t} delay={i * 60} as="li" className={styles.step}>
                <span className={styles.stepNo}>{i + 1}</span>
                <div>
                  <h3>{a.t}</h3>
                  <p>{a.d}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.tech}>
            <p className="eyebrow">Human + Technology</p>
            <h2 className={styles.techTitle}>
              Technology doesn’t<br />replace <span className="c-yellow">creativity.</span>
            </h2>
            <p className="lead" style={{ margin: '1.5rem 0' }}>
              AI, 3D, automation and emerging technology are changing how creative work is produced.
              We embrace those tools — but creativity still starts with people.
            </p>
            <p className={styles.techLine}>
              <BlurText text="Human idea. Technology amplified. Better execution." />
            </p>
            <div style={{ marginTop: '2rem' }}>
              <SpecularButton href="/contact" variant="accent">Work with us</SpecularButton>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.closing}>
        <div className="container">
          <p className="eyebrow" style={{ justifyContent: 'center', display: 'flex' }}>The INKRIOT way</p>
          <div className={styles.closingHeading}>
            <TrueFocus sentence="Different mediums. One mindset." manualMode={false} blurAmount={4} borderColor="#2b4cff" animationDuration={0.6} pauseBetweenAnimations={0.8} />
          </div>
        </div>
      </section>
    </>
  );
}
