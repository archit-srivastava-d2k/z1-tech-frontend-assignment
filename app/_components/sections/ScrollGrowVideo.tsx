"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type Props = {
  src: string;
  startWidthVw?: number; 
  startHeightVh?: number;
};

export default function ScrollGrowVideo({
  src,
  startWidthVw = 10,
  startHeightVh = 30,
}: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  // Helper: clamp a value
  const clamp = (v: number, min: number, max: number) =>
    Math.min(max, Math.max(min, v));

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const frame = frameRef.current;
    if (!section || !sticky || !frame) return;

    section.style.height = "200vh";

    gsap.set(frame, {
      width: `${startWidthVw}vw`,
      height: `${startHeightVh}vh`,
      xPercent: -50,
      yPercent: -50,
      left: "50%",
      top: "50%",
      position: "absolute",
    });

    let rafId = 0;

    const onScroll = () => {
      if (!section || !sticky || !frame) return;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;

      const total = vh;
      const current = clamp(vh - Math.max(0, rect.top), 0, total);
      const t = clamp(current / total, 0, 1);

      const heightVh = startHeightVh + t * (100 - startHeightVh);

      const midPoint = 0.5; 
      let widthVw: number;
      if (t < midPoint) {
        const progress = t / midPoint;
        widthVw = startWidthVw + progress * (90 - startWidthVw);
      } else {
        const progress = (t - midPoint) / (1 - midPoint); 
        widthVw = 90 + progress * 10;
      }

      gsap.to(frame, {
        width: `${widthVw}vw`,
        height: `${heightVh}vh`,
        duration: 0.15,
        ease: "power2.out",
      });
    };

    const onResize = () => onScroll();

    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        onScroll();
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    // Initial run
    onScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [startWidthVw, startHeightVh]);

  return (
    <section ref={sectionRef} className="relative w-[98%] flex mx-auto">
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-[99%] overflow-visible"
      >
        <div ref={frameRef} className="relative">
          <video
            src={src}
            className="w-[96%] h-full object-cover rounded-xl ml-auto mr-auto"
            playsInline
            muted
            autoPlay
            loop
          />
        </div>
      </div>
    </section>
  );
}
