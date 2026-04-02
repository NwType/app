'use client'
import { useState, useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'
import { photos } from '@/data/photos'

/* ─────────────────────────────────────────
   LIGHTBOX
   ───────────────────────────────────────── */
function Lightbox({
  photo, idx, total, onClose, onPrev, onNext,
}: {
  photo: typeof photos[0]; idx: number; total: number;
  onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  // Keyboard nav
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  onPrev()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'Escape')     onClose()
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onPrev, onNext, onClose])

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 300,
        background: 'rgba(2,2,20,0.95)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '16px 12px',
        animation: 'lbFadeIn 0.15s ease forwards',
      }}
      onClick={onClose}
    >
      {/* Counter */}
      <div style={{
        position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)',
        fontFamily: "'Press Start 2P', monospace", fontSize: 8, color: '#ffd700',
        textShadow: '1px 1px 0 #000', whiteSpace: 'nowrap',
      }}>
        {idx + 1} / {total}
      </div>

      {/* Close */}
      <button
        onClick={e => { e.stopPropagation(); onClose() }}
        style={{
          position: 'absolute', top: 10, right: 12,
          background: '#ff5555', border: '2px solid #0f0f23',
          color: '#fff', fontWeight: 'bold', fontSize: 16,
          width: 32, height: 32, cursor: 'pointer',
          boxShadow: '2px 2px 0 #000',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, transition: 'background 0.1s',
        }}
      >✕</button>

      {/* Image container */}
      <div
        style={{
          position: 'relative',
          width: 'min(90vw, 760px)',
          height: 'min(72vh, 580px)',
          border: '3px solid #f0f0f0',
          boxShadow: '0 0 40px rgba(74,107,255,0.3), 6px 6px 0 rgba(0,0,0,0.7)',
        }}
        onClick={e => e.stopPropagation()}
      >
        <Image
          key={photo.id}
          src={photo.file}
          alt={photo.caption}
          fill
          sizes="min(90vw, 760px)"
          style={{ objectFit: 'contain' }}
          quality={85}
          priority
        />
        {/* Gold corner pixels */}
        {(['top','bottom'] as const).flatMap(v => (['left','right'] as const).map(h => (
          <div key={v+h} style={{
            position: 'absolute',
            [v]: -3, [h]: -3,
            width: 12, height: 12, background: '#ffd700',
            border: '2px solid #0f0f23', zIndex: 1,
          }} />
        )))}
      </div>

      {/* Caption + nav */}
      <div style={{ textAlign: 'center', marginTop: 14 }} onClick={e => e.stopPropagation()}>
        <div style={{
          fontFamily: 'Inter, sans-serif', fontSize: 14,
          color: '#e0e0f8', fontStyle: 'italic', marginBottom: 4,
        }}>"{photo.caption}"</div>
        {photo.date && (
          <div style={{ fontFamily: "'VT323', monospace", fontSize: 16, color: '#606080' }}>
            {photo.date}
          </div>
        )}
        <div style={{ display: 'flex', gap: 12, marginTop: 12, justifyContent: 'center' }}>
          <button onClick={onPrev} style={navBtnStyle}>← ANT</button>
          <button onClick={onNext} style={navBtnStyle}>SIG →</button>
        </div>
      </div>
    </div>
  )
}

const navBtnStyle: React.CSSProperties = {
  background: '#1a1a3a', border: '2px solid #4a6bff',
  color: '#fff', padding: '7px 12px', cursor: 'pointer',
  fontFamily: "'Press Start 2P', monospace", fontSize: 7,
  boxShadow: '2px 2px 0 #000', transition: 'transform 0.08s, box-shadow 0.08s',
}

/* ─────────────────────────────────────────
   LAZY PHOTO CARD — only loads when visible
   ───────────────────────────────────────── */
