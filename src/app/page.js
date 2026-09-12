'use client';

import Link from 'next/link';
import HomeHero from '@/components/home/HomeHero';
import HomeDock from '@/components/home/HomeDock';
import CreativeWorlds from '@/components/home/CreativeWorlds';
import InteractiveGallery from '@/components/gallery/InteractiveGallery';
import LineSidebar from '@/components/reactbits/LineSidebar';
import SpecularButton from '@/components/reactbits/SpecularButton';
import GradientWaves from '@/components/reactbits/GradientWaves';
import BorderGlow from '@/components/reactbits/BorderGlow';
import GlareHover from '@/components/reactbits/GlareHover';
import { ShinyText, GradientText, TrueFocus, BlurText } from '@/components/reactbits/TextEffects';
import { Reveal, SectionHeader } from '@/components/ui/primitives';
import { PROJECTS, PORTFOLIO_CATEGORIES } from '@/data/portfolio';
import { GALLERY_IMAGES } from '@/data/gallery';
import styles from './home.module.css';

const SECTIONS = [
  { id: 'hero', label: 'Intro' },
  { id: 'what', label: 'What We Do' },
  { id: 'worlds', label: 'Worlds' },
  { id: 'work', label: 'Work' },
  { id: 'digital', label: 'Digital' },
  { id: 'media', label: 'Media' },
  { id: 'street', label: 'Street' },
  { id: 'gallery', label: 'Gallery' },
];

