'use client';

import Link from 'next/link';
import { SOCIAL_LINKS } from '@/data/nav';
import SpecularButton from '@/components/reactbits/SpecularButton';
import styles from './Footer.module.css';

const FOOTER_NAV = [
  { label: 'Work', href: '/portfolio' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Lab', href: '/lab' },
  { label: 'Store', href: '/store' },
  { label: 'Careers', href: '/careers' },
  { label: 'Journal', href: '/journal' },
  { label: 'Contact', href: '/contact' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.cta}>
          <p className="eyebrow">Have an idea?</p>
          <h2 className={styles.ctaHeading}>Make it real.</h2>
          <SpecularButton href="/contact">Start a project</SpecularButton>
        </div>

        <div className={styles.grid}>
          <div className={styles.brandCol}>
            <div className={styles.brand}>INKRIOT<span>®</span></div>
            <p className={styles.tagline}>Creative / Digital / Media / Technology / Streetwear</p>
          </div>

          <nav className={styles.nav} aria-label="Footer">
            {FOOTER_NAV.map((l) => (
              <Link key={l.href} href={l.href}>{l.label}</Link>
            ))}
          </nav>

          <div className={styles.social}>
            <p className={styles.colTitle}>Follow</p>
            {SOCIAL_LINKS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>
            ))}
          </div>
        </div>

        <div className={styles.bottom}>
          <span>INKRIOT® © 2026</span>
          <span>Design / Digital / Media / Technology</span>
          <span className={styles.closing}>
            Built with ideas, curiosity &amp; a little creative chaos.
          </span>
        </div>
      </div>
    </footer>
  );
}
