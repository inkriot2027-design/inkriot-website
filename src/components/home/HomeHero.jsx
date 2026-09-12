'use client';

import { useEffect, useRef, useState } from 'react';
import SpecularButton from '@/components/reactbits/SpecularButton';
import { RotatingText, GradientText } from '@/components/reactbits/TextEffects';
import styles from './HomeHero.module.css';

/**
 * HomeHero — the new light, editorial Home entrance built around the
 * uploaded mannequin image (replaces the old scroll-scrub video).
 *
 * Composition: an oversized brand wordmark sits behind a centered
 * mannequin (the visual anchor), with restrained messaging flanking it
 * and a single rotating discipline line. Everything enters with a
 * subtle, restrained animation (fade + slight rise + 96%→100% scale on
 * the image) and then settles — normal scrolling continues underneath.
 *
 * No dark container, no gradient — it lives on the light #F5F4F0 base.
 * Responsive: the flanking text stacks below the image on small screens
 * so the mannequin stays fully visible and never overlaps text.
 */
export default function HomeHero() {
  const [entered, setEntered] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    // trigger the entrance on mount (next frame so transitions apply)
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <header
      ref={ref}
      className={`${styles.hero} ${entered ? styles.entered : ''}`}
      aria-label="INKRIOT — creative & digital studio"
    >
      {/* Oversized wordmark behind the figure */}
      <div className={styles.backdrop} aria-hidden="true">
        <span className={styles.wordmark}>INKRIOT</span>
      </div>

      <div className={styles.grid}>
        {/* Left rail — eyebrow + headline */}
        <div className={`${styles.rail} ${styles.railLeft}`}>
          <p className={`eyebrow ${styles.eyebrow}`}>Creative &amp; Digital Studio</p>
          <h1 className={styles.headline}>
            We don’t<br /><GradientText>do boring.</GradientText>
          </h1>
          <div className={styles.rotate}>
            <span>We make</span>
            <RotatingText words={['brands.', 'websites.', 'films.', 'campaigns.', 'spaces.', 'identities.']} />
          </div>
        </div>

        {/* Center — the mannequin (visual anchor) */}
        <div className={styles.figure}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-mannequin.jpg"
            alt="INKRIOT — a faceless figure in a black coat and gold vest, hands open"
            className={styles.figureImg}
            width={1440}
            height={900}
            fetchPriority="high"
            decoding="async"
          />
        </div>

        {/* Right rail — supporting line + CTAs */}
        <div className={`${styles.rail} ${styles.railRight}`}>
          <p className={styles.lede}>
            Brands, visuals, websites, campaigns, content, films, spaces and experiences —
            for people who want to be noticed.
          </p>
          <p className={styles.tag}>Design · Digital · Media · Production · Technology</p>
          <div className={styles.ctas}>
            <SpecularButton href="/portfolio" variant="accent">View our work</SpecularButton>
            <SpecularButton href="/contact" variant="ghost">Start a project</SpecularButton>
          </div>
        </div>
      </div>

      <div className={styles.scrollCue} aria-hidden="true">
        <span>Scroll</span><i />
      </div>
    </header>
  );
}
