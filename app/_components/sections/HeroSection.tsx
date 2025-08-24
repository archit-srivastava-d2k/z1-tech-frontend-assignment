"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

type Rect = { width: number; height: number };

function HeroCursor({
  active,
  rect,
}: {
  active: boolean;
  rect: Rect | null;
}) {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.set(cursorRef.current, {
      xPercent: -50,
      yPercent: -50,
      x: -9999,
      y: -9999,
      opacity: 0,
      willChange: "transform",
    });

    const onMove = (e: MouseEvent) => {
      if (!cursorRef.current) return;
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.18,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    if (!cursorRef.current) return;
    gsap.to(cursorRef.current, {
      opacity: active ? 1 : 0,
      duration: 0.15,
      ease: "power2.out",
      onComplete: () => {
        if (!active) gsap.set(cursorRef.current, { x: -9999, y: -9999 });
      },
    });
  }, [active]);

  // Apply hero-sized dimensions
  const styleSize: React.CSSProperties =
    rect
      ? {
          width: `${rect.width}px`,
          height: `${rect.height}px`,
        }
      : {};

  return (
    <div className="pointer-events-none fixed inset-0 z-[999]">
      <div ref={cursorRef} style={styleSize}>
      <div
  className="w-full h-full rounded-full overflow-hidden opacity-90 mix-blend-screen"
  style={{
    backgroundImage:
      'url("https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2/6824ade8d12d0b0ba2ecdae9_pl-gradient.svg")',
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "75%", // your requested scale
  }}
/>

      </div>
    </div>
  );
}

const HeroSection = () => {
  const headlineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const arrowRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  const [cursorActive, setCursorActive] = useState(false);
  const [heroRect, setHeroRect] = useState<Rect | null>(null);

  const addToRefs = (index: number) => (el: HTMLSpanElement | null) => {
    headlineRefs.current[index] = el;
  };

  useEffect(() => {
    // Headline animation
    gsap.from(headlineRefs.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.3,
      ease: "power2.out",
      delay: 0.3,
    });

    // Arrow animation
    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        y: -15,
        duration: 1.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }
  }, []);

  // Measure hero size and update on resize
  useEffect(() => {
    const measure = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setHeroRect({ width: rect.width, height: rect.height });
    };
    measure();

    const ro = new ResizeObserver(measure);
    if (heroRef.current) ro.observe(heroRef.current);

    window.addEventListener("resize", measure);
    window.addEventListener("orientationchange", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
    };
  }, []);

  // Activate only when hero is in view and pointer is over it
  useEffect(() => {
    if (!heroRef.current) return;
    const el = heroRef.current;

    let heroInView = false;

    const io = new IntersectionObserver(
      ([entry]) => {
        heroInView = entry.isIntersecting;
        if (!heroInView) setCursorActive(false);
      },
      { root: null, threshold: 0 }
    );
    io.observe(el);

    const onEnter = () => {
      if (heroInView) setCursorActive(true);
    };
    const onLeave = () => setCursorActive(false);

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      io.disconnect();
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-radial from-yellow-300/80 via-transparent to-transparent bg-[circle_at_top_center] cursor-none"
    >
      {/* Cursor spans the full hero height/width and follows pointer */}
      <HeroCursor active={cursorActive} rect={heroRect} />

      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 md:mb-24">
          <div className="text-2xl font-bold tracking-tight">
            <Image
              src="https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2/68227dfdc407523fbe5b56e7_post-labs-logo.svg"
              alt="Post Labs logo"
              width={150}
              height={50}
              className="w-auto h-auto"
            />
          </div>
          <p className="text-lg md:text-xl max-w-md text-right md:mt-0 text-black">
            We’re building the backbone of Canadian digital media — a next-gen
            platform that gives creators the tools to thrive.
          </p>
        </div>

        <div className="flex items-end justify-start">
          <h1
            className="text-[130px] font-normal leading-none text-black font-[InterTight]"
            style={{ fontFamily: '"Inter Tight", Verdana, sans-serif' }}
          >
            <span ref={addToRefs(0)}>The Future </span>
            <span ref={addToRefs(1)}>of News Starts Here</span>
          </h1>
          <div ref={arrowRef} className="text-6xl ml-8 mb-8">
            <Image
              src="https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2/68238111591ea94a69065212_Vector.svg"
              alt="Down arrow"
              width={50}
              height={50}
              className="w-auto h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
