'use client';

import InteractiveGallery from '@/components/gallery/InteractiveGallery';
import DissolveImage from '@/components/portfolio/DissolveImage';
import { Reveal, SectionHeader } from '@/components/ui/primitives';
import { GradientText } from '@/components/reactbits/TextEffects';
import { GALLERY_IMAGES } from '@/data/gallery';
import styles from './gallery.module.css';

export default function GalleryPage() {
  return (
    <>
      <header className={styles.hero}>
        <div className="container">
          <p className="eyebrow">Gallery</p>
          <h1 className={styles.heroTitle}>A wall of <GradientText>work.</GradientText></h1>
          <p className="lead" style={{ marginTop: '1.5rem' }}>
            Drag, scroll and explore. A living collection of visuals, frames and fragments from across
            the studio.
          </p>
        </div>
      </header>

      <section className={styles.gallerySection}>
        <InteractiveGallery images={GALLERY_IMAGES} height="66vh" />
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Selected frames" title="Look closer." />
          <div className={styles.mosaic}>
            {GALLERY_IMAGES.slice(0, 9).map((img, i) => (
              <Reveal key={i} delay={(i % 3) * 40} className={styles.tile}>
                <DissolveImage src={img.src} alt={img.alt} className={styles.tileImg} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
