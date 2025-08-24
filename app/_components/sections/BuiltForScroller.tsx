"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  mp4?: string;
  webm?: string;
  poster?: string;
};

export default function BuiltForWords({
  mp4 = "https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2%2F683a0051a4448581c2d2e587_post-labs-video-mobile-4-transcode.mp4",
  webm = "https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2%2F683a0051a4448581c2d2e587_post-labs-video-mobile-4-transcode.webm",
  poster = "https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2%2F683a0051a4448581c2d2e587_post-labs-video-mobile-4-poster-00001.jpg",
}: Props = {}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<HTMLDivElement[]>([]);
  const builtForRef = useRef<HTMLDivElement>(null);

  const setRow = (i: number) => (el: HTMLDivElement | null) => {
    if (el) rowRefs.current[i] = el;
  };

  useEffect(() => {
    const section = sectionRef.current;
    const rows = rowRefs.current;
    if (!section || rows.length !== 3) return;

    // Section height for scrolling
    section.style.height = "150vh";

    // Initial states
    gsap.set(rows[0], { opacity: 1, filter: "blur(0px)", y: 0 });
    gsap.set(rows[1], { opacity: 0.3, filter: "blur(1px)", y: 0 });
    gsap.set(rows[2], { opacity: 0.3, filter: "blur(1px)", y: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top center",
        end: "bottom center",
        scrub: 0.5, // smooth scroll-based animation
      },
    });

    // Animate Scale → Creators → Canada progressively
    tl.to([rows[0], rows[1], rows[2]], { y: "-1.15em", duration: 1 })
      .to(rows[0], { opacity: 0.3, filter: "blur(1px)", duration: 1 }, "<")
      .to(rows[1], { opacity: 1, filter: "blur(0px)", duration: 1 }, "<")
      .to([rows[0], rows[1], rows[2]], { y: "-2.3em", duration: 1 })
      .to(rows[1], { opacity: 0.3, filter: "blur(1px)", duration: 1 }, "<")
      .to(rows[2], { opacity: 1, filter: "blur(0px)", duration: 1 }, "<");

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full">
      <div className="sticky top-0 h-screen w-full">
        {/* Background video */}
        <div className="absolute inset-0">
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            poster={poster}
          >
            <source src={mp4} type="video/mp4" />
            <source src={webm} type="video/webm" />
          </video>
          <div className="absolute inset-0 bg-black/18" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-screen w-full flex items-center justify-center">
          <div className="flex items-center w-full">
            {/* Left label */}
            <div className="px-6 md:px-12">
              <div
                ref={builtForRef}
                style={{
                  fontFamily:
                    '"Inter Tight", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  fontSize: "clamp(2.5rem, 8vw, 5rem)",
                  fontWeight: 400,
                  color: "#FFFFFF",
                  lineHeight: 1.15,
                  textShadow: "0 2px 20px rgba(0,0,0,0.4)",
                }}
              >
                Built for
              </div>
            </div>

            {/* Right words */}
            <div className="flex-1 pr-6 md:pr-12">
              <div
                className="relative overflow-hidden"
                style={{ height: "3.45em", fontSize: "clamp(2.5rem, 8vw, 5rem)" }}
              >
                <div
                  className="flex flex-col absolute top-0 left-0 w-full"
                  style={{
                    fontFamily:
                      '"Inter Tight", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    fontWeight: 500,
                    color: "#FFFFFF",
                    lineHeight: 1.15,
                    textShadow: "0 2px 20px rgba(0,0,0,0.4)",
                  }}
                >
                  <div ref={setRow(0)} className="word-row">
                    Scale
                  </div>
                  <div ref={setRow(1)} className="word-row">
                    Creators
                  </div>
                  <div ref={setRow(2)} className="word-row">
                    Canada
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .word-row {
          height: 1.15em;
          position: absolute;
          width: 100%;
          left: 0;
        }
        .word-row:nth-child(1) {
          top: 1.15em;
        }
        .word-row:nth-child(2) {
          top: 2.3em;
        }
        .word-row:nth-child(3) {
          top: 3.45em;
        }
      `}</style>
    </section>
  );
}
