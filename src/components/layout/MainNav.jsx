'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import BubbleMenu from '@/components/reactbits/BubbleMenu';
import { NAV_LINKS } from '@/data/nav';

/**
 * MainNav — primary navigation built on the real React Bits Bubble Menu.
 * Navigation is handled through the component's own onItemClick/onLogoClick
 * callbacks (no document-level click interception), so a single click
 * navigates AND closes the menu atomically — the overlay never lingers
 * over the destination page.
 */

const HOVER = [
  { bgColor: '#2b4cff', textColor: '#ffffff' },
  { bgColor: '#16b357', textColor: '#ffffff' },
  { bgColor: '#ff7a1a', textColor: '#0a0a0b' },
  { bgColor: '#e5262b', textColor: '#ffffff' },
  { bgColor: '#ffd400', textColor: '#0a0a0b' },
];

export default function MainNav() {
  const router = useRouter();
  const pathname = usePathname();
  const closeRef = useRef(null);

  const items = NAV_LINKS.map((link, i) => ({
    label: link.label,
    href: link.href,
    ariaLabel: link.label,
    rotation: i % 2 === 0 ? -8 : 8,
    hoverStyles: HOVER[i % HOVER.length],
  }));

  // Ensure the menu is closed whenever the route actually changes.
  useEffect(() => {
    if (closeRef.current) closeRef.current();
  }, [pathname]);

  return (
    <BubbleMenu
      logo={<span style={{ fontFamily: 'var(--font-tungsten)', fontWeight: 700, fontSize: '1.2rem', letterSpacing: '-0.01em' }}>INKRIOT®</span>}
      logoHref="/"
      onLogoClick={() => router.push('/')}
      items={items}
      onItemClick={(item) => router.push(item.href)}
      registerClose={(fn) => { closeRef.current = fn; }}
      useFixedPosition
      menuBg="#ffffff"
      menuContentColor="#0a0a0b"
      animationEase="back.out(1.5)"
      animationDuration={0.5}
      staggerDelay={0.08}
    />
  );
}
