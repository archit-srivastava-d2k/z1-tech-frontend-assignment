'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import Image from 'next/image';

interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}

interface HeaderProps {
  navItems?: NavItem[];
  className?: string;
}

const Header = ({ 
  navItems = [
    { label: 'About', href: '/', isActive: true },
    { label: 'Contact', href: '/contact-us' }
  ],
  className = ""
}: HeaderProps) => {
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const headerTextRef = useRef<HTMLParagraphElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const elements = [logoRef.current, headerTextRef.current, navRef.current].filter(Boolean);
    
    if (elements.length > 0) {
      // Set initial states
      gsap.set(elements, {
        opacity: 0,
        y: 20
      });

      // Create staggered animation
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.1,
        delay: 0.3,
        onComplete: () => setIsVisible(true)
      });
    }
  }, []);

  return (
    <>
      <div className="gradient-wrapper relative overflow-hidden bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200">
        <div className="floating-grid absolute inset-0 pointer-events-none">
          <div className="floating-grid-col first absolute top-0 left-0 w-1/4 h-full opacity-5">
            <div className="w-full h-full bg-gradient-to-b from-black/10 to-transparent" />
          </div>
          <div className="floating-grid-col absolute top-0 left-1/4 w-1/4 h-full opacity-5">
            <div className="w-full h-full bg-gradient-to-b from-black/5 to-transparent" />
          </div>
          <div className="floating-grid-col absolute top-0 left-2/4 w-1/4 h-full opacity-5">
            <div className="w-full h-full bg-gradient-to-b from-black/5 to-transparent" />
          </div>
          <div className="floating-grid-col last absolute top-0 left-3/4 w-1/4 h-full opacity-5">
            <div className="w-full h-full bg-gradient-to-b from-black/10 to-transparent" />
          </div>
        </div>

        <div className="hero-glow-container absolute inset-0 pointer-events-none">
          <div className="hero-glow absolute -top-48 -right-48 w-96 h-96 bg-yellow-200/30 rounded-full blur-3xl" />
        </div>

        <div className="navbar w-full fixed top-12 left-0 z-50 opacity-0">
          <div className="nav-menu-wrapper max-w-7xl mx-auto px-6">
            <nav className="nav-menu flex justify-between items-center" ref={navRef}>
              <div className="nav-links flex space-x-8">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={`nav-link text-white hover:text-yellow-200 transition-colors duration-200 text-sm font-medium ${
                      item.isActive ? 'w--current border-b border-yellow-200' : ''
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>

        <header className={`header relative z-10 ${className}`}>
          <div className="header-container max-w-7xl mx-auto px-6 py-12">
            <div className=" grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              <div className="grid-col-1">
                <Link 
                  href="/" 
                  className="logo-link inline-block"
                  ref={logoRef}
                  data-animation="fadeup"
                >
                  <div className="logo flex items-center space-x-2">
                    <div className="text-2xl lg:text-3xl font-mono font-bold text-black">
                      &lt;/&gt;
                    </div>
                    <div className="text-2xl lg:text-3xl font-semibold text-black">
                      PostLabs
                    </div>
                  </div>
                </Link>
              </div>

              <div className="grid-col-2">
                <p 
                  ref={headerTextRef}
                  className="header-text text-lg lg:text-xl text-black/80 leading-relaxed"
                  data-animation="fadeup"
                >
                  We're building the backbone of Canadian digital media — a next-gen platform that gives creators the tools to thrive.
                </p>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;