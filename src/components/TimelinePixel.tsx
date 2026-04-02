'use client'
import { useEffect, useRef, useState } from 'react'

const EVENTS = [
  {
    id: 1, date: '3 Abril, 2025', title: 'El Comienzo', icon: '🍄', color: '#ffd700',
    desc: 'Una cita con champiñones que lo cambió todo. Nadie sabe cómo termina una historia en el primer capítulo, pero ya se sentía especial.'
  },
  {
    id: 2, date: 'Agosto 2025', title: 'Primeros Meses', icon: '🌊', color: '#4a6bff',
    desc: 'Descubriéndonos. Playlists compartidas, Deftones a medianoche, risas que nadie más entendería.'
  },
  {
    id: 3, date: 'Noviembre 2025', title: 'Temporada de Otoño', icon: '🍂', color: '#ff9ec4',
    desc: 'El otoño nos encontró más juntos que nunca. Durmiendo abrazados y sin soltarnos el uno al otro.'
  },
  {
    id: 4, date: 'Diciembre 2025', title: 'Fin de Año', icon: '✨', color: '#ffd700',
    desc: 'Cerrando el año con algo nuevo: la certeza de que esto valía la pena. Que tú valías la pena.'
  },
  {
    id: 5, date: 'Enero 2026', title: 'Año Nuevo', icon: '🌙', color: '#7b9ff9',
    desc: 'Un año nuevo y el mismo corazón — solo más lleno. Una nueva etapa para ti y para mi, pero apoyandonos mutuamente.'
  },
  {
    id: 6, date: 'Marzo 2026', title: 'La Recta Final', icon: '🌹', color: '#ff9ec4',
    desc: 'Ya casi un año. Más momentos, más fotos, más de ti. Todo suma.'
  },
  {
    id: 7, date: '3 Abril, 2026', title: 'UN AÑO JUNTOS', icon: '💙', color: '#4a6bff', special: true,
    desc: '365 días. Y lo haría todo de nuevo.'
  },
]

function TimelineNode({ event, idx }: { event: typeof EVENTS[0], idx: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.2 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const isLeft = idx % 2 === 0

  return (
    <div
      ref={ref}
      style={{
        display: 'grid', gridTemplateColumns: '1fr 28px 1fr',
        alignItems: 'flex-start', gap: 8, marginBottom: 16,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : `translateX(${isLeft ? -30 : 30}px)`,
        transition: `opacity 0.5s ease ${idx * 0.08}s, transform 0.5s ease ${idx * 0.08}s`,
      }}
    >
      {/* Left content */}
      {isLeft ? (
        <div className="px-panel" style={{ borderColor: event.color, boxShadow: event.special ? `0 0 16px ${event.color}60` : '3px 3px 0 rgba(0,0,0,0.5)' }}>
          <EventCard event={event} />
        </div>
      ) : <div />}

      {/* Center dot */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 4 }}>
        <div style={{
          width: 20, height: 20, borderRadius: '50%',
          background: visible ? event.color : 'transparent',
          border: `3px solid ${event.color}`,
          boxShadow: visible ? `0 0 10px ${event.color}80` : 'none',
          transition: 'all 0.4s ease', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8,
        }}>{event.special ? '★' : ''}</div>
      </div>

      {/* Right content */}
      {!isLeft ? (
        <div className="px-panel" style={{ borderColor: event.color, boxShadow: event.special ? `0 0 16px ${event.color}60` : '3px 3px 0 rgba(0,0,0,0.5)' }}>
          <EventCard event={event} />
        </div>
      ) : <div />}
    </div>
  )
}

function EventCard({ event }: { event: typeof EVENTS[0] }) {
  return (
    <div>
      {event.special && (
        <div style={{ fontFamily: "'Press Start 2P',monospace", fontSize: 7, color: event.color, marginBottom: 6 }}>★ UN AÑO ★</div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
        <span style={{ fontSize: 16 }}>{event.icon}</span>
        <span className="px-label" style={{ color: event.color }}>{event.title}</span>
      </div>
      <div style={{ fontFamily: "'VT323',monospace", fontSize: 14, color: '#606080', marginBottom: 4 }}>{event.date}</div>
      <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 11, color: '#b0b0c8', fontStyle: 'italic', lineHeight: 1.6 }}>
        {event.desc}
      </div>
    </div>
  )
}

export default function TimelinePixel() {
  return (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16, height: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <span className="px-heading" style={{ fontSize: 9, color: '#55c57a' }}>🌹 NUESTRA HISTORIA</span>
        <div style={{ flex: 1, height: 3, background: 'repeating-linear-gradient(90deg,#55c57a 0px,#55c57a 4px,transparent 4px,transparent 8px)' }} />
      </div>

      {/* Timeline */}
      <div style={{ flex: 1, overflowY: 'auto', position: 'relative', paddingRight: 4 }}>
        {/* Center vertical line */}
        <div style={{
          position: 'absolute', top: 0, bottom: 0, left: 'calc(50% - 1.5px)',
          width: 3, background: 'repeating-linear-gradient(to bottom,#2a3a2a 0px,#2a3a2a 8px,transparent 8px,transparent 14px)',
          zIndex: 0,
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {EVENTS.map((ev, i) => <TimelineNode key={ev.id} event={ev} idx={i} />)}
        </div>
      </div>
    </div>
  )
}
