'use client';

import RealGlareHover from './GlareHoverReal';

/**
 * GlareHover adapter — the real React Bits Glare Hover, defaulted to
 * fill its container transparently so it can wrap INKRIOT cards/media
 * (the raw component is a fixed 500×500 black box by default).
 */
export default function GlareHover({ children, className = '', glareColor = '#ffffff', ...rest }) {
  return (
    <RealGlareHover
      width="100%"
      height="100%"
      background="transparent"
      borderColor="transparent"
      borderRadius="0px"
      glareColor={glareColor}
      glareOpacity={0.35}
      glareSize={300}
      transitionDuration={800}
      className={className}
      style={{ display: 'block' }}
      {...rest}
    >
      {children}
    </RealGlareHover>
  );
}
