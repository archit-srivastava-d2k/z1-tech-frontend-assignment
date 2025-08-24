"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function InvestorPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const builtForSectionRef = useRef<HTMLDivElement | null>(null);
  const investorsSectionRef = useRef<HTMLElement | null>(null);
  const buildersSectionRef = useRef<HTMLElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);
  const builtRowsRefs = useRef<HTMLDivElement[]>([]);

  const setBuiltRow = (i: number) => (el: HTMLDivElement | null) => {
    if (el) builtRowsRefs.current[i] = el;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = builtRowsRefs.current;
      if (builtForSectionRef.current && rows.length === 3) {
        gsap.set(rows[0], { opacity: 1, filter: "blur(0px)", y: 0 });
        gsap.set(rows[1], { opacity: 0.3, filter: "blur(1px)", y: 0 });
        gsap.set(rows[2], { opacity: 0.3, filter: "blur(1px)", y: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: builtForSectionRef.current,
            start: "top top",
            end: "+=100%",
            scrub: 0.5,
            pin: true,
          },
        });

        tl.to([rows[0], rows[1], rows[2]], { y: "-1.15em", duration: 1.5 })
          .to(
            rows[0],
            { opacity: 0.3, filter: "blur(1px)", duration: 1.5 },
            "<"
          )
          .to(rows[1], { opacity: 1, filter: "blur(0px)", duration: 1.5 }, "<")
          .to([rows[0], rows[1], rows[2]], { y: "-2.3em", duration: 1.5 })
          .to(
            rows[1],
            { opacity: 0.3, filter: "blur(1px)", duration: 1.5 },
            "<"
          )
          .to(rows[2], { opacity: 1, filter: "blur(0px)", duration: 1.5 }, "<");
      }

      const investorsEls = gsap.utils.toArray<HTMLElement>(".investors-text");
      gsap.set(investorsEls, { opacity: 0, y: 50 });
      gsap.to(investorsEls, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: investorsSectionRef.current,
          start: "top 60%",
        },
      });

      const buildersEls = gsap.utils.toArray<HTMLElement>(".builders-text");
      gsap.set(buildersEls, { opacity: 0, y: 50 });
      gsap.to(buildersEls, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: buildersSectionRef.current,
          start: "top 60%",
        },
      });

      if (footerRef.current && buildersSectionRef.current) {
        const footerHeight = footerRef.current.offsetHeight;

        let spacer = document.querySelector(".footer-spacer") as HTMLDivElement;
        if (!spacer) {
          spacer = document.createElement("div");
          spacer.classList.add("footer-spacer");
          spacer.style.height = `${footerHeight}px`;
          spacer.style.pointerEvents = "none";
          buildersSectionRef.current.insertAdjacentElement("afterend", spacer);
        }

        ScrollTrigger.create({
          trigger: buildersSectionRef.current,
          start: "top top",
          end: `+=${footerHeight}`,
          pin: true,
          scrub: 1,
        });

        gsap.set(footerRef.current, { yPercent: 100 });
        gsap.to(footerRef.current, {
          yPercent: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: buildersSectionRef.current,
            start: "bottom bottom",
            end: `+=${footerHeight}`,
            scrub: 1,
          },
        });

        const footerElements = gsap.utils.toArray(".footer-content > *");
        gsap.set(footerElements, { opacity: 0, y: 50 });
        gsap.to(footerElements, {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: buildersSectionRef.current,
            start: "bottom bottom",
            end: `+=${footerHeight * 0.5}`,
            scrub: 0.5,
          },
        });

        const marquee = document.querySelector(
          ".footer-marquee"
        ) as HTMLDivElement;
        if (marquee) {
          const width = marquee.scrollWidth;
          gsap.fromTo(
            marquee,
            { x: "100%" },
            { x: `-${width}px`, duration: 20, ease: "linear", repeat: -1 }
          );
        }
      }
    }, containerRef);

    return () => {
      ctx.revert();
      const spacer = document.querySelector(
        ".footer-spacer"
      ) as HTMLDivElement | null;
      if (spacer) spacer.remove();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500&display=swap");
        .footer-spacer {
          pointer-events: none;
        }
      `}</style>

      <section
        ref={builtForSectionRef}
        className="relative w-full"
        style={{ height: "100vh" }}
      >
        <div className="sticky top-0 h-screen w-full">
          <div className="absolute inset-0">
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              poster="https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2%2F683a0051a4448581c2d2e587_post-labs-video-mobile-4-poster-00001.jpg"
            >
              <source
                src="https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2%2F683a0051a4448581c2d2e587_post-labs-video-mobile-4-transcode.mp4"
                type="video/mp4"
              />
              <source
                src="https://cdn.prod.website-files.com/681dfdff4444ca819f7050a2%2F683a0051a4448581c2d2e587_post-labs-video-mobile-4-transcode.webm"
                type="video/webm"
              />
            </video>
            <div className="absolute inset-0 bg-black/18" />
          </div>

          <div className="relative z-10 h-screen w-full flex items-center justify-center">
            <div className="flex items-center w-full">
              <div className="px-6 md:px-12">
                <div
                  style={{
                    fontFamily: '"Inter Tight", sans-serif',
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
              <div className="flex-1 pr-6 md:pr-12">
                <div
                  className="relative overflow-hidden"
                  style={{
                    height: "4.6em",
                    fontSize: "clamp(2.5rem, 8vw, 5rem)",
                  }}
                >
                  <div
                    className="flex flex-col absolute top-0 left-0 w-full"
                    style={{
                      fontFamily: '"Inter Tight", sans-serif',
                      fontWeight: 500,
                      color: "#FFFFFF",
                      lineHeight: 1.15,
                      textShadow: "0 2px 20px rgba(0,0,0,0.4)",
                    }}
                  >
                    <div ref={setBuiltRow(0)} className="word-row">
                      Scale
                    </div>
                    <div ref={setBuiltRow(1)} className="word-row">
                      Creators
                    </div>
                    <div ref={setBuiltRow(2)} className="word-row">
                      Canada
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={investorsSectionRef}
        className="min-h-screen w-full p-12 flex items-center relative z-10"
        style={{ background: "linear-gradient(to right, #FFFFFF, #FFF5CC)" }}
      >
        <div>
          <h1
            className="investors-text"
            style={{
              fontSize: "clamp(60px, 10vw, 116px)",
              fontFamily: '"Inter Tight", Verdana, sans-serif',
              fontWeight: 400,
              lineHeight: "1",
              letterSpacing: "-0.02em",
            }}
          >
            For Investors
          </h1>
          <p
            className="investors-text"
            style={{
              fontSize: "16px",
              fontFamily: '"Inter Tight", Verdana, sans-serif',
              fontWeight: 400,
              marginTop: "24px",
              maxWidth: "450px",
              lineHeight: "1.5",
            }}
          >
            We&apos;re raising capital to scale fast. If you&apos;re an investor who
            believes in the future of independent Canadian media, we&apos;d love to
            speak with you.
          </p>
          <a
            href="mailto:invest@postlabs.com"
            className="investors-text"
            style={{
              display: "inline-block",
              fontSize: "16px",
              fontFamily: '"Inter Tight", Verdana, sans-serif',
              fontWeight: 400,
              marginTop: "16px",
              textDecoration: "underline",
            }}
          >
            invest@postlabs.com
          </a>
        </div>
      </section>

      <section
        ref={buildersSectionRef}
        className="min-h-screen w-full p-12 flex items-center justify-end text-right relative z-10"
        style={{ background: "linear-gradient(to right, #FFFFFF, #FFF5CC)" }}
      >
        <div>
          <h1
            className="builders-text"
            style={{
              fontSize: "clamp(60px, 10vw, 116px)",
              fontFamily: '"Inter Tight", Verdana, sans-serif',
              fontWeight: 400,
              lineHeight: "1",
              letterSpacing: "-0.02em",
            }}
          >
            For Builders
          </h1>
          <p
            className="builders-text"
            style={{
              fontSize: "16px",
              fontFamily: '"Inter Tight", Verdana, sans-serif',
              fontWeight: 400,
              marginTop: "24px",
              maxWidth: "450px",
              lineHeight: "1.5",
              marginLeft: "auto",
            }}
          >
            We&apos;re hiring. If you&apos;re passionate about media, technology, and the
            future of Canada&apos;s digital ecosystem, come build with us. We&apos;re
            always looking for great people. Check out our{" "}
            <a href="#" style={{ textDecoration: "underline" }}>
              jobs page
            </a>{" "}
            for current opportunities.
          </p>
          <a
            href="mailto:careers@postlabs.com"
            className="builders-text"
            style={{
              display: "inline-block",
              fontSize: "16px",
              fontFamily: '"Inter Tight", Verdana, sans-serif',
              fontWeight: 400,
              marginTop: "16px",
              textDecoration: "underline",
            }}
          >
            careers@postlabs.com
          </a>
        </div>
      </section>

      <footer
        ref={footerRef}
        className="fixed bottom-0 left-0 w-full h-screen text-white z-0"
        style={{ backgroundColor: "#000000" }}
      >
        <div className="footer-content h-full flex flex-col justify-between p-12">
          <div className="flex-1 flex items-center justify-center">
            <div className="max-w-6xl mx-auto text-center overflow-hidden">
              <h2
                className="footer-marquee whitespace-nowrap"
                style={{
                  fontSize: "70px",
                  fontFamily: '"Inter Tight", Verdana, sans-serif',
                  fontWeight: 400,
                  lineHeight: "1",
                  letterSpacing: "-0.02em",
                  color: "#FFFFFF",
                  marginBottom: "4rem",
                }}
              >
                Contact Us — Ready to Build the Future of Canadian Media
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-[35%]">
            <div
              style={{
                fontFamily: '"Inter Tight", Verdana, sans-serif',
                fontSize: "24px",
                fontWeight: 400,
                color: "#FFFFFF",
              }}
            >
              &lt;/&gt;Post Labs
            </div>
            <div className="flex flex-col items-center space-y-2">
              <a
                href="https://www.postlabs.com/"
                className="text-white hover:underline text-lg"
              >
                About
              </a>
              <a
                href="https://www.postlabs.com/"
                className="text-white hover:underline text-lg"
              >
                Contact
              </a>
              <a
                href="https://www.postlabs.com/"
                className="text-white hover:underline text-lg"
              >
                Privacy Policy
              </a>
              <a
                href="https://www.postlabs.com/"
                className="text-white hover:underline text-lg"
              >
                Cookie Policy
              </a>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-2xl mb-4 font-light">
              Sign Up for Our Newsletter
            </h3>
            <div className="flex items-center justify-center">
              <input
                type="email"
                placeholder="Email Address"
                className="p-3 border-b border-white bg-transparent text-white placeholder-gray-300 text-center w-80"
                style={{ outline: "none" }}
              />
              <button className="ml-4 text-white text-2xl hover:opacity-70">
                →
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-400 mt-8">
            <p>© 2025 Post Labs, Inc. All rights reserved.</p>
            <p>Designed by HRVST.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .word-row {
          height: 1.15em;
          position: absolute;
          width: 100%;
          left: 0;
        }
        .word-row:nth-child(1) {
          top: 0em;
        }
        .word-row:nth-child(2) {
          top: 1.15em;
        }
        .word-row:nth-child(3) {
          top: 2.3em;
        }
      `}</style>
    </div>
  );
}
