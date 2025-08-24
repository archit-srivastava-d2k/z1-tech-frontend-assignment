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

    gsap.set(words, { opacity: 0.2 });

    const tween = gsap.to(words, {
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
      className={`py-24 max-w-[600px] mx-auto text-center ${className}`}
    >
      <p className="text-2xl md:text-4xl lg:text-5xl font-normal leading-tight tracking-tight text-gray-900">
        {text.split(' ').map((word, i) => (
          <span
            key={i}
            className="word inline-block mr-2 transition-colors duration-300"
          >
            {word}
          </span>
        ))}
      </p>
    </section>
  );
}
