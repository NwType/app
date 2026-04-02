'use client'
import { useState } from 'react'
import { photos } from '@/data/photos'
import Image from 'next/image'

export default function PhotoBook() {
  const [currentPage, setCurrentPage] = useState(0)
  const [turning, setTurning] = useState(false)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')

  const totalPages = photos.length

  const changePage = (dir: 'next' | 'prev') => {
    if (turning) return
    const next = dir === 'next'
      ? Math.min(currentPage + 1, totalPages - 1)
      : Math.max(currentPage - 1, 0)
    if (next === currentPage) return

    setDirection(dir)
    setTurning(true)
    setTimeout(() => {
      setCurrentPage(next)
      setTurning(false)
    }, 400)
  }

  const photo = photos[currentPage]

  return (
    <section id="photos" className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-mono text-sapphire-glow text-xs tracking-[0.3em] uppercase mb-3">✦ nuestra historia en imágenes ✦</p>
          <h2 className="font-serif text-5xl md:text-6xl text-gold-vintage text-glow mb-4">El Libro de Nosotros</h2>
          <div className="ornament-divider max-w-xs mx-auto">
            <span className="text-gold-vintage text-sm">📖</span>
          </div>
        </div>

        {/* Book container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Book shadow */}
          <div
            className="absolute inset-x-0 bottom-0 h-8 mx-8 blur-2xl rounded-full"
            style={{ background: 'rgba(10,15,30,0.8)' }}
          />

          {/* Outer book cover */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #0f1e3a 0%, #1a2d5a 50%, #0f1e3a 100%)',
              border: '2px solid rgba(201,169,110,0.4)',
              boxShadow: '0 25px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(201,169,110,0.2)',
            }}
          >
            {/* Book spine */}
            <div
              className="absolute left-0 top-0 bottom-0 w-8 flex items-center justify-center"
              style={{
                background: 'linear-gradient(to right, #0a0f1e, #1a2d5a)',
                borderRight: '1px solid rgba(201,169,110,0.3)',
              }}
            >
              <span
                className="font-serif text-[10px] text-gold-vintage/60 tracking-widest"
                style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
              >
                G & K · 2025–2026
              </span>
            </div>

            {/* Page content */}
            <div className="ml-8 p-8 md:p-12">
              <div
                className="grid md:grid-cols-2 gap-8 items-center"
                style={{
                  opacity: turning ? 0 : 1,
                  transform: turning
                    ? `perspective(1000px) rotateY(${direction === 'next' ? '-15deg' : '15deg'})`
                    : 'perspective(1000px) rotateY(0deg)',
                  transition: 'opacity 0.4s ease, transform 0.4s ease',
                }}
              >
                {/* Photo */}
                <div className="relative">
                  {/* Polaroid frame */}
                  <div
                    className="relative p-3 pb-12 rounded shadow-2xl"
                    style={{
                      background: '#fdf6e3',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)',
                      transform: `rotate(${currentPage % 2 === 0 ? '-2deg' : '2deg'})`,
                    }}
                  >
                    <div className="relative w-full aspect-[4/3] overflow-hidden">
                      <Image
                        src={photo.file}
                        alt={photo.caption}
                        fill
                        className="object-cover"
                        draggable={false}
                      />
                    </div>
                    {/* Polaroid caption */}
                    <p className="font-mono text-[11px] text-gray-600 text-center mt-2 px-2">
                      {photo.date}
                    </p>
                  </div>

                  {/* Decorative tape strips */}
                  <div
                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-5 rounded opacity-60"
                    style={{ background: 'rgba(201,169,110,0.4)', transform: 'translateX(-50%) rotate(-3deg)' }}
                  />
                </div>

                {/* Text page */}
                <div className="space-y-6">
                  {/* Month badge */}
                  <div className="inline-block">
                    <span
                      className="font-mono text-xs tracking-widest uppercase px-3 py-1 rounded-full"
                      style={{
                        background: 'rgba(46,74,140,0.4)',
                        border: '1px solid rgba(106,143,212,0.4)',
                        color: '#6b8fd4',
                      }}
                    >
                      {photo.month}
                    </span>
                  </div>

                  {/* Caption */}
                  <blockquote className="font-serif text-xl md:text-2xl text-parchment italic leading-relaxed">
                    "{photo.caption}"
                  </blockquote>

                  {/* Page number */}
                  <div className="flex items-center gap-3">
                    <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, rgba(201,169,110,0.5), transparent)' }} />
                    <span className="font-mono text-xs text-gold-vintage/60">
                      {currentPage + 1} / {totalPages}
                    </span>
                  </div>

                  {/* Decorative text */}
                  <p className="font-serif text-parchment/40 text-sm italic">
                    — Escrito en el libro de nuestra vida
                  </p>
                </div>
              </div>

              {/* Page turn controls */}
              <div className="flex items-center justify-between mt-10">
                <button
                  id="prev-page-btn"
                  onClick={() => changePage('prev')}
                  disabled={currentPage === 0}
                  className="flex items-center gap-2 font-mono text-sm uppercase tracking-wider transition-all duration-300 disabled:opacity-20 hover:text-gold-vintage group"
                  style={{ color: '#c9a96e' }}
                >
                  <span className="group-hover:-translate-x-1 transition-transform">←</span>
                  <span>Anterior</span>
                </button>

                {/* Dot navigation */}
                <div className="flex gap-2">
                  {photos.map((_, i) => (
                    <button
                      key={i}
                      id={`page-dot-${i}`}
                      onClick={() => {
                        setDirection(i > currentPage ? 'next' : 'prev')
                        setTurning(true)
                        setTimeout(() => { setCurrentPage(i); setTurning(false) }, 400)
                      }}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: i === currentPage ? '20px' : '6px',
                        height: '6px',
                        background: i === currentPage ? '#c9a96e' : 'rgba(201,169,110,0.3)',
                      }}
                    />
                  ))}
                </div>

                <button
                  id="next-page-btn"
                  onClick={() => changePage('next')}
                  disabled={currentPage === totalPages - 1}
                  className="flex items-center gap-2 font-mono text-sm uppercase tracking-wider transition-all duration-300 disabled:opacity-20 hover:text-gold-vintage group"
                  style={{ color: '#c9a96e' }}
                >
                  <span>Siguiente</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* Book pages illusion */}
          <div className="absolute right-2 top-4 bottom-4 w-3 rounded-r-lg overflow-hidden">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="h-full border-r"
                style={{ borderColor: 'rgba(201,169,110,0.1)' }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
