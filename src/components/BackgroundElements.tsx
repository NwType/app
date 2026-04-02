'use client'
import { useEffect, useState } from 'react'

interface Petal {
  id: number
  left: string
  duration: string
  delay: string
  size: string
  emoji: string
}

interface Star {
  id: number
  top: string
  left: string
  size: string
  duration: string
  delay: string
}

export default function BackgroundElements() {
  const [petals, setPetals] = useState<Petal[]>([])
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    const petalEmojis = ['🌹', '🌸', '🌺', '🪷']
    const newPetals: Petal[] = Array.from({ length: 14 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: `${8 + Math.random() * 10}s`,
      delay: `${Math.random() * 12}s`,
      size: `${1 + Math.random() * 1.2}rem`,
      emoji: petalEmojis[Math.floor(Math.random() * petalEmojis.length)],
    }))
    setPetals(newPetals)

    const newStars: Star[] = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${1 + Math.random() * 2.5}px`,
      duration: `${2 + Math.random() * 4}s`,
      delay: `${Math.random() * 5}s`,
    }))
    setStars(newStars)
  }, [])

  return (
    <>
      {/* Stars */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {stars.map(star => (
          <div
            key={star.id}
            className="star"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              '--duration': star.duration,
              '--delay': star.delay,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Rose petals */}
      {petals.map(petal => (
        <span
          key={petal.id}
          className="petal"
          style={{
            left: petal.left,
            '--duration': petal.duration,
            '--delay': petal.delay,
            '--size': petal.size,
          } as React.CSSProperties}
        >
          {petal.emoji}
        </span>
      ))}

      {/* Cleo the cat — walks across the bottom */}
      <div className="cat-walk" title="Cleo 🐱">
        🐈
      </div>
    </>
  )
}
