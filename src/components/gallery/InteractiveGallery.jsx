'use client';

import { useEffect, useRef } from 'react';
import styles from './InteractiveGallery.module.css';

/**
 * InteractiveGallery — a horizontal, draggable image gallery inspired by
 * the uploaded gallery slider (GSAP scale-on-center). Items scale up as
 * they pass the viewport center. Supports mouse drag, touch, and wheel
 * (horizontal), with momentum. Used on Home and the Gallery page.
 */
export default function InteractiveGallery({ images = [], height = '62vh' }) {
  const trackRef = useRef(null);
  const rafRef = useRef(0);
  const state = useRef({ x: 0, target: 0, dragging: false, startX: 0, startTarget: 0, max: 0, v: 0 });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const s = state.current;

    const clamp = () => {
      s.max = Math.max(0, track.scrollWidth - track.parentElement.clientWidth);
      s.target = Math.min(0, Math.max(-s.max, s.target));
    };
    clamp();

    const applyScale = () => {
      const center = window.innerWidth / 2;
      const cards = track.children;
      for (let i = 0; i < cards.length; i++) {
        const r = cards[i].getBoundingClientRect();
        const cardCenter = r.left + r.width / 2;
        const dist = Math.abs(center - cardCenter) / window.innerWidth;
        const scale = Math.max(0.86, 1.06 - dist * 0.5);
        cards[i].style.setProperty('--s', scale.toFixed(3));
      }
    };

    const render = () => {
      rafRef.current = requestAnimationFrame(render);
      s.x += (s.target - s.x) * 0.09;
      track.style.transform = `translate3d(${s.x}px,0,0)`;
      applyScale();
    };
    rafRef.current = requestAnimationFrame(render);

    // ── Wheel: translate vertical intent into horizontal pan ──
    const onWheel = (e) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      // only hijack when pointer is over the gallery and there's horizontal room
      s.target -= delta;
      clamp();
    };
    track.parentElement.addEventListener('wheel', onWheel, { passive: true });

    // ── Drag ──
    const onDown = (e) => {
      s.dragging = true;
      s.startX = (e.touches ? e.touches[0].clientX : e.clientX);
      s.startTarget = s.target;
      track.parentElement.classList.add(styles.grabbing);
    };
    const onMove = (e) => {
      if (!s.dragging) return;
      const x = (e.touches ? e.touches[0].clientX : e.clientX);
      s.target = s.startTarget + (x - s.startX) * 1.4;
      clamp();
    };
    const onUp = () => { s.dragging = false; track.parentElement.classList.remove(styles.grabbing); };

    const el = track.parentElement;
    el.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    el.addEventListener('touchstart', onDown, { passive: true });
    el.addEventListener('touchmove', onMove, { passive: true });
    el.addEventListener('touchend', onUp);

    const onResize = () => clamp();
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      el.removeEventListener('touchstart', onDown);
      el.removeEventListener('touchmove', onMove);
      el.removeEventListener('touchend', onUp);
      window.removeEventListener('resize', onResize);
    };
  }, [images]);

  return (
    <div className={styles.viewport} style={{ '--h': height }}>
      <div ref={trackRef} className={styles.track}>
        {images.map((img, i) => (
          <figure key={i} className={styles.card}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.src} alt={img.alt || ''} loading="lazy" draggable="false" />
          </figure>
        ))}
      </div>
      <p className={styles.hint}>Drag / scroll to explore →</p>
    </div>
  );
}
