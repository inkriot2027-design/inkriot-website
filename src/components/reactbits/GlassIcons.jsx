'use client';

import RealGlassIcons from './GlassIconsReal';

// Map INKRIOT palette to gradient backgrounds the real component paints.
const GRAD = {
  'var(--ink-red)': 'linear-gradient(hsl(2, 78%, 52%), hsl(2, 78%, 38%))',
  'var(--ink-green)': 'linear-gradient(hsl(145, 78%, 40%), hsl(145, 78%, 28%))',
  'var(--ink-blue)': 'linear-gradient(hsl(228, 100%, 58%), hsl(228, 100%, 42%))',
  'var(--ink-orange)': 'linear-gradient(hsl(24, 100%, 55%), hsl(24, 100%, 42%))',
  'var(--ink-yellow)': 'linear-gradient(hsl(51, 100%, 50%), hsl(45, 100%, 42%))',
};

/**
 * GlassIcons adapter — the real React Bits Glass Icons. Maps each item's
 * INKRIOT color var onto the gradient `color` the component expects.
 * items: [{ icon, label, color }]
 */
export default function GlassIcons({ items = [], className = '' }) {
  const mapped = items.map((it) => ({
    ...it,
    color: GRAD[it.color] || it.color || GRAD['var(--ink-blue)'],
  }));
  return <RealGlassIcons items={mapped} className={className} />;
}
