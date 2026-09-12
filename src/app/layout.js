import '@/styles/globals.css';
import '@/styles/fonts.css';
import AppShell from '@/components/layout/AppShell';

export const metadata = {
  metadataBase: new URL('https://inkriot.com'),
  title: {
    default: 'INKRIOT® — Creative & Digital Studio',
    template: '%s — INKRIOT®',
  },
  description:
    'INKRIOT is a multidisciplinary creative studio working across design, digital, advertising, media, technology, architecture and production. We create. You get noticed.',
  keywords: [
    'creative studio', 'design', 'digital', 'advertising', 'media',
    '3D', 'architecture', 'streetwear', 'branding', 'web development', 'INKRIOT',
  ],
  authors: [{ name: 'INKRIOT' }],
  openGraph: {
    title: 'INKRIOT® — Creative & Digital Studio',
    description: 'Different mediums. One creative mindset. We create. You get noticed.',
    type: 'website',
    siteName: 'INKRIOT',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'INKRIOT® — Creative & Digital Studio',
    description: 'Different mediums. One creative mindset.',
  },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.svg' },
};

export const viewport = {
  themeColor: '#0a0a0b',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Oswald:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
