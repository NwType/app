'use client'
import { useEffect, useRef, useState } from 'react'

const timelineEvents = [
  {
    id: 1,
    date: '3 Abril, 2025',
    title: 'El Comienzo',
    emoji: '🍄',
    description: 'Una cita con champiñones que lo cambió todo. Nadie sabe cómo termina una historia en el primer capítulo, pero ya se sentía especial.',
    color: '#c9a96e',
  },
  {
    id: 2,
    date: 'Agosto 2025',
    title: 'Primeros Meses',
    emoji: '🌊',
    description: 'Descubriéndonos. Playlist compartidas, Deftones a medianoche, risas que nadie más entendería.',
    color: '#4a6cb3',
  },
  {
    id: 3,
    date: 'Noviembre 2025',
    title: 'Temporada de Otoño',
    emoji: '🍂',
    description: 'El otoño nos encontró más juntos que nunca. Cleo ya era parte de los planes.',
    color: '#e8a0bf',
  },
  {
    id: 4,
    date: 'Diciembre 2025',
    title: 'Fin de Año',
    emoji: '✨',
    description: 'Cerrando el año con algo nuevo: la certeza de que esto valía la pena. Que tú valías la pena.',
    color: '#c9a96e',
  },
  {
    id: 5,
    date: 'Enero 2026',
    title: 'Año Nuevo',
    emoji: '🌙',
    description: 'Un año nuevo y el mismo corazón — solo más lleno. Karaoke, Boa, Deftones y tú.',
    color: '#6b8fd4',
  },
  {
    id: 6,
    date: 'Marzo 2026',
    title: 'La Recta Final',
    emoji: '🌹',
    description: 'Ya casi un año. Más momentos, más fotos, más de ti. Todo suma.',
    color: '#e8a0bf',
  },
  {
    id: 7,
    date: '3 Abril, 2026',
    title: 'Un Año Juntos',
    emoji: '💙',
    description: '365 días. Y lo haría todo de nuevo.',
    color: '#c9a96e',
    isSpecial: true,
  },
]

function TimelineItem({
  event,
  index,
  isLeft,
}: {
  event: typeof timelineEvents[0]
  index: number
  isLeft: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`flex items-center gap-4 md:gap-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : `translateX(${isLeft ? '-40px' : '40px'})`,
        transition: `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s`,
      }}
    >
      {/* Content card */}
      <div className={`flex-1 ${isLeft ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
        <div
          className="glass-card p-5 rounded-xl inline-block w-full hover:scale-105 transition-transform duration-300"
          style={{
            borderColor: `${event.color}33`,
            boxShadow: event.isSpecial ? `0 0 30px ${event.color}40` : 'none',
          }}
        >
          {event.isSpecial && (
            <div
              className="text-xs font-mono tracking-widest uppercase mb-2"
              style={{ color: event.color }}
            >
              ✦ Un año ✦
            </div>
          )}
          <div className={`flex items-center gap-2 mb-1 ${isLeft ? 'md:justify-end' : ''}`}>
            <span className="text-lg">{event.emoji}</span>
            <h3
              className="font-serif text-xl font-semibold"
              style={{ color: event.isSpecial ? event.color : '#f5e6c8' }}
            >
              {event.title}
            </h3>
          </div>
          <p className="font-mono text-xs mb-2" style={{ color: event.color }}>
            {event.date}
          </p>
          <p className="font-serif text-parchment/70 text-sm leading-relaxed italic">
            {event.description}
          </p>
        </div>
      </div>

      {/* Center dot */}
      <div className="hidden md:flex flex-col items-center relative z-10">
        <div
          className="w-5 h-5 rounded-full border-2 transition-all duration-500 flex items-center justify-center"
          style={{
            borderColor: event.color,
            background: visible ? event.color : 'transparent',
            boxShadow: visible ? `0 0 12px ${event.color}80` : 'none',
          }}
        >
          {event.isSpecial && (
            <div className="w-2 h-2 rounded-full bg-midnight" />
          )}
        </div>
      </div>

      {/* Spacer for opposite side */}
      <div className="flex-1 hidden md:block" />
    </div>
  )
}

export default function Timeline() {
  return (
    <section id="timeline" className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-mono text-sapphire-glow text-xs tracking-[0.3em] uppercase mb-3">✦ nuestra línea del tiempo ✦</p>
          <h2 className="font-serif text-5xl md:text-6xl text-gold-vintage text-glow mb-4">Nuestra Historia</h2>
          <div className="ornament-divider max-w-xs mx-auto">
            <span className="text-gold-vintage text-sm">🌹</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Central line */}
          <div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(201,169,110,0.4) 10%, rgba(201,169,110,0.4) 90%, transparent)' }}
          />

          <div className="space-y-10">
            {timelineEvents.map((event, i) => (
              <TimelineItem
                key={event.id}
                event={event}
                index={i}
                isLeft={i % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
