'use client';

import Link from 'next/link';
import { useRef } from 'react';
import styles from './SpecularButton.module.css';

/**
 * SpecularButton — INKRIOT CTA with a pointer-tracked specular sheen.
 * Renders a Link when `href` is set, else a <button>. Light-theme:
 * solid = ink on paper, accent = blue, ghost = outlined.
 */
export default function SpecularButton({ children, href, onClick, type = 'button', variant = 'solid', ...rest }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  const cls = `${styles.btn} ${styles[variant] || ''}`;
  const content = (
    <>
      <span className={styles.spec} aria-hidden="true" />
      <span className={styles.label}>{children}</span>
      <span className={styles.arrow} aria-hidden="true">→</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} ref={ref} className={cls} onMouseMove={onMove} {...rest}>
        {content}
      </Link>
    );
  }
  return (
    <button ref={ref} type={type} className={cls} onMouseMove={onMove} onClick={onClick} {...rest}>
      {content}
    </button>
  );
}
