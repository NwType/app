'use client'
import { useEffect } from 'react'

interface Props {
  title: string
  icon: string
  accentColor?: string
  onClose: () => void
  children: React.ReactNode
}

export default function PixelWindow({ title, icon, accentColor = '#2255cc', onClose, children }: Props) {
  // Close on Escape
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position:'fixed', inset:0, background:'rgba(0,0,0,0.5)',
          zIndex:100, backdropFilter:'blur(1px)',
        }}
      />

      {/* Window */}
      <div
        className="px-window"
        onClick={e => e.stopPropagation()}
        style={{
          position:'fixed', zIndex:101,
          width:'min(97vw, 880px)',
          height:'min(93vh, 860px)',
          top:'50%', left:'50%',
          transform:'translate(-50%,-50%)',
          display:'flex', flexDirection:'column',
          animation:'windowAppearCenter 0.2s cubic-bezier(0.2, 0, 0, 1.3) forwards',
        }}
      >
        {/* Title bar */}
        <div
          className="px-title-bar"
          style={{
            background: `linear-gradient(180deg, ${accentColor}ee 0%, ${accentColor} 100%)`,
          }}
        >
          <span style={{ fontSize:14, flexShrink:0 }}>{icon}</span>
          <span className="px-title-text">{title}</span>

          <div style={{ display:'flex', gap:4, flexShrink:0 }}>
            {/* Minimize (decorative) */}
            <div style={{
              width:20, height:20, background:'#ffd700',
              border:'2px solid #0f0f23',
              display:'flex', alignItems:'flex-end', justifyContent:'center',
              paddingBottom:'2px', fontSize:10, color:'#0f0f23', fontWeight:'bold', cursor:'default',
            }}>_</div>
            {/* Close */}
            <button
              id="window-close-btn"
              className="px-close-btn"
              onClick={onClose}
              aria-label="Cerrar"
            >✕</button>
          </div>
        </div>

        {/* Menubar (decorative, pixel art style) */}
        <div style={{
          background:'#1a1a3a', borderBottom:'2px solid #0f0f23',
          padding:'3px 8px', display:'flex', gap:12, flexShrink:0,
        }}>
          {['Archivo','Ver','Ayuda'].map(m => (
            <span key={m} style={{ fontFamily:"'Press Start 2P',monospace", fontSize:6, color:'#808080', cursor:'default' }}>
              {m}
            </span>
          ))}
        </div>

        {/* Content */}
        <div className="px-window-body" style={{ flex:1 }}>
          {children}
        </div>

        {/* Status bar */}
        <div style={{
          background:'#111122', borderTop:'2px solid #0f0f23',
          padding:'3px 8px', display:'flex', alignItems:'center', gap:8, flexShrink:0,
        }}>
          <span style={{ fontFamily:"'VT323',monospace", fontSize:14, color:'#404060' }}>
            G&K Anniversary OS — {title}
          </span>
          <div style={{ flex:1 }}/>
          <span style={{ fontFamily:"'VT323',monospace", fontSize:14, color:'#404060' }}>ESC para cerrar</span>
        </div>
      </div>
    </>
  )
}
