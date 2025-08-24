"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent layout shift by setting initial position off-screen
    gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50, x: -9999, y: -9999 });

    const move = (e: MouseEvent) => {
      if (!cursorRef.current) return;
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.18,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <div
        ref={cursorRef}
        className="w-32 h-32 pointer-events-none"
        style={{ willChange: "transform" }}
      >
        <div
          className="w-full h-full rounded-full opacity-90 mix-blend-screen"
          style={{
            background:
              "radial-gradient(circle, rgba(255,223,0,0.9) 0%, rgba(255,200,0,0.5) 40%, transparent 70%)",
          }}
        />
      </div>
    </div>
  );
}
