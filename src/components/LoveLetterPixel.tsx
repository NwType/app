'use client'
import { useEffect, useRef, useState } from 'react'

const LINES = [
  { text: 'Gabi,', c: '#ffd700', big: true },
  { text: '' },
  { text: 'Si pudiera resumir este año en una sola cosa,', c: '#e0e0ff', italic: true },
  { text: 'sería que contigo descubrí lo que significa quedarse.', c: '#e0e0ff', italic: true },
  { text: '' },
  { text: 'No es común encontrar a alguien con quien el silencio', c: '#c0c0e0' },
  { text: 'se sienta como hogar. Contigo hay música, hay risa,', c: '#c0c0e0' },
  { text: 'reciprocidad', c: '#c0c0e0' },
  { text: 'hay Champiñres compartidos en una cita que cambió todo.', c: '#c0c0e0' },
  { text: '' },
  { text: 'Me encanta que tienes a Cleo. Que los gatos te eligen', c: '#c0c0e0' },
  { text: 'a ti igual que yo. 🐾', c: '#ff9ec4' },
  { text: '' },
  { text: 'En cualquier mundo posible —', c: '#c0c0e0' },
  { text: 'incluso en uno en ruinas —', c: '#ff9ec4', italic: true },
  { text: 'te elegiría a ti.', c: '#f0f0ff', big: true },
  { text: '' },
  { text: 'Gracias por este año.', c: '#c0c0e0' },
  { text: 'Por cada momento, por cada canción,', c: '#c0c0e0' },
  { text: 'por ser exactamente quien eres.', c: '#c0c0e0' },
  { text: '' },
  { text: 'Con todo lo que soy,', c: '#7b9ff9', italic: true },
  { text: '— Kevin 💙', c: '#4a6bff', big: true },
]

const DELAY_PER_LINE = 380

export default function LoveLetterPixel() {
  const [visibleLines, setVisibleLines] = useState(0)
  const [started, setStarted] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const startedRef = useRef(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !startedRef.current) {
          startedRef.current = true
          setStarted(true)
        }
      }, { threshold: 0.2 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    LINES.forEach((_, i) => {
      setTimeout(() => setVisibleLines(i + 1), i * DELAY_PER_LINE)
    })
  }, [started])

  const restart = () => {
    setVisibleLines(0)
    startedRef.current = false
    setStarted(false)
    setTimeout(() => { startedRef.current = true; setStarted(true) }, 50)
  }

  return (
    <div ref={sectionRef} style={{ padding: 20, height: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <span className="px-heading" style={{ fontSize: 9, color: '#ff9ec4' }}>💌 CARTA PARA GABI</span>
        <div style={{ flex: 1, height: 3, background: 'repeating-linear-gradient(90deg,#e05c95 0px,#e05c95 4px,transparent 4px,transparent 8px)' }} />
      </div>

      {/* Paper */}
      <div style={{
        flex: 1, background: '#050510',
        border: '3px solid #e05c95',
        boxShadow: '5px 5px 0 rgba(0,0,0,0.5)',
        padding: 20, overflowY: 'auto', position: 'relative',
      }}>
        {/* Graph paper lines */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 28px)',
          backgroundSize: '100% 28px',
        }} />

        {/* Letter content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {LINES.slice(0, visibleLines).map((line, i) => (
            <p key={i} style={{
              color: (line as any).c || '#c0c0e0',
              fontStyle: (line as any).italic ? 'italic' : 'normal',
              fontSize: (line as any).big ? 15 : 13,
              fontFamily: (line as any).big ? "'Dancing Script',cursive" : 'Inter,sans-serif',
              lineHeight: 1.9,
              marginBottom: line.text === '' ? 10 : 0,
              opacity: 1,
              animation: 'fadeInLeft 0.3s ease',
            }}>
              {line.text || '\u00A0'}
            </p>
          ))}

          {/* Cursor */}
          {visibleLines < LINES.length && (
            <span className="blink" style={{ color: '#ff9ec4', fontSize: 16, fontWeight: 'bold' }}>|</span>
          )}

          {/* Complete message */}
          {visibleLines >= LINES.length && (
            <div style={{ marginTop: 24, display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
              <div className="heartbeat" style={{ fontSize: 32, filter: 'drop-shadow(0 0 8px rgba(74,107,255,0.8))' }}>💙</div>
              <button className="px-btn px-btn-dark" style={{ fontSize: 7, padding: '4px 8px', borderColor: '#e05c95' }} onClick={restart}>
                ↺ RELEER
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-8px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}
