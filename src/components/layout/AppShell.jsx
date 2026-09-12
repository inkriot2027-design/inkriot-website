'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import SmoothScroll from './SmoothScroll';
import LoadingExperience from './LoadingExperience';
import MainNav from './MainNav';
import Footer from './Footer';
import { AuthProvider } from '@/lib/auth';

// The cursor overlay is client-only (uses GSAP + pointer events).
const ImageTrailCursor = dynamic(() => import('@/components/cursor/ImageTrailCursor'), { ssr: false });

export default function AppShell({ children }) {
  const [loaded, setLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  const handleDone = () => {
  setLoaded(true);
  setShowLoader(false);
};
  return (
    <AuthProvider>
      {showLoader && <LoadingExperience onDone={handleDone} />}
      <ImageTrailCursor />
      <MainNav />
      <SmoothScroll>
        <main style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.6s ease' }}>
          {children}
        </main>
        <Footer />
      </SmoothScroll>
    </AuthProvider>
  );
}
