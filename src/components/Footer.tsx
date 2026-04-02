'use client'
import { useState } from 'react'

const easterEggs = [
  {
    id: 'hollow-knight',
    game: 'Hollow Knight',
    icon: '🦋',
    hint: 'Un reino en la oscuridad',
    message: 'En las profundidades del hollow, encontré algo más precioso que el Pale Ore — a ti.',
    color: '#6b8fd4',
  },
  {
    id: 'fallout',
    game: 'Fallout',
    icon: '☢️',
    hint: 'War never changes',
    message: 'El mundo puede estar en ruinas. Las radiaciones, los raiders, los deathclaws — me importa un pip-boy si estás conmigo.',
    color: '#c9a96e',
  },
  {
    id: 'left4dead',
    game: 'Left 4 Dead',
    icon: '🧟',
    hint: 'No te abandono',
    message: 'En cualquier apocalipsis zombi, eres mi compañera de supervivencia. Nunca te dejo atrás.',
    color: '#e8a0bf',
  },
]

export default function Footer() {
  const [foundEgg, setFoundEgg] = useState<string | null>(null)

  return (
    <footer className="relative py-20 px-6 mt-12">
      {/* Gradient separator */}
      <div className="h-px w-full mb-16" style={{ background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.4), transparent)' }} />

      <div className="max-w-4xl mx-auto">
        {/* Easter eggs section */}
        <div className="text-center mb-12">
          <p className="font-mono text-sapphire-glow text-xs tracking-[0.3em] uppercase mb-3">✦ para la gamer que amo ✦</p>
          <h3 className="font-serif text-3xl text-gold-vintage mb-2">Easter Eggs</h3>
          <p className="font-serif italic text-parchment/40 text-sm mb-8">Haz clic para desbloquear</p>

          <div className="grid md:grid-cols-3 gap-4">
            {easterEggs.map(egg => (
              <button
                key={egg.id}
                id={`easter-egg-${egg.id}`}
                onClick={() => setFoundEgg(foundEgg === egg.id ? null : egg.id)}
                className="glass-card p-6 rounded-xl text-center transition-all duration-300 hover:scale-105 group"
                style={{
                  borderColor: foundEgg === egg.id ? `${egg.color}60` : 'rgba(201,169,110,0.1)',
                  boxShadow: foundEgg === egg.id ? `0 0 30px ${egg.color}30` : 'none',
                }}
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {egg.icon}
                </div>
                <p className="font-serif text-parchment/60 text-xs italic mb-2">{egg.hint}</p>
                <p className="font-mono text-xs uppercase tracking-widest" style={{ color: egg.color }}>
                  {foundEgg === egg.id ? egg.game : '???'}
                </p>

                {foundEgg === egg.id && (
                  <div className="mt-4 pt-4" style={{ borderTop: `1px solid ${egg.color}30` }}>
                    <p className="font-serif italic text-parchment/70 text-sm leading-relaxed">
                      "{egg.message}"
                    </p>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Cleo section */}
        <div className="text-center mb-12">
          <div className="glass-card inline-block px-8 py-6 rounded-2xl">
            <p className="text-4xl mb-3">🐈</p>
            <p className="font-serif text-gold-vintage text-lg mb-1">Y Cleo</p>
            <p className="font-serif italic text-parchment/50 text-sm">
              La mejor gatita siamesa del mundo — que te eligió igual que yo.
            </p>
          </div>
        </div>

        {/* Final message */}
        <div className="text-center">
          <div className="ornament-divider max-w-xs mx-auto mb-8">
            <span className="text-gold-vintage text-sm">💙</span>
          </div>

          <p className="font-script text-4xl text-sapphire-glow mb-3">
            Feliz Aniversario, Gabi
          </p>
          <p className="font-serif italic text-parchment/50 text-sm">
            3 de Abril, 2025 — 3 de Abril, 2026
          </p>

          <div className="mt-8 flex items-center justify-center gap-4 text-parchment/20 text-xs font-mono tracking-widest">
            <span>G</span>
            <span className="text-gold-vintage">♥</span>
            <span>K</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
