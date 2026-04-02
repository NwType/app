'use client'
import { useState } from 'react'
import { photos } from '@/data/photos'
import Image from 'next/image'

export default function PhotoBookPixel() {
  const [page, setPage] = useState(0)
  const [turning, setTurning] = useState(false)
  const [dir, setDir] = useState<'next' | 'prev'>('next')

  const go = (d: 'next' | 'prev') => {
    if (turning) return
    const next = d === 'next' ? Math.min(page+1, photos.length-1) : Math.max(page-1, 0)
    if (next === page) return
    setDir(d); setTurning(true)
    setTimeout(() => { setPage(next); setTurning(false) }, 350)
  }

  const photo = photos[page]

  return (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16, height: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span className="px-heading" style={{ fontSize: 9, color: '#c87dff' }}>📸 NUESTROS MOMENTOS</span>
        <div style={{ flex: 1, height: 3, background: 'repeating-linear-gradient(90deg, #9932cc 0px, #9932cc 4px, transparent 4px, transparent 8px)' }} />
      </div>

      {/* Book container */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Page */}
        <div
          style={{
            flex: 1,
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: 16, overflow: 'hidden',
            opacity: turning ? 0 : 1,
            transform: turning
              ? `perspective(800px) rotateY(${dir === 'next' ? '-12deg' : '12deg'})`
              : 'perspective(800px) rotateY(0deg)',
            transition: 'opacity 0.35s ease, transform 0.35s ease',
          }}
        >
          {/* Photo page (left) */}
          <div className="px-panel" style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow:'hidden',
            background: '#111',
            borderColor: '#9932cc',
          }}>
            {/* Pixel photo frame */}
            <div style={{
              position: 'relative', width: '100%', aspectRatio: '4/3', maxHeight: 280,
              border: '4px solid #f0f0f0',
              boxShadow: '6px 6px 0 rgba(0,0,0,0.6)',
              background: '#222',
            }}>
              <Image src={photo.file} alt={photo.caption} fill style={{ objectFit: 'cover', imageRendering: 'auto' }} draggable={false} />
              {/* Frame corners (pixel art) */}
              {[['top-0','left-0'],['top-0','right-0'],['bottom-0','left-0'],['bottom-0','right-0']].map(([t,l],i) => (
                <div key={i} style={{ position:'absolute', [t.split('-')[0]]: -4, [l.split('-')[0]]: -4, width:12, height:12, background:'#ffd700', border:'2px solid #0f0f23', zIndex:1 }} />
              ))}
            </div>
            {/* Date tag */}
            <div style={{
              marginTop: 10, fontFamily:"'Press Start 2P',monospace", fontSize:7,
              color:'#ffd700', background:'#111',
              border:'2px solid #ffd700', padding:'4px 8px',
              boxShadow:'3px 3px 0 rgba(0,0,0,0.5)',
            }}>{photo.date}</div>
          </div>

          {/* Text page (right) */}
          <div className="px-panel" style={{ display:'flex', flexDirection:'column', justifyContent:'space-between', borderColor:'#9932cc' }}>
            {/* Page header */}
            <div>
              <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:7, color:'#9932cc', marginBottom:10, lineHeight:1.8 }}>
                {photo.month}
              </div>
              <div className="px-divider" style={{ height:2, background:'repeating-linear-gradient(90deg,#9932cc 0px,#9932cc 4px,transparent 4px,transparent 8px)' }} />
              <div style={{
                fontFamily:"Inter,sans-serif", fontSize:15, color:'#e0e0f8',
                fontStyle:'italic', lineHeight:1.7, marginTop:12,
              }}>
                "{photo.caption}"
              </div>
            </div>

            {/* Page number */}
            <div style={{ textAlign:'right', fontFamily:"'VT323',monospace", fontSize:18, color:'#606080' }}>
              {page + 1} / {photos.length}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:12, flexShrink:0 }}>
          <button id="prev-page-btn" className="px-btn px-btn-dark" onClick={() => go('prev')} disabled={page===0}
            style={{ opacity: page===0 ? 0.3 : 1 }}>← ANTERIOR</button>

          {/* Dots */}
          <div style={{ display:'flex', gap:6 }}>
            {photos.map((_,i) => (
              <button key={i} id={`dot-${i}`}
                onClick={() => { setDir(i>page?'next':'prev'); setTurning(true); setTimeout(()=>{setPage(i);setTurning(false)},350) }}
                style={{
                  height:8, width: i===page?20:8, background: i===page?'#9932cc':'#333',
                  border:'2px solid #9932cc', cursor:'pointer', transition:'all 0.2s',
                }} />
            ))}
          </div>

          <button id="next-page-btn" className="px-btn px-btn-dark" onClick={() => go('next')} disabled={page===photos.length-1}
            style={{ opacity: page===photos.length-1 ? 0.3 : 1 }}>SIGUIENTE →</button>
        </div>
      </div>
    </div>
  )
}
