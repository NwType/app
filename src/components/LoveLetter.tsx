'use client'
import { useEffect, useRef, useState } from 'react'

const letterLines = [
  { text: 'Gabi,', delay: 0, style: 'font-serif text-3xl text-gold-vintage font-bold' },
  { text: '', delay: 0.5, style: '' },
  { text: 'Si pudiera resumir este año en una sola cosa,', delay: 0.8, style: 'font-serif text-lg text-parchment italic' },
  { text: 'sería que contigo descubrí lo que significa quedarse.', delay: 1.8, style: 'font-serif text-lg text-parchment italic' },
  { text: '', delay: 2.8, style: '' },
  { text: 'No es común encontrar a alguien con quien el silencio', delay: 3.2, style: 'font-serif text-base text-parchment/80' },
  { text: 'se sienta como hogar. Contigo hay música, hay risa,', delay: 4.2, style: 'font-serif text-base text-parchment/80' },
  { text: 'hay Deftones a medianoche, hay karaoke a destiempo,', delay: 5.2, style: 'font-serif text-base text-parchment/80' },
  { text: 'hay hongos compartidos en una primera cita', delay: 6.2, style: 'font-serif text-base text-parchment/80' },
  { text: 'que cambió todo.', delay: 7, style: 'font-serif text-base text-parchment/80' },
  { text: '', delay: 7.8, style: '' },
  { text: 'Me encanta que tienes a Cleo. Que los gatos te eligen', delay: 8.2, style: 'font-serif text-base text-parchment/80' },
  { text: 'a ti igual que yo. 🐾', delay: 9.2, style: 'font-serif text-base text-parchment/80' },
  { text: '', delay: 10, style: '' },
  { text: 'En cualquier mundo posible —', delay: 10.5, style: 'font-serif text-base text-parchment/80' },
  { text: 'incluso en uno en ruinas —', delay: 11.3, style: 'font-serif text-base text-rose-soft italic' },
  { text: 'te elegiría a ti.', delay: 12.0, style: 'font-serif text-xl text-parchment font-medium' },
  { text: '', delay: 12.8, style: '' },
  { text: 'Gracias por este año, Gabi.', delay: 13.2, style: 'font-serif text-base text-parchment/80' },
  { text: 'Por cada momento, por cada canción,', delay: 14.0, style: 'font-serif text-base text-parchment/80' },
  { text: 'por ser exactamente quien eres.', delay: 14.8, style: 'font-serif text-base text-parchment/80' },
  { text: '', delay: 15.5, style: '' },
  { text: 'Con todo lo que soy,', delay: 16.0, style: 'font-serif text-base text-parchment/60 italic' },
  { text: '— Kevin 💙', delay: 16.8, style: 'font-script text-3xl text-sapphire-glow' },
]

