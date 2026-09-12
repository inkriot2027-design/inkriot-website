'use client';

import { useRouter } from 'next/navigation';
import Dock from '@/components/reactbits/Dock';
import { ICONS } from '@/components/ui/icons';

/**
 * HomeDock — the real React Bits Dock, placed on the Home page as a
 * floating quick-navigation. Magnifies on hover; routes on click.
 * Fixed to the bottom center, above content, responsive.
 */
export default function HomeDock() {
  const router = useRouter();
  const go = (href) => () => router.push(href);

  const I = (Comp) => <Comp />;

  const items = [
    { icon: I(ICONS.design), label: 'Work', onClick: go('/portfolio') },
    { icon: I(ICONS.digital), label: 'Digital', onClick: go('/digital') },
    { icon: I(ICONS.move), label: 'Media', onClick: go('/services') },
    { icon: I(ICONS.build), label: 'Lab', onClick: go('/lab') },
    { icon: I(ICONS.wear), label: 'Store', onClick: go('/store') },
    { icon: I(ICONS.write), label: 'Journal', onClick: go('/journal') },
    { icon: I(ICONS.arrow), label: 'Contact', onClick: go('/contact') },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        left: 0, right: 0, bottom: '1.2rem',
        zIndex: 70,
        display: 'flex', justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <div style={{ pointerEvents: 'auto' }}>
        <Dock
          items={items}
          panelHeight={64}
          baseItemSize={46}
          magnification={64}
          distance={160}
        />
      </div>
    </div>
  );
}