export default function HomePage() {
  const featured = PROJECTS.slice(0, 6);

  return (
    <>
      <LineSidebar sections={SECTIONS} />
      <HomeDock />

      {/* ── EDITORIAL IMAGE HERO (mannequin) ── */}
      <div id="hero">
        <HomeHero />
      </div>

      {/* ── WE CREATE. YOU GET NOTICED. ── */}
      <section className={styles.statement}>
        <div className="container">
          <Reveal>
            <h2 className={styles.bigStatement}>
              We create.<br />
              <GradientText>You get noticed.</GradientText>
            </h2>
          </Reveal>
        </div>
      </section>

      {/* ── 01 / WHAT WE DO ── */}
      <section id="what" className="section">
        <div className="container">
          <div className={styles.introGrid}>
            <div>
              <SectionHeader index="01" eyebrow="What We Do" title={
                <>One studio.<br />Many ways<br />to create.</>
              } />
            </div>
            <div className={styles.introBody}>
              <p className="lead">
                INKRIOT is a multidisciplinary creative studio working across design, digital,
                advertising, media, technology and production.
              </p>
              <p className={styles.introP}>
                From graphic design and websites to cinematic shoots, architecture, 3D, advertising
                and content — we bring different creative disciplines together to build work that has
                a purpose and an impact.
              </p>
              <p className={styles.introEmphasis}>
                <BlurText text="Different mediums. One creative mindset." />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CREATIVE WORLDS ── */}
      <section id="worlds" className="section">
        <div className="container">
          <SectionHeader eyebrow="Creative Worlds" title="Six worlds. One engine." />
          <CreativeWorlds />
        </div>
      </section>

      {/* ── 02 / SELECTED WORK ── */}
      <section id="work" className={`section ${styles.workSection}`}>
        <div className="container">
          <SectionHeader index="02" eyebrow="Selected Work" title="Ideas made visible." />
          <div className={styles.filters}>
            {PORTFOLIO_CATEGORIES.slice(0, 8).map((c) => (
              <span key={c} className={styles.filterChip}>{c}</span>
            ))}
          </div>
          <div className={styles.workGrid}>
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={i * 50} className={styles.workCell}>
                <Link href={`/portfolio/${p.slug}`}>
                  <GlareHover className={styles.workCard}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.cover} alt={p.name} loading="lazy" />
                    <div className={styles.workMeta}>
                      <span className={styles.workCat} style={{ color: p.color }}>{p.category}</span>
                      <h3>{p.name}</h3>
                    </div>
                  </GlareHover>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className={styles.centerCta}>
            <SpecularButton href="/portfolio">View all work</SpecularButton>
          </div>
        </div>
      </section>

      {/* ── BIG STATEMENT: pixels → print ── */}
      <section className={styles.pixels}>
        <GradientWaves colors={['#f5f4f0', '#2b4cff', '#ff7a1a']} opacity={0.55} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <Reveal>
            <h2 className={styles.pixelsHeading}>
              From pixels<br />to print.<br />
              <span className="c-yellow">From screen<br />to real life.</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className={styles.pixelsBody}>
              A brand can become a campaign. A campaign can become a film. A design can become a
              website. A 3D concept can become a physical product. A T-shirt can become a movement.
              We build across mediums.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 03 / DIGITAL ── */}
      <section id="digital" className="section">
        <div className="container">
          <div className={styles.splitSection}>
            <div>
              <SectionHeader index="03" eyebrow="Digital" title={
                <>Your brand<br />deserves more<br />than a template.</>
              } />
              <SpecularButton href="/digital">Build something digital</SpecularButton>
            </div>
            <BorderGlow glow="var(--ink-blue)" className={styles.serviceList}>
              <p className="lead" style={{ marginBottom: '1.5rem' }}>
                We design and develop digital experiences that look distinctive, feel intuitive and
                work across screens.
              </p>
              <ul className={styles.pillList}>
                {['Web Design', 'Web Development', 'UI/UX', 'Landing Pages', 'E-commerce', 'Digital Experiences'].map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </BorderGlow>
          </div>
        </div>
      </section>

      {/* ── 04 / ADVERTISING ── */}
      <section className={`section ${styles.adSection}`}>
        <div className="container">
          <SectionHeader index="04" eyebrow="Advertising" title={
            <>Stop paying for<br />people to scroll past.</>
          } />
          <div className={styles.adGrid}>
            {[
              { t: 'Meta Ads', d: 'Creative campaigns for Facebook and Instagram.', c: 'var(--ink-blue)' },
              { t: 'Google Ads', d: 'Search and performance campaigns designed around intent.', c: 'var(--ink-green)' },
              { t: 'Creative Advertising', d: 'From concept and design to video, copy and campaign assets — the whole creative ecosystem.', c: 'var(--ink-orange)' },
            ].map((a, i) => (
              <Reveal key={a.t} delay={i * 60}>
                <article className={styles.adCard} style={{ '--ac': a.c }}>
                  <h3>{a.t}</h3>
                  <p>{a.d}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <div className={styles.centerCta}>
            <SpecularButton href="/contact" variant="ghost">Talk about your campaign</SpecularButton>
          </div>
        </div>
      </section>

      {/* ── 05 / MEDIA ── */}
      <section id="media" className="section">
        <div className="container">
          <SectionHeader index="05" eyebrow="Media" title={
            <>Shoot it.<span className="c-red"> Cut it.</span> Make them watch.</>
          } />
          <div className={styles.tagRow}>
            {['Photography', 'Cinematography', 'Ad Shoots', 'Video Editing', 'Motion Graphics', 'Social Content'].map((t) => (
              <span key={t} className={styles.bigTag}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 06/07 3D + ARCHITECTURE (compact dual) ── */}
      <section className={`section ${styles.buildSection}`}>
        <div className="container">
          <div className={styles.dual}>
            <Reveal>
              <div className={styles.dualCard}>
                <p className="eyebrow">06 / 3D</p>
                <h3 className={styles.dualTitle}>If it doesn’t exist, we can build it.</h3>
                <p className="muted">3D design, animation, rendering, product visuals and architectural visualisation — worlds before they exist in reality.</p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className={styles.dualCard}>
                <p className="eyebrow">07 / Architecture</p>
                <h3 className={styles.dualTitle}>Designing spaces before they exist.</h3>
                <p className="muted">Architectural visuals, 3D modelling, walkthroughs and presentation visuals that make ideas understandable before construction begins.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 08 STREETWEAR ── */}
      <section id="street" className={styles.streetSection}>
        <div className="container">
          <div className={styles.streetGrid}>
            <div>
              <p className="eyebrow">08 / INKRIOT Street</p>
              <h2 className={styles.streetTitle}>
                Started with<br />a t-shirt.
              </h2>
              <p className="lead" style={{ margin: '1.5rem 0' }}>
                T-shirts remain part of the INKRIOT DNA. Original graphics, limited designs and
                streetwear built around typography, culture, attitude and experimentation.
              </p>
              <p className={styles.streetSlogan}>
                <TrueFocus sentence="Designed by INKRIOT. Made to be worn." />
              </p>
              <div style={{ marginTop: '1.5rem' }}>
                <SpecularButton href="/store" variant="accent">Shop INKRIOT</SpecularButton>
              </div>
            </div>
            <div className={styles.streetImages}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/work-harvest.jpg" alt="INKRIOT streetwear creative" loading="lazy" />
            </div>
          </div>
          <p className={styles.wearRebellion}><ShinyText>Wear the Rebellion</ShinyText></p>
        </div>
      </section>

      {/* ── 3D PRINTING ── */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className={styles.printBanner}>
              <div>
                <p className="eyebrow">3D Printing</p>
                <h3 className={styles.printTitle}>Digital idea. Physical object.</h3>
                <p className="muted" style={{ maxWidth: '46ch' }}>
                  We take 3D concepts beyond the screen — prototypes, products, sculptures, characters
                  and experimental pieces. Design → Model → Print.
                </p>
              </div>
              <SpecularButton href="/services" variant="ghost">Explore 3D printing</SpecularButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── HOME GALLERY ── */}
      <section id="gallery" className={styles.gallerySection}>
        <div className="container">
          <SectionHeader eyebrow="Gallery" title="A wall of work." />
        </div>
        <InteractiveGallery images={GALLERY_IMAGES} height="60vh" />
        <div className="container">
          <div className={styles.centerCta}>
            <SpecularButton href="/gallery">Open full gallery</SpecularButton>
          </div>
        </div>
      </section>
    </>
  );
}
