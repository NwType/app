'use client'
import { useEffect, useState } from 'react'

interface Props {
  targetDate: Date
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function HeroSection({ targetDate }: Props) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [daysTogether, setDaysTogether] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setMounted(true)
    setTimeout(() => setVisible(true), 100)

    const startDate = new Date('2025-04-03T00:00:00')
    const now = new Date()
    const diff = now.getTime() - startDate.getTime()
    setDaysTogether(Math.floor(diff / (1000 * 60 * 60 * 24)))

    const interval = setInterval(() => {
      const now = new Date()
      const target = new Date('2026-04-03T00:00:00')
      const diff = target.getTime() - now.getTime()

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  const scrollDown = () => {
    document.getElementById('songs')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, #2e4a8c22 0%, #0a0f1e 60%)',
      }}
    >
      {/* Decorative top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #4a6cb3, transparent)' }}
      />

      {/* Main content */}
      <div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 1.2s ease, transform 1.2s ease',
        }}
      >
        {/* Pre-title */}
        <p className="font-mono text-gold-vintage tracking-[0.3em] text-xs uppercase mb-6 opacity-80">
          ✦ 3 de Abril, 2025 — 3 de Abril, 2026 ✦
        </p>

        {/* Main title */}
        <h1
          className="font-serif text-6xl md:text-8xl font-bold mb-4 leading-tight text-glow"
          style={{ color: '#e8c98a' }}
        >
          Un Año
        </h1>
        <h2
          className="font-serif text-5xl md:text-7xl font-light italic mb-3"
          style={{ color: '#f5e6c8' }}
        >
          Contigo,
        </h2>
        <h2
          className="font-script text-6xl md:text-8xl mb-8 text-glow-blue"
          style={{ color: '#6b8fd4' }}
        >
          Gabi
        </h2>

        {/* Days together */}
        <div className="glass-card inline-block px-8 py-4 mb-10">
          <p className="font-serif text-parchment text-lg">
            <span className="shimmer-text font-bold text-3xl">{mounted ? daysTogether : '—'}</span>
            <span className="text-gold-vintage ml-2">días juntos</span>
          </p>
        </div>

        {/* Countdown */}
        {mounted && timeLeft.days > 0 && (
          <div className="mb-10">
            <p className="font-mono text-sapphire-glow text-xs tracking-widest uppercase mb-3">
              Cuenta regresiva para nuestro aniversario
            </p>
            <div className="flex gap-4 justify-center">
              {[
                { val: timeLeft.days, label: 'días' },
                { val: timeLeft.hours, label: 'horas' },
                { val: timeLeft.minutes, label: 'min' },
                { val: timeLeft.seconds, label: 'seg' },
              ].map(({ val, label }) => (
                <div key={label} className="glass-card px-4 py-3 min-w-[70px]">
                  <div className="font-serif text-2xl font-bold text-gold-vintage leading-none">
                    {String(val).padStart(2, '0')}
                  </div>
                  <div className="font-mono text-[10px] text-sapphire-glow uppercase tracking-wider mt-1">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Anniversary arrived */}
        {mounted && timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && (
          <div className="glass-card px-8 py-4 mb-10 border-gold-vintage">
            <p className="font-serif text-gold-light text-xl">
              🎉 ¡Feliz Aniversario, Gabi! 🎉
            </p>
          </div>
        )}

        {/* Scroll CTA */}
        <button
          id="scroll-down-btn"
          onClick={scrollDown}
          className="flex flex-col items-center gap-2 mx-auto opacity-60 hover:opacity-100 transition-opacity duration-300 group"
        >
          <span className="font-mono text-xs tracking-widest text-gold-vintage uppercase">
            Explorar nuestra historia
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-gold-vintage to-transparent group-hover:h-16 transition-all duration-500" />
          <span className="text-gold-vintage text-lg animate-bounce">↓</span>
        </button>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-6 left-6 text-gold-vintage opacity-30 font-serif text-4xl">❧</div>
      <div className="absolute top-6 right-6 text-gold-vintage opacity-30 font-serif text-4xl transform scale-x-[-1]">❧</div>
      <div className="absolute bottom-6 left-6 text-gold-vintage opacity-30 font-serif text-4xl transform rotate-180 scale-x-[-1]">❧</div>
      <div className="absolute bottom-6 right-6 text-gold-vintage opacity-30 font-serif text-4xl transform rotate-180">❧</div>
    </section>
  )
}
