'use client'
import { useState, useEffect } from 'react'

const navItems = [
  { href: '#songs', label: 'Canciones', emoji: '🎵' },
  { href: '#photos', label: 'Fotos', emoji: '📖' },
  { href: '#letter', label: 'Carta', emoji: '💌' },
  { href: '#timeline', label: 'Historia', emoji: '🌹' },
]

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleNav = (href: string) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(10,15,30,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,169,110,0.15)' : 'none',
      }}
    >
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-script text-2xl text-gold-vintage hover:text-gold-light transition-colors"
        >
          G & K
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map(item => (
            <button
              key={item.href}
              id={`nav-${item.href.slice(1)}`}
              onClick={() => handleNav(item.href)}
              className="px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider text-parchment/60 hover:text-gold-vintage hover:bg-sapphire-deep/30 transition-all duration-300"
            >
              {item.emoji} {item.label}
            </button>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          id="mobile-menu-btn"
          className="md:hidden text-gold-vintage text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-4 space-y-1"
          style={{ background: 'rgba(10,15,30,0.95)', borderBottom: '1px solid rgba(201,169,110,0.15)' }}
        >
          {navItems.map(item => (
            <button
              key={item.href}
              onClick={() => handleNav(item.href)}
              className="w-full text-left px-4 py-3 rounded-lg font-mono text-sm text-parchment/70 hover:text-gold-vintage hover:bg-sapphire-deep/30 transition-all duration-300"
            >
              {item.emoji} {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
