"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const CardSection = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const setCardRef = useCallback((el: HTMLDivElement | null, index: number) => {
    cardsRef.current[index] = el;
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.getAll().forEach((t) => t.kill());

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "+=150%", // smoother, longer animation
        scrub: 1.5,
      },
    });

    const cardShift = window.innerWidth / 3;

    // Animate left & right cards back to normal (remove tilt + slide)
    tl.to(cardsRef.current[0], {
      x: -cardShift,
      rotate: 0,
      ease: "power3.out",
    })
      .to(
        cardsRef.current[2],
        {
          x: cardShift,
          rotate: 0,
          ease: "power3.out",
        },
        "<"
      )
      .to(
        cardsRef.current[1],
        {
          scale: 1.08,
          ease: "power2.out",
        },
        "<"
      )
      .to(cardsRef.current[1], {
        scale: 1,
        ease: "power2.inOut",
      });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen py-20 bg-[#f9f8f3] flex items-center justify-center"
    >
      {/* Added horizontal padding for equal margins */}
      <div className="flex justify-center items-center relative w-full gap-10 px-10 md:px-20">
        {/* Left card */}
        <div
          ref={(el) => setCardRef(el, 0)}
          className="w-[32%] h-[60vh] bg-black rounded-3xl flex items-center justify-center flex-col text-white text-center p-6 absolute z-10"
          style={{ transform: "rotate(-8deg)" }} // initial tilt
        >
          <Image
            src="https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2/68239a34145625a862ba3d54_icon-1.svg"
            alt="Empowering Creators icon"
            width={60}
            height={60}
            className="mb-6"
          />
          <p className="text-xl">Empowering Creators.</p>
        </div>

        {/* Center card */}
        <div
          ref={(el) => setCardRef(el, 1)}
          className="w-[32%] h-[60vh] bg-black rounded-3xl flex items-center justify-center flex-col text-white text-center p-6 relative z-20"
        >
          <Image
            src="https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2/68239b7ac5ddc2008b2da9b7_icon-2.svg"
            alt="Transforming Publishing icon"
            width={60}
            height={60}
            className="mb-6"
          />
          <p className="text-xl">Transforming Publishing.</p>
        </div>

        {/* Right card */}
        <div
          ref={(el) => setCardRef(el, 2)}
          className="w-[32%] h-[60vh] bg-black rounded-3xl flex items-center justify-center flex-col text-white text-center p-6 absolute z-10"
          style={{ transform: "rotate(8deg)" }} // initial tilt
        >
          <Image
            src="https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2/68239b7ab5708009ef8f649e_icon-3.svg"
            alt="Reclaiming Canadian Media icon"
            width={60}
            height={60}
            className="mb-6"
          />
          <p className="text-xl">Reclaiming Canadian Media.</p>
        </div>
      </div>
    </section>
  );
};

export default CardSection;
