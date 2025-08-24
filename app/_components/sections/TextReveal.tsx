'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  text: string;
  start?: string;
  end?: string;
  scrub?: number | boolean;
  markers?: boolean;
  className?: string;
};

export default function TextReveal({
  text,
  start = 'top 80%',
  end = 'bottom 20%',
  scrub = 1,
  markers = false,
  className = '',
}: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const words = root.querySelectorAll<HTMLSpanElement>('.word');
    const isDesktop = window.innerWidth >= 1024;

    gsap.set(words, { opacity: 0.2 });

    let tween;

    if (isDesktop) {
      // Original desktop animation with scrub
      tween = gsap.to(words, {
        opacity: 1,
        ease: 'none',
        stagger: 0.15,
        scrollTrigger: {
          trigger: root,
          start,
          end,
          scrub,
          markers,
        },
      });
    } else {
      // Mobile/tablet animation - simpler with faster reveal
      tween = gsap.to(words, {
        opacity: 1,
        ease: 'power2.out',
        stagger: 0.08, // Faster stagger for mobile
        scrollTrigger: {
          trigger: root,
          start: 'top 85%', // Slightly later start for mobile
          end: 'top 50%', // Shorter end point
          scrub: 0.5, // Less scrub for snappier feel
          markers,
        },
      });
    }

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === root) st.kill();
      });
    };
  }, [text, start, end, scrub, markers]);

  return (
    <section
      ref={sectionRef}
      className={`py-12 md:py-16 lg:py-24 max-w-[280px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] mx-auto text-center px-4 ${className}`}
    >
      <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal leading-tight tracking-tight text-gray-900">
        {text.split(' ').map((word, i) => (
          <span
            key={i}
            className="word inline-block mr-1 sm:mr-1.5 md:mr-2 transition-colors duration-300"
          >
            {word}
          </span>
        ))}
      </p>
    </section>
  );
}