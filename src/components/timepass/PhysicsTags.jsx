'use client';

import { useEffect, useRef } from 'react';
import styles from './PhysicsTags.module.css';

/**
 * PhysicsTags — adapted from the uploaded "griflan hover effect" (ZIP 07),
 * which uses matter-js to drop physical tag bodies into a container on
 * hover. Here, tags fall and settle with gravity/collision when the panel
 * is hovered, and are cleared when the pointer leaves. Gracefully does
 * nothing on reduced-motion.
 */
export default function PhysicsTags({ tags = [], className = '' }) {
  const containerRef = useRef(null);
  const engineRef = useRef(null);
  const rafRef = useRef(0);
  const cleanupRef = useRef(null);

  const spawn = async () => {
    const container = containerRef.current;
    if (!container || engineRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const Matter = (await import('matter-js')).default;
    const { Engine, World, Bodies, Body } = Matter;

    const w = container.clientWidth;
    const h = container.clientHeight;
    const engine = Engine.create();
    engine.gravity.y = 1;
    engineRef.current = engine;

    // Walls
    const opts = { isStatic: true, render: { visible: false } };
    const walls = [
      Bodies.rectangle(w / 2, h + 30, w, 60, opts),
      Bodies.rectangle(-30, h / 2, 60, h, opts),
      Bodies.rectangle(w + 30, h / 2, 60, h, opts),
    ];
    World.add(engine.world, walls);

    const els = [];
    const bodies = [];
    tags.forEach((label, i) => {
      const el = document.createElement('span');
      el.className = styles.tag;
      el.textContent = label;
      container.appendChild(el);
      const tw = el.offsetWidth;
      const th = el.offsetHeight;
      const x = 40 + Math.random() * Math.max(1, w - 80);
      const y = -50 - i * 60;
      const body = Bodies.rectangle(x, y, tw, th, { restitution: 0.4, friction: 0.4, chamfer: { radius: th / 2 } });
      World.add(engine.world, body);
      els.push(el);
      bodies.push(body);
    });

    const update = () => {
      rafRef.current = requestAnimationFrame(update);
      Engine.update(engine, 1000 / 60);
      for (let i = 0; i < bodies.length; i++) {
        const b = bodies[i];
        els[i].style.transform = `translate(${b.position.x - els[i].offsetWidth / 2}px, ${b.position.y - els[i].offsetHeight / 2}px) rotate(${b.angle}rad)`;
      }
    };
    update();

    cleanupRef.current = () => {
      cancelAnimationFrame(rafRef.current);
      World.clear(engine.world, false);
      Engine.clear(engine);
      els.forEach((el) => el.remove());
      engineRef.current = null;
      cleanupRef.current = null;
    };
  };

  const clear = () => { if (cleanupRef.current) cleanupRef.current(); };

  useEffect(() => () => clear(), []);

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${className}`}
      onPointerEnter={spawn}
      onPointerLeave={clear}
    >
      <span className={styles.hint}>Hover me</span>
    </div>
  );
}
