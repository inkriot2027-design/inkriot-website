'use client';

import RealGradientWaves from './GradientWavesReal';

/**
 * GradientWaves adapter — wraps the REAL React Bits Gradient Waves
 * background (ogl raymarched waves) as an ABSOLUTELY-positioned layer
 * that fills its (position:relative) parent, so it acts as a true
 * background and never pushes hero content down the page.
 *
 * Maps INKRIOT's palette onto horizon/wave/crest. Light horizon keeps
 * the page background light.
 */
export default function GradientWaves({
  colors,
  horizonColor,
  waveColor,
  crestColor,
  opacity = 0.9,
  brightness = 1.18,
  speed = 0.35,
  className = '',
  ...rest
}) {
  const [h, w, c] = colors || [];
  return (
    <div
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}
    >
      <RealGradientWaves
        horizonColor={horizonColor || h || '#f5f4f0'}
        waveColor={waveColor || w || '#2b4cff'}
        crestColor={crestColor || c || '#ffffff'}
        opacity={opacity}
        brightness={brightness}
        speed={speed}
        mouseInteraction={false}
        grain={false}
        className={className}
        {...rest}
      />
    </div>
  );
}
