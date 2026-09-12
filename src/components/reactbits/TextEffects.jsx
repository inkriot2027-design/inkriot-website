'use client';

/**
 * Compatibility barrel: exposes the REAL React Bits text-animation
 * components under the names the pages already use, adapting props so
 * existing markup keeps working while rendering the genuine components.
 *
 * Real components live one-per-file in this folder (BlurText.jsx,
 * GradientText.jsx, ShinyText.jsx, TrueFocus.jsx, FoldText.jsx,
 * RotatingText.jsx, SplitText.jsx).
 */

import RealBlur from './BlurText';
import RealGradient from './GradientText';
import RealShiny from './ShinyText';
import RealTrueFocus from './TrueFocus';
import RealFold from './FoldText';
import RealRotating from './RotatingText';
import RealSplit from './SplitText';

// BlurText: page passes `text`
export function BlurText({ text = '', className = '', ...rest }) {
  return <RealBlur text={text} className={className} {...rest} />;
}

// GradientText: page passes children → real one renders children
export function GradientText({ children, className = '', colors, ...rest }) {
  const props = { className, ...rest };
  if (colors) props.colors = colors;
  return <RealGradient {...props}>{children}</RealGradient>;
}

// ShinyText: page passes children → real one wants `text`
export function ShinyText({ children, text, className = '', ...rest }) {
  const value = text ?? (typeof children === 'string' ? children : '');
  return <RealShiny text={value} className={className} {...rest} />;
}

// TrueFocus: page passes `sentence`
export function TrueFocus({ sentence = '', className = '', ...rest }) {
  return (
    <span className={className} style={{ display: 'inline-flex', justifyContent: 'center' }}>
      <RealTrueFocus sentence={sentence} {...rest} />
    </span>
  );
}

// FoldText: page passes `text`
export function FoldText({ text = '', className = '', ...rest }) {
  return <RealFold text={text} className={className} {...rest} />;
}

// RotatingText: page passes `words` → real one wants `texts`
export function RotatingText({ words = [], texts, className = '', ...rest }) {
  const list = texts ?? words;
  return (
    <RealRotating
      texts={list}
      mainClassName={className}
      staggerFrom="last"
      staggerDuration={0.02}
      rotationInterval={2200}
      splitLevelClassName="rotating-line"
      {...rest}
    />
  );
}

// SplitText passthrough (real)
export function SplitText({ text = '', className = '', ...rest }) {
  return <RealSplit text={text} className={className} {...rest} />;
}
