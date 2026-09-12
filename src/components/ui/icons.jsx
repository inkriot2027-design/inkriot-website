// Lightweight inline SVG icon set for INKRIOT disciplines.
// Stroke-based, currentColor, so they inherit accent colors cleanly.

const base = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };

export const IconDesign = (p) => (
  <svg {...base} {...p}><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>
);
export const IconDigital = (p) => (
  <svg {...base} {...p}><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
);
export const IconGrow = (p) => (
  <svg {...base} {...p}><path d="M3 3v18h18"/><path d="M18 9l-5 5-3-3-4 4"/></svg>
);
export const IconMove = (p) => (
  <svg {...base} {...p}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M10 9l5 3-5 3V9z"/></svg>
);
export const IconBuild = (p) => (
  <svg {...base} {...p}><path d="M12 2l9 5v10l-9 5-9-5V7l9-5z"/><path d="M12 12l9-5M12 12v10M12 12L3 7"/></svg>
);
export const IconWear = (p) => (
  <svg {...base} {...p}><path d="M16 3l4 2-2 4-2-1v13H8V8L6 9 4 5l4-2 2 2h4l2-2z"/></svg>
);
export const IconPhoto = (p) => (
  <svg {...base} {...p}><path d="M3 7h3l2-2h8l2 2h3v13H3V7z"/><circle cx="12" cy="13" r="4"/></svg>
);
export const IconArch = (p) => (
  <svg {...base} {...p}><path d="M3 21V9l9-6 9 6v12"/><path d="M9 21v-6h6v6"/></svg>
);
export const IconPrint = (p) => (
  <svg {...base} {...p}><rect x="6" y="14" width="12" height="7" rx="1"/><path d="M6 14V4h12v10"/><path d="M4 9h16a2 2 0 012 2v3H2v-3a2 2 0 012-2z"/></svg>
);
export const IconWrite = (p) => (
  <svg {...base} {...p}><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
);
export const IconAds = (p) => (
  <svg {...base} {...p}><path d="M3 11l18-6v14L3 13v-2z"/><path d="M6 12v4a2 2 0 004 0"/></svg>
);
export const IconArrow = (p) => (
  <svg {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>
);

export const ICONS = {
  design: IconDesign, digital: IconDigital, grow: IconGrow, move: IconMove,
  build: IconBuild, wear: IconWear, photo: IconPhoto, arch: IconArch,
  print: IconPrint, write: IconWrite, ads: IconAds, arrow: IconArrow,
};
