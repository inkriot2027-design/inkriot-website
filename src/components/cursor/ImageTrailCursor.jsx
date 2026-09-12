'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './ImageTrailCursor.module.css';

/**
 * ImageTrailCursor — the GSAP image-trail behaviour from the supplied ZIP,
 * ported to a reusable React/Next component and tuned for INKRIOT.
 *
 * Behaviour (faithful to the source script.js):
 *  - track the pointer; when it moves past a distance threshold, reveal the
 *    next image in a cycling pool at the (lerped) cursor position
 *  - each image tweens toward the live cursor (expo.out), fades out
 *    (power1.out) and scales down (power4.out) — the classic trail
 *
 * Integration guarantees:
 *  - the native arrow cursor stays visible/usable (we never hide it)
 *  - fixed, full-screen, pointer-events:none overlay → never blocks
 *    clicks, links, forms, scrolling, the Bubble Menu, Dock or video
 *  - uses clientX/clientY + position:fixed so it stays aligned under the
 *    site's Lenis smooth-scroll (no page-offset drift)
 *  - single RAF loop; all tweens + listeners cleaned up on unmount, so no
 *    duplicate trails or loops accumulate across route changes
 *  - disabled on touch / coarse pointers / reduced-motion
 *  - only local INKRIOT imagery — no external requests
 */

// Local INKRIOT imagery for the trail (no external/Cloudinary requests).
const TRAIL_IMAGES = [
  '/gallery/slide-1.jpg',
  '/gallery/slide-4.jpg',
  '/gallery/slide-7.jpg',
  '/gallery/slide-9.jpg',
  '/gallery/slide-12.jpg',
  '/gallery/slide-14.jpg',
  '/gallery/slide-16.jpg',
  '/gallery/slide-18.jpg',
  '/images/work-ideas.jpg',
  '/images/work-undo.jpg',
  '/images/work-harvest.jpg',
  '/images/work-tie.jpg',
];

const lerp = (a, b, n) => (1 - n) * a + n * b;
const distance = (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1);

export default function ImageTrailCursor() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ---- gates: desktop pointer + motion allowed ----
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;

    const imgEls = Array.from(container.querySelectorAll(`.${styles.img}`));
    if (!imgEls.length) return;

    let mousePos = { x: 0, y: 0 };
    let lastMousePos = { x: 0, y: 0 };
    let cacheMousePos = { x: 0, y: 0 };
    let started = false;

    const onMove = (ev) => {
      // clientX/Y + fixed positioning keeps the trail aligned regardless
      // of (smooth) scroll offset.
      mousePos = { x: ev.clientX, y: ev.clientY };
      if (!started) {
        // seed caches so the first image doesn't fly in from (0,0)
        cacheMousePos = { ...mousePos };
        lastMousePos = { ...mousePos };
        started = true;
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const rects = imgEls.map((el) => el.getBoundingClientRect());
    const refreshRects = () => {
      imgEls.forEach((el, i) => { rects[i] = el.getBoundingClientRect(); });
    };
    window.addEventListener('resize', refreshRects);

    const state = {
      imgPosition: 0,
      zIndexVal: 1,
      threshold: 90,   // px of movement before the next image reveals
      total: imgEls.length,
    };

    const isActive = (el) =>
      gsap.isTweening(el) || parseFloat(getComputedStyle(el).opacity) !== 0;

    const showNextImage = () => {
      const el = imgEls[state.imgPosition];
      const rect = rects[state.imgPosition];
      state.zIndexVal += 1;
      gsap.killTweensOf(el);

      gsap.timeline()
        .set(el, {
          opacity: 1,
          scale: 1,
          zIndex: state.zIndexVal,
          x: cacheMousePos.x - rect.width / 2,
          y: cacheMousePos.y - rect.height / 2,
        }, 0)
        .to(el, {
          duration: 0.9,
          ease: 'expo.out',
          x: mousePos.x - rect.width / 2,
          y: mousePos.y - rect.height / 2,
        }, 0)
        .to(el, {
          duration: 1,
          ease: 'power1.out',
          opacity: 0,
        }, 0.4)
        .to(el, {
          duration: 1,
          ease: 'power4.out',
          scale: 0.2,
        }, 0.4);
    };

    let raf = 0;
    const render = () => {
      const dist = distance(mousePos.x, mousePos.y, lastMousePos.x, lastMousePos.y);

      cacheMousePos.x = lerp(cacheMousePos.x || mousePos.x, mousePos.x, 0.1);
      cacheMousePos.y = lerp(cacheMousePos.y || mousePos.y, mousePos.y, 0.1);

      if (dist > state.threshold) {
        showNextImage();
        state.imgPosition = state.imgPosition < state.total - 1 ? state.imgPosition + 1 : 0;
        lastMousePos = { ...mousePos };
      }

      // reset z-index when idle (matches original)
      let isIdle = true;
      for (const el of imgEls) { if (isActive(el)) { isIdle = false; break; } }
      if (isIdle && state.zIndexVal !== 1) state.zIndexVal = 1;

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    // ---- teardown: kill loop, tweens, listeners (no dup trails/loops) ----
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', refreshRects);
      imgEls.forEach((el) => gsap.killTweensOf(el));
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.trail} aria-hidden="true">
      {TRAIL_IMAGES.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={i} className={styles.img} src={src} alt="" draggable="false" />
      ))}
    </div>
  );
}
