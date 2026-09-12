// The six "creative worlds" that organize INKRIOT's disciplines,
// plus the full services list. Data-driven so pages stay thin.

export const CREATIVE_WORLDS = [
  {
    no: '01', key: 'create', title: 'Create', color: 'var(--ink-red)',
    items: ['Graphic Design', 'Branding', 'Content Writing', 'T-Shirt Design'],
    icon: 'design',
  },
  {
    no: '02', key: 'digital', title: 'Digital', color: 'var(--ink-blue)',
    items: ['Web Design', 'Web Development', 'UI/UX', 'Digital Experiences'],
    icon: 'digital',
  },
  {
    no: '03', key: 'grow', title: 'Grow', color: 'var(--ink-green)',
    items: ['Digital Marketing', 'Meta Ads', 'Google Ads', 'Social Media Campaigns'],
    icon: 'grow',
  },
  {
    no: '04', key: 'move', title: 'Move', color: 'var(--ink-orange)',
    items: ['Video Editing', 'Motion Graphics', 'Photography', 'Cinematography', 'Ad Shoots'],
    icon: 'move',
  },
  {
    no: '05', key: 'build', title: 'Build', color: 'var(--ink-yellow)',
    items: ['3D Design', 'Architecture', '3D Visualisation', '3D Printing'],
    icon: 'build',
  },
  {
    no: '06', key: 'wear', title: 'Wear', color: 'var(--ink-white)',
    items: ['T-Shirts', 'Streetwear', 'Limited Drops', 'INKRIOT Store'],
    icon: 'wear',
  },
];

export const SERVICES = [
  {
    slug: 'graphic-design', title: 'Graphic Design', tagline: 'Make it visually loud.', icon: 'design', color: 'var(--ink-red)',
    items: ['Logo Design', 'Brand Identity', 'Social Media Creatives', 'Posters', 'Flyers', 'Brochures', 'Packaging', 'Presentations', 'Marketing Materials', 'Event Designs', 'Campaign Graphics', 'Print Design', 'Digital Design'],
  },
  {
    slug: 'web', title: 'Web Design & Development', tagline: 'Design it. Build it. Put it online.', icon: 'digital', color: 'var(--ink-blue)',
    items: ['Website Design', 'UI/UX', 'Landing Pages', 'Business Websites', 'Portfolio Websites', 'E-commerce', 'Responsive Development', 'Interactive Websites', 'Creative Websites', 'Website Maintenance'],
  },
  {
    slug: 'digital-marketing', title: 'Digital Marketing', tagline: 'More than just a post.', icon: 'grow', color: 'var(--ink-green)',
    items: ['Social Media Marketing', 'Content Strategy', 'Campaign Planning', 'Creative Campaigns', 'Social Media Content', 'Digital Campaigns', 'Performance Marketing', 'Brand Promotion'],
  },
  {
    slug: 'ads', title: 'Meta & Google Ads', tagline: 'Put your brand in front of the right people.', icon: 'ads', color: 'var(--ink-green)',
    items: ['Meta — Facebook + Instagram advertising', 'Google — Search and performance advertising', 'Creative — Ad graphics, videos, copy and campaign concepts designed around performance'],
  },
  {
    slug: 'video-editing', title: 'Video Editing', tagline: 'Every frame has a job.', icon: 'move', color: 'var(--ink-orange)',
    items: ['Reels', 'Social Videos', 'YouTube Videos', 'Promotional Videos', 'Brand Films', 'Advertisements', 'Product Videos', 'Event Videos', 'Corporate Videos'],
  },
  {
    slug: 'motion', title: 'Motion Graphics', tagline: 'Make static move.', icon: 'move', color: 'var(--ink-orange)',
    items: ['Motion Graphics', 'Logo Animation', 'Typography Animation', 'Social Animations', 'Explainer Motion', 'Promotional Motion', 'Title Sequences', 'Visual Effects'],
  },
  {
    slug: 'photography', title: 'Photography', tagline: 'Freeze the moment.', icon: 'photo', color: 'var(--ink-blue)',
    items: ['Product Photography', 'Fashion Photography', 'Brand Photography', 'Event Photography', 'Social Media Photography', 'Creative Photography'],
  },
  {
    slug: 'cinematography', title: 'Cinematography & Ad Shoots', tagline: 'Your brand. On camera.', icon: 'photo', color: 'var(--ink-orange)',
    items: ['Ad Shoots', 'Product Shoots', 'Fashion Films', 'Promotional Films', 'Brand Films', 'Social Content', 'Campaign Shoots', 'Creative Direction', 'Post Production'],
  },
  {
    slug: '3d', title: '3D Design', tagline: 'Build worlds without limits.', icon: 'build', color: 'var(--ink-yellow)',
    items: ['3D Modelling', 'Product Visualisation', '3D Animation', '3D Rendering', 'Character Design', '3D Advertising', 'Experimental 3D', 'Digital Environments'],
  },
  {
    slug: 'architecture', title: 'Architectural Design', tagline: 'Designing spaces before they exist.', icon: 'arch', color: 'var(--ink-yellow)',
    items: ['Architectural Design', '3D Modelling', 'Architectural Visualisation', '3D Rendering', 'Walkthroughs', 'Presentation Visuals'],
  },
  {
    slug: 'content', title: 'Content Writing', tagline: 'Words that work.', icon: 'write', color: 'var(--ink-white)',
    items: ['Website Copy', 'Social Media Copy', 'Ad Copy', 'Campaign Concepts', 'Product Descriptions', 'Scripts', 'Captions', 'Brand Communication', 'Tamil-first regional content'],
  },
  {
    slug: 'tshirt', title: 'T-Shirt Design', tagline: 'Wear the idea.', icon: 'wear', color: 'var(--ink-red)',
    items: ['Custom T-Shirt Design', 'Streetwear Graphics', 'Typography Designs', 'Merchandise Design', 'Event T-Shirts', 'Brand Merchandise', 'Print-Ready Artwork'],
  },
  {
    slug: '3d-printing', title: '3D Printing', tagline: 'Digital idea. Physical object.', icon: 'print', color: 'var(--ink-yellow)',
    items: ['Prototypes', 'Products', 'Sculptures', 'Characters', 'Experimental Pieces', 'Design → Model → Print'],
  },
];
