'use client';

import RealBorderGlow from './BorderGlowReal';

const HEX_RGB = {
  'var(--ink-blue)': '43 76 255',
  'var(--ink-green)': '22 179 87',
  'var(--ink-orange)': '255 122 26',
  'var(--ink-red)': '229 38 43',
  'var(--ink-yellow)': '255 212 0',
};

/**
 * BorderGlow adapter — the real React Bits Border Glow with a LIGHT card
 * interior (the raw default is near-black #120F17). Accepts a `glow`
 * prop using INKRIOT css vars and maps it to the component's rgb glow.
 */
export default function BorderGlow({ children, className = '', glow = 'var(--ink-blue)', ...rest }) {
  const glowColor = HEX_RGB[glow] || '43 76 255';
  return (
    <RealBorderGlow
      className={className}
      glowColor={glowColor}
      backgroundColor="#ffffff"
      borderRadius={16}
      glowRadius={44}
      glowIntensity={0.9}
      colors={['#2b4cff', '#ff7a1a', '#16b357']}
      fillOpacity={0.35}
      {...rest}
    >
      {children}
    </RealBorderGlow>
  );
}
