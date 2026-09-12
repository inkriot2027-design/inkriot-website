'use client';

import useInView from '@/hooks/useInView';
import styles from './primitives.module.css';

/* Reveal — fades + rises content into view on scroll. */
export function Reveal({ children, delay = 0, as: Tag = 'div', className = '' }) {
  const [ref, inView] = useInView({ threshold: 0.15 });
  return (
    <Tag
      ref={ref}
      className={`${styles.reveal} ${inView ? styles.revealIn : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/* SectionHeader — the recurring "01 / What we do" + big display pattern. */
export function SectionHeader({ index, eyebrow, title, className = '' }) {
  return (
    <div className={`${styles.header} ${className}`}>
      {(index || eyebrow) && (
        <p className="eyebrow">{index ? `${index} / ` : ''}{eyebrow}</p>
      )}
      {title && <h2 className={styles.headerTitle}>{title}</h2>}
    </div>
  );
}

/* PageHero — consistent page-top hero for interior pages. */
export function PageHero({ eyebrow, title, lead, children, tone = 'default' }) {
  return (
    <header className={`${styles.pageHero} ${styles[`tone_${tone}`] || ''}`}>
      <div className="container">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className={styles.pageTitle}>{title}</h1>
        {lead && <p className="lead" style={{ marginTop: '1.5rem' }}>{lead}</p>}
        {children}
      </div>
    </header>
  );
}