export default function LoveLetter() {
  const [envelopeOpen, setEnvelopeOpen] = useState(false)
  const [visibleLines, setVisibleLines] = useState(0)
  const [letterVisible, setLetterVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const hasStarted = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true
          setTimeout(() => setEnvelopeOpen(true), 800)
          setTimeout(() => setLetterVisible(true), 1800)
        }
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!letterVisible) return
    letterLines.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines(i + 1)
      }, line.delay * 1000)
    })
  }, [letterVisible])

  return (
    <section id="letter" className="relative py-24 px-6" ref={sectionRef}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-mono text-sapphire-glow text-xs tracking-[0.3em] uppercase mb-3">✦ palabras del corazón ✦</p>
          <h2 className="font-serif text-5xl md:text-6xl text-gold-vintage text-glow mb-4">Lo Que Pienso de Ti</h2>
          <div className="ornament-divider max-w-xs mx-auto">
            <span className="text-gold-vintage text-sm">💌</span>
          </div>
        </div>

        {/* Envelope */}
        <div className="flex flex-col items-center">
          <div
            className="relative cursor-pointer mb-8"
            style={{ perspective: '1000px' }}
            onClick={() => { if (!envelopeOpen) { setEnvelopeOpen(true); setTimeout(() => setLetterVisible(true), 1000) } }}
          >
            {/* Envelope body */}
            <div
              className="relative w-72 h-44 rounded-lg overflow-visible transition-all duration-700"
              style={{
                background: 'linear-gradient(135deg, #1a2d5a, #0f1e3a)',
                border: '1px solid rgba(201,169,110,0.4)',
                boxShadow: envelopeOpen ? '0 20px 60px rgba(106,143,212,0.3)' : '0 10px 30px rgba(0,0,0,0.4)',
              }}
            >
              {/* Envelope flap */}
              <div
                className="absolute top-0 left-0 right-0 h-1/2 origin-top transition-transform duration-700 z-10"
                style={{
                  clipPath: 'polygon(0 0, 50% 60%, 100% 0)',
                  background: 'linear-gradient(135deg, #2e4a8c, #1a2d5a)',
                  borderBottom: '1px solid rgba(201,169,110,0.3)',
                  transform: envelopeOpen ? 'perspective(400px) rotateX(-180deg)' : 'rotateX(0)',
                }}
              />

              {/* Envelope bottom fold lines */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1/2"
                style={{ clipPath: 'polygon(0 100%, 50% 40%, 100% 100%)', background: 'rgba(26,45,90,0.5)' }}
              />
              <div
                className="absolute top-0 bottom-0 left-0 w-1/2"
                style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)', background: 'rgba(26,45,90,0.3)' }}
              />
              <div
                className="absolute top-0 bottom-0 right-0 w-1/2"
                style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)', background: 'rgba(26,45,90,0.3)' }}
              />

              {/* Wax seal */}
              {!envelopeOpen && (
                <div
                  className="absolute inset-0 flex items-center justify-center z-20"
                  style={{ top: '30%' }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-midnight font-serif text-lg"
                    style={{ background: 'linear-gradient(135deg, #c9a96e, #a07845)' }}
                  >
                    ❤
                  </div>
                </div>
              )}

              {!envelopeOpen && (
                <div className="absolute bottom-4 w-full text-center">
                  <p className="font-mono text-xs text-gold-vintage/60 tracking-widest">click para abrir</p>
                </div>
              )}
            </div>
          </div>

          {/* Letter paper */}
          {letterVisible && (
            <div
              className="w-full max-w-2xl rounded-2xl p-8 md:p-12 relative overflow-hidden"
              style={{
                background: 'linear-gradient(160deg, #1a2d5a 0%, #0f1e3a 60%, #1a2d5a 100%)',
                border: '1px solid rgba(201,169,110,0.3)',
                boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
                opacity: letterVisible ? 1 : 0,
                transform: letterVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 0.8s ease, transform 0.8s ease',
              }}
            >
              {/* Paper lines decoration */}
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-full h-px opacity-5"
                  style={{
                    top: `${60 + i * 32}px`,
                    background: '#c9a96e',
                  }}
                />
              ))}

              {/* Letter content */}
              <div className="relative z-10 space-y-2">
                {letterLines.slice(0, visibleLines).map((line, i) => (
                  <p
                    key={i}
                    className={line.style || 'h-3'}
                    style={{
                      opacity: 1,
                      animation: 'fadeInLeft 0.4s ease forwards',
                    }}
                  >
                    {line.text}
                  </p>
                ))}

                {/* Typing cursor */}
                {visibleLines < letterLines.length && (
                  <span
                    className="inline-block w-0.5 h-5 ml-1 align-middle"
                    style={{
                      background: '#c9a96e',
                      animation: 'blink 1s step-end infinite',
                    }}
                  />
                )}
              </div>

              {/* Decorative corner */}
              <div className="absolute top-4 right-4 text-gold-vintage/20 text-4xl font-serif">❧</div>
              <div className="absolute bottom-4 left-4 text-gold-vintage/20 text-4xl font-serif transform rotate-180">❧</div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  )
}
