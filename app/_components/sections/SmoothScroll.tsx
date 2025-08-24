// components/SmoothScroller.tsx
"use client"; // This is the crucial line that makes it a Client Component

import { useEffect, ReactNode } from 'react';
import Lenis from '@studio-freight/lenis';

const SmoothScroller = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    // Initialize Lenis for the smooth scrolling effect
    const lenis = new Lenis();

    // The animation loop that updates Lenis's scroll position
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    // Start the animation loop
    requestAnimationFrame(raf);

    // Cleanup function: This is important for Next.js page transitions
    return () => {
      lenis.destroy();
    };
  }, []); // The empty dependency array ensures this effect runs only once

  return <>{children}</>;
};

export default SmoothScroller;