function PhotoCard({
  photo, idx, onOpen,
}: { photo: typeof photos[0]; idx: number; onOpen: () => void }) {
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLButtonElement>(null)

  // Intersection Observer: only render <Image> when card enters viewport
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { rootMargin: '200px' }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <button
      ref={ref}
      id={`photo-${photo.id}`}
      onClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: hovered ? '#1a1a3a' : '#0d0d1e',
        border: `2px solid ${hovered ? '#ffd700' : '#1e1e3a'}`,
        boxShadow: hovered ? '0 0 10px rgba(255,215,0,0.25), 3px 3px 0 #000' : '2px 2px 0 rgba(0,0,0,0.4)',
        cursor: 'pointer', overflow: 'hidden',
        width: '100%', aspectRatio: '1 / 1',
        transition: 'border-color 0.12s, box-shadow 0.12s, transform 0.12s',
        transform: hovered ? 'scale(1.05)' : 'scale(1)',
        padding: 0, display: 'block',
        // Staggered entrance animation
        animation: `cardIn 0.3s ease ${Math.min(idx * 0.03, 0.5)}s both`,
      }}
    >
      {visible ? (
        <Image
          src={photo.file}
          alt={photo.caption}
          fill
          // Thumbnail: request 200px wide WebP — Next.js serves tiny optimized version
          sizes="200px"
          style={{ objectFit: 'cover', transition: 'opacity 0.3s' }}
          quality={60}
          loading="lazy"
        />
      ) : (
        /* Skeleton placeholder */
        <div style={{
          position: 'absolute', inset: 0,
          background: 'repeating-linear-gradient(135deg,#0d0d1e 0px,#0d0d1e 6px,#111128 6px,#111128 12px)',
        }} />
      )}

      {/* Hover overlay */}
      {hovered && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,20,0.88) 0%, rgba(0,0,20,0.2) 55%, transparent 100%)',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'flex-end', padding: '5px 6px',
          pointerEvents: 'none',
        }}>
          <div style={{
            fontFamily: 'Inter, sans-serif', fontSize: 9,
            color: '#fff', fontStyle: 'italic', lineHeight: 1.3,
            overflow: 'hidden', display: '-webkit-box',
            WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const,
          }}>{photo.caption}</div>
          {photo.date && (
            <div style={{ fontFamily: "'VT323',monospace", fontSize: 12, color: '#ffd700', lineHeight: 1 }}>
              {photo.date}
            </div>
          )}
        </div>
      )}

      {/* Number badge */}
      <div style={{
        position: 'absolute', top: 3, left: 3,
        background: 'rgba(0,0,0,0.65)', border: '1px solid #1e1e3a',
        fontFamily: "'VT323',monospace", fontSize: 11,
        color: '#404060', padding: '1px 3px', lineHeight: 1,
        pointerEvents: 'none',
      }}>{idx + 1}</div>
    </button>
  )
}

/* ─────────────────────────────────────────
   MAIN GALLERY
   ───────────────────────────────────────── */
export default function PhotoGallery() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

  const openPhoto  = useCallback((i: number) => setLightboxIdx(i), [])
  const closePhoto = useCallback(() => setLightboxIdx(null), [])
  const prevPhoto  = useCallback(() => setLightboxIdx(i => i === null ? null : (i - 1 + photos.length) % photos.length), [])
  const nextPhoto  = useCallback(() => setLightboxIdx(i => i === null ? null : (i + 1) % photos.length), [])

  return (
    <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10, height: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <span className="px-heading" style={{ fontSize: 9, color: '#c87dff' }}>📸 NUESTROS MOMENTOS</span>
        <div style={{ flex: 1, height: 3, background: 'repeating-linear-gradient(90deg,#9932cc 0px,#9932cc 4px,transparent 4px,transparent 8px)' }} />
        <span style={{ fontFamily: "'VT323',monospace", fontSize: 16, color: '#606080', flexShrink: 0 }}>
          {photos.length} fotos
        </span>
      </div>

      <div style={{ fontFamily: "'VT323',monospace", fontSize: 15, color: '#404060', flexShrink: 0 }}>
        {'>'} Click en una foto para verla completa · ← → para navegar
      </div>

      {/* Grid — auto-fill so it's naturally responsive */}
      <div style={{
        flex: 1, overflowY: 'auto', overflowX: 'hidden', paddingRight: 2,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
        gap: 5,
        alignContent: 'start',
      }}>
        {photos.map((p, i) => (
          <PhotoCard key={p.id} photo={p} idx={i} onOpen={() => openPhoto(i)} />
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <Lightbox
          photo={photos[lightboxIdx]}
          idx={lightboxIdx}
          total={photos.length}
          onClose={closePhoto}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}

      <style>{`
        @keyframes lbFadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes cardIn { from { opacity:0; transform:scale(0.9) } to { opacity:1; transform:scale(1) } }
      `}</style>
    </div>
  )
}
