'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';

interface AnnouncementBarProps {
  text?: string;
  href?: string;
  className?: string;
  delay?: number;
}

const AnnouncementBar = ({ 
  text = "Help shape the future of digital journalism — we're hiring!",
  href = "/careers",
  className = "",
  delay = 0.2
}: AnnouncementBarProps) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      // Set initial state - simple fade up animation matching the original
      gsap.set(textRef.current, {
        opacity: 0,
        y: 20
      });

      // Simple fade up animation like the original
      gsap.to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        delay
      });
    }
  }, [delay]);

  const content = (
    <div 
      ref={textRef}
      className="text-center text-sm md:text-base font-medium text-white cursor-pointer 
                 hover:text-gray-200 transition-colors duration-200"
      data-animation="fadeup"
    >
      {text}
    </div>
  );

  return (
    <section 
      id="top" 
      className={`announcement-bar bg-black text-white py-3 z-50 ${className}`}
    >
      <div className="container mx-auto px-4">
        {href ? (
          <Link href={href} className="block">
            {content}
          </Link>
        ) : (
          content
        )}
      </div>
    </section>
  );
};

export default AnnouncementBar;

// CSS for shimmer animation (add to your global CSS or Tailwind config)
/*
@keyframes shimmer {
  0% {
    background-position: -200% 50%;
  }
  100% {
    background-position: 200% 50%;
  }
}
*/