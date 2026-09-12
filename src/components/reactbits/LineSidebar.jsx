'use client';

import { useEffect, useState } from 'react';
import styles from './LineSidebar.module.css';

/**
 * LineSidebar — a slim vertical section navigator down the side of the
 * Home page. The active section's line extends and its label reveals as
 * you scroll. Hidden on tablet/mobile. Light-theme (ink lines on paper).
 */
export default function LineSidebar({ sections = [] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = sections.findIndex((s) => s.id === e.target.id);
            if (idx >= 0) setActive(idx);
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  const go = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className={styles.sidebar} aria-label="Sections">
      <ul>
        {sections.map((s, i) => (
          <li key={s.id}>
            <button
              className={`${styles.item} ${i === active ? styles.active : ''}`}
              onClick={() => go(s.id)}
              aria-current={i === active}
            >
              <span className={styles.line} />
              <span className={styles.label}>{s.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
