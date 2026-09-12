'use client';
import { useEffect, useRef, useState } from 'react';

// Lightweight IntersectionObserver hook for scroll reveals.
export default function useInView({ threshold = 0.15, once = true, rootMargin = '0px 0px -10% 0px' } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Safety: if IntersectionObserver is unavailable, reveal immediately
    // so content is never stuck invisible.
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );
    io.observe(el);

    // Fallback: guarantee reveal within 1.2s even if the observer never
    // fires (e.g. element rendered off-screen then measured oddly).
    const failsafe = setTimeout(() => setInView(true), 1200);

    return () => { io.disconnect(); clearTimeout(failsafe); };
  }, [threshold, once, rootMargin]);
  return [ref, inView];
}
