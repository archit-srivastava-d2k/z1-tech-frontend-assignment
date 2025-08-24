'use client'
import { useState, useEffect } from 'react'
import { motion } from 'motion/react'

import clsx from 'clsx'
import { useResponsive } from '@/app/hooks/useResponsive'

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isMobile } = useResponsive()

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar after scrolling past hero section
      setIsVisible(window.scrollY > window.innerHeight * 0.5)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? 0 : -20 
      }}
      transition={{ duration: 0.3 }}
      className={clsx(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300",
        isVisible ? "pointer-events-auto" : "pointer-events-none"
      )}
    >
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-white font-bold text-xl"
          >
            Post Labs
          </motion.div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="flex items-center gap-6">
              <NavLink href="#about">About</NavLink>
              <NavLink href="#contact">Contact</NavLink>
            </div>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2"
            >
              <div className="w-5 h-5 flex flex-col justify-center gap-1">
                <span className={clsx(
                  "h-0.5 bg-white transition-all",
                  isMenuOpen ? "rotate-45 translate-y-1.5" : "w-5"
                )} />
                <span className={clsx(
                  "h-0.5 bg-white transition-all",
                  isMenuOpen ? "opacity-0" : "w-5"
                )} />
                <span className={clsx(
                  "h-0.5 bg-white transition-all",
                  isMenuOpen ? "-rotate-45 -translate-y-1.5" : "w-5"
                )} />
              </div>
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: isMenuOpen ? 1 : 0, 
              height: isMenuOpen ? 'auto' : 0 
            }}
            className="overflow-hidden"
          >
            <div className="pt-4 pb-2 flex flex-col gap-3">
              <NavLink href="#about" mobile onClick={() => setIsMenuOpen(false)}>
                About
              </NavLink>
              <NavLink href="#contact" mobile onClick={() => setIsMenuOpen(false)}>
                Contact
              </NavLink>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

function NavLink({ 
  href, 
  children, 
  mobile = false, 
  onClick 
}: { 
  href: string
  children: React.ReactNode
  mobile?: boolean
  onClick?: () => void
}) {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={clsx(
        "text-white/80 hover:text-white transition-colors",
        mobile ? "text-sm" : "text-base"
      )}
    >
      {children}
    </motion.a>
  )
}
