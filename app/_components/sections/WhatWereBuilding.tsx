"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";

export default function WhatWereBuilding() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Paragraph blocks and their icon wrappers
  const rowRefs = useRef<HTMLDivElement[]>([]);
  const setRow = (i: number) => (el: HTMLDivElement | null) => {
    if (el) rowRefs.current[i] = el;
  };

  const iconRefs = useRef<HTMLDivElement[]>([]);
  const setIconWrap = (i: number) => (el: HTMLDivElement | null) => {
    if (el) iconRefs.current[i] = el;
  };

  const paragraphs = useMemo(
    () => [
      "Post Labs is building a homegrown platform designed for Canadians and the future of Canadian media.",
      "At its core is PostOS, our made‑in‑Canada publishing engine that connects local voices, communities, and trusted journalism in one seamless digital experience.",
      "Built by Canadians, for Canadians, PostOS is more than just technology — it’s a way to bring our stories home.",
    ],
    []
  );

  useEffect(() => {
    // 1) Headline: reveal word-by-word when it scrolls into view
    if (headingRef.current) {
      const hIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const words = headingRef.current!.querySelectorAll("[data-word]");
            gsap.set(words, { opacity: 0, y: 18 });
            gsap.to(words, {
              opacity: 1,
              y: 0,
              duration: 0.55,
              ease: "power2.out",
              stagger: 0.075,
            });
            hIO.disconnect();
          });
        },
        { threshold: 0.2 }
      );
      hIO.observe(headingRef.current);
    }

    // 2) Prepare paragraph rows and icons
    rowRefs.current.forEach((row) => {
      const words = row.querySelectorAll("[data-word]");
      gsap.set(words, { opacity: 0, y: 14 });
    });
    iconRefs.current.forEach((wrap) => {
      gsap.set(wrap, { opacity: 0, y: 6, rotate: -2, scale: 0.98 });
    });

    // 3) Reveal rows on scroll, word-by-word
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLDivElement;
          const idx = rowRefs.current.indexOf(el);

          const words = el.querySelectorAll("[data-word]");
          gsap.to(words, {
            opacity: 1,
            y: 0,
            stagger: 0.035,
            duration: 0.5,
            ease: "power2.out",
          });

          // Icon cluster reveal + idle bob
          const iconWrap = iconRefs.current[idx];
          if (iconWrap) {
            gsap.to(iconWrap, {
              opacity: 1,
              y: 0,
              rotate: 0,
              scale: 1,
              duration: 0.6,
              ease: "power2.out",
              delay: 0.08,
            });
            gsap.to(iconWrap, {
              y: -6,
              duration: 2.2,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              delay: 0.9,
            });
          }

          io.unobserve(el);
        });
      },
      { threshold: 0.15 }
    );

    rowRefs.current.forEach((row) => io.observe(row));
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative w-full bg-transparent text-black">
      {/* Subtle vertical guides */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.045) 1px, transparent 1px)",
          backgroundSize: "25% 100%",
        }}
      />

      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 md:px-10 lg:px-12">
        {/* Headline: more to the left and split into words */}
        <div className="pt-[12vh] pb-[12vh] md:pt-[15vh] md:pb-[14vh]">
          <h2
            ref={headingRef}
            className="leading-[0.95]"
            style={{
              fontFamily: '"Inter Tight", Verdana, sans-serif',
              fontSize: "144px",
              fontWeight: 400,
              color: "#000000",
              marginLeft: "-11rem", // adjust if needed
              letterSpacing: "-0.06em",
            }}
          >
            <Word>What</Word> <Word>We’re</Word>
            <br />
            <Word>Building</Word>
          </h2>
        </div>

        {/* Content stack with 60vh gaps between sentences */}
       {/* Content stack with 60vh gaps between sentences */}
<div className="relative flex flex-col gap-[60vh] pb-[28vh]">
  {/* Row 1: left */}
  <RowBlock
    index={0}
    align="left"
    text="Post Labs is building a homegrown platform designed for Canadians and the future of Canadian media."
    setRow={setRow}
    setIconWrap={setIconWrap}
    paragraphOffsetClass="ml-[4%]"
    iconPositionClass="-left-[68px] top-[4px]"
  />

  {/* Row 2: push further right */}
  <RowBlock
    index={1}
    align="right"
    text="At its core is PostOS, our made‑in‑Canada publishing engine that connects local voices, communities, and trusted journalism in one seamless digital experience."
    setRow={setRow}
    setIconWrap={setIconWrap}
    paragraphOffsetClass="mr-[-10%]"  // increased from 5% to 10%
    iconPositionClass="-right-[68px] top-[4px]"
  />

  {/* Row 3: left */}
  <RowBlock
    index={2}
    align="left"
    text="Built by Canadians, for Canadians, PostOS is more than just technology — it’s a way to bring our stories home."
    setRow={setRow}
    setIconWrap={setIconWrap}
    paragraphOffsetClass="ml-[4%]"
    iconPositionClass="-left-[68px] top-[4px]"
  />
</div>

      </div>
    </section>
  );
}

/* ---------- helpers ---------- */

function Word({ children }: { children: React.ReactNode }) {
  return (
    <span data-word style={{ display: "inline-block", willChange: "transform, opacity" }}>
      {children}
    </span>
  );
}

function splitIntoWords(text: string) {
  const parts = text.split(" ");
  return parts.map((w, i) => (
    <span key={`${w}-${i}`} style={{ display: "inline" }}>
      <span
        data-word
        style={{ display: "inline-block", willChange: "transform, opacity" }}
      >
        {w}
      </span>
      {i < parts.length - 1 ? <span>{"\u00A0"}</span> : null}
    </span>
  ));
}

function RowBlock({
  index,
  align,
  text,
  setRow,
  setIconWrap,
  paragraphOffsetClass,
  iconPositionClass,
}: {
  index: number;
  align: "left" | "right";
  text: string;
  setRow: (i: number) => (el: HTMLDivElement | null) => void;
  setIconWrap: (i: number) => (el: HTMLDivElement | null) => void;
  paragraphOffsetClass: string;
  iconPositionClass: string;
}) {
  const left = align === "left";

  return (
    <div
      ref={setRow(index)}
      className={[
        "relative flex items-start",
        left ? "justify-start" : "justify-end",
      ].join(" ")}
    >
      {/* Icon cluster beside paragraph */}
      <div
        ref={setIconWrap(index)}
        className={`absolute ${iconPositionClass}`}
        style={{ pointerEvents: "none" }}
        aria-hidden
      >
        <IconCircle size={56} className="opacity-[0.16]" />
        <div className="absolute left-0 -top-[48px]">
          <IconCircle size={56} className="opacity-[0.12]" />
        </div>
        <div className="absolute left-0 -top-[96px]">
          <IconCircle size={56} className="opacity-[0.08]" />
        </div>
        <div className={`absolute ${left ? "left-[48px]" : "right-[48px]"} top-[40px]`}>
          <IconCircle size={56} className="opacity-[0.12]" />
        </div>
      </div>

      {/* Paragraph split into words for on-scroll reveal */}
      <div className={paragraphOffsetClass}>
        <p
          className="max-w-[820px] leading-[1.35]"
          style={{
            fontFamily: '"Inter Tight", Verdana, sans-serif',
            fontSize: "36px",
            fontWeight: 400,
            color: "#000000",
            letterSpacing: "-0.02em",
            
          }}
        >
          {splitIntoWords(text)}
        </p>
      </div>
    </div>
  );
}

function IconCircle({
  size,
  className = "",
}: {
  size: number;
  className?: string;
}) {
  return (
    <img
      src="https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2/68267094af8c90b6a17e323a_icon-2-transparent.svg"
      alt=""
      width={size}
      height={size}
      className={className}
      style={{ display: "block" }}
    />
  );
}
