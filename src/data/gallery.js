// Gallery images — 20 slides from the uploaded gallery ZIP plus branded work.
export const GALLERY_IMAGES = [
  ...Array.from({ length: 20 }, (_, i) => ({
    src: `/gallery/slide-${i + 1}.jpg`,
    alt: `INKRIOT gallery ${i + 1}`,
  })),
  { src: '/images/work-ideas.jpg', alt: "Ideas Don't Wait" },
  { src: '/images/work-undo.jpg', alt: 'Undo The Ordinary' },
  { src: '/images/work-harvest.jpg', alt: 'Harvest Your Creativity' },
  { src: '/images/work-tie.jpg', alt: 'Tie The Moment' },
];
