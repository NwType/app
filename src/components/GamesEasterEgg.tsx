'use client'
import { useState } from 'react'

const GAMES = [
  {
    id: 'hollow-knight', name: 'Hollow Knight', icon: '🦋', color: '#9b59b6',
    hint: 'No cost too great...',
    msg: 'En las profundidades de Hallownest o en el mundo real, enfrentaría cualquier jefe por ti y te acompañaría en los bancos a descansar. Eres la luz en mi oscuridad y la única ruta que siempre quiero explorar.',
    quote: '"You are sealed. You are the vessel... but you are mine."',
  },
  {
    id: 'fallout', name: 'Fallout', icon: '☢️', color: '#66ff66',
    hint: 'War never changes...',
    msg: 'Podría caer una bomba nuclear o el mundo entero destruirse en pedazos, pero mientras tenga un estimulante para curarnos a ambos y estés a mi lado, todo será un S.P.E.C.I.A.L refugio perfecto.',
    quote: '"Stand by me..."',
  },
  {
    id: 'left4dead', name: 'Left 4 Dead', icon: '🧟', color: '#ff3333',
    hint: 'Hay infectados cerca...',
    msg: 'Ya vengan Hunters con mods bien raros xd o el mismísimo Tank, jamás te dejaría atrás en un refugio. Contigo siempre comparto el último botiquín pildoras oiiiiiaoiiia .',
    quote: '"Reloading! Protect me!" - We got this.',
  },
  {
    id: 'minecraft', name: 'Minecraft', icon: '⛏️', color: '#5dade2',
    hint: 'Construyendo algo eterno...',
    msg: 'No lo he jugado lo se, pero quiero contruir un mundo contigo, ya sea en el mundo eral o ahi, enfrentaria todas las adversidades de la vida por ti, no lo dudo ni un segundo.',
    quote: '"Sleep is sweet now that you are beside me."',
  },
]

export default function GamesEasterEgg() {
  const [revealed, setRevealed] = useState<string | null>(null)

  return (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16, height: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <span className="px-heading" style={{ fontSize: 9, color: '#ffd700' }}>🎮 EASTER EGGS / PRESS START</span>
        <div className="px-divider-gold" style={{ flex: 1, margin: 0 }} />
      </div>

      <div style={{ fontFamily: "'VT323',monospace", fontSize: 16, color: '#a0a0c0' }}>
        {'>'} Para la gamer más hermosa. Selecciona un nivel escondido.
      </div>

      {/* Game cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px,1fr))', gap: 12, flex: 1, overflowY: 'auto', paddingRight: 4 }}>
        {GAMES.map(g => {
          const isUnlocked = revealed === g.id
          return (
            <button
              key={g.id}
              id={`egg-${g.id}`}
              onClick={() => setRevealed(isUnlocked ? null : g.id)}
              className={isUnlocked ? "unlock-anim" : ""}
              style={{
                display: 'flex', flexDirection: 'column', gap: 12, padding: 16,
                background: isUnlocked ? '#020205' : '#0a0a14',
                border: `3px solid ${isUnlocked ? g.color : '#1f1f33'}`,
                boxShadow: isUnlocked ? `0 0 15px ${g.color}40, inset 0 0 20px ${g.color}20` : '4px 4px 0 rgba(0,0,0,0.5)',
                cursor: 'pointer', textAlign: 'left', position: 'relative', overflow: 'hidden',
                transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                transform: isUnlocked ? 'scale(1.02)' : 'scale(1)',
              }}
            >
              {/* Scanline overlay when unlocked */}
              {isUnlocked && (
                <div style={{
                  position: 'absolute', inset: 0, pointerEvents: 'none',
                  background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
                  backgroundSize: '100% 4px, 3px 100%',
                  opacity: 0.8
                }} />
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, zIndex: 1 }}>
                <span style={{ fontSize: isUnlocked ? 32 : 24, transition: 'font-size 0.2s', filter: isUnlocked ? `drop-shadow(0 0 8px ${g.color})` : 'none' }}>
                  {g.icon}
                </span>
                <div>
                  <div className="px-label" style={{ color: isUnlocked ? g.color : '#606080', fontSize: isUnlocked ? 9 : 7, letterSpacing: 1 }}>
                    {isUnlocked ? g.name : 'NIVEL BLOQUEADO'}
                  </div>
                  <div style={{ fontFamily: "'VT323',monospace", fontSize: 14, color: isUnlocked ? '#d0d0d0' : '#404060', fontStyle: 'italic', marginTop: 4 }}>
                    {isUnlocked ? 'Logro desbloqueado!' : g.hint}
                  </div>
                </div>
              </div>

              {isUnlocked && (
                <div style={{ borderTop: `2px dashed ${g.color}50`, paddingTop: 12, zIndex: 1, animation: 'fadeIn 0.5s ease forwards' }}>
                  <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 13, color: '#e0e0f8', fontStyle: 'italic', lineHeight: 1.6, marginBottom: 10 }}>
                    "{g.msg}"
                  </div>
                  <div className="px-label" style={{ color: g.color === '#ff3333' ? '#ff6666' : g.color, fontSize: 8 }}>
                    {g.quote}
                  </div>
                </div>
              )}

              {!isUnlocked && (
                <div className="px-label blink" style={{ fontSize: 7, color: '#4a6bff', marginTop: 'auto' }}>
                  [ CLICK PARA DESBLOQUEAR ]
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Bottom message */}
      <div className="px-panel" style={{ textAlign: 'center', padding: 16, flexShrink: 0, borderColor: '#4a6bff', background: '#0a0a20' }}>
        <div className="heartbeat" style={{ fontFamily: "'Press Start 2P',monospace", fontSize: 9, color: '#ffd700', lineHeight: 2 }}>
          PLAYER 2 HAS ENTERED THE GAME
        </div>
        <div style={{ fontFamily: "'VT323',monospace", fontSize: 20, color: '#7b9ff9', marginTop: 8 }}>
          Y desde ese día.. Entraste en mi mundo, gracias por acompañarme en esta aventura y a seguir haciendola juntos te amo.
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .unlock-anim {
          animation: eggUnlock 0.4s ease-out;
        }
        @keyframes eggUnlock {
          0% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.05); filter: brightness(1.5); }
          100% { transform: scale(1.02); filter: brightness(1); }
        }
      `}</style>
    </div>
  )
}

