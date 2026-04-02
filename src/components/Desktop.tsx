'use client'
import { useState, useEffect } from 'react'
import DesktopBackground from './DesktopBackground'
import PixelWindow from './PixelWindow'
import MusicPlayerPixel from './MusicPlayerPixel'
import PhotoGallery from './PhotoGallery'
import LoveLetterPixel from './LoveLetterPixel'
import TimelinePixel from './TimelinePixel'
import GamesEasterEgg from './GamesEasterEgg'
import CleoWindow from './CleoWindow'

type WindowId = 'songs' | 'photos' | 'letter' | 'timeline' | 'games' | 'cleo'

interface FolderDef {
  id: WindowId
  label: string
  subLabel: string
  icon: string
  folderColor: string
  tabColor: string
  accentColor: string
  windowTitle: string
}

const FOLDERS: FolderDef[] = [
  { id:'songs',    label:'CANCIONES',   subLabel:'13 tracks',  icon:'🎵', folderColor:'#1a3388', tabColor:'#2a4aaa', accentColor:'#2255cc', windowTitle:'Nuestras Canciones' },
  { id:'photos',   label:'NUESTRAS',    subLabel:'24 fotos',    icon:'📸', folderColor:'#4a1a88', tabColor:'#6a3aaa', accentColor:'#9932cc', windowTitle:'Nuestros Momentos 📸' },
  { id:'letter',   label:'PARA GABI',   subLabel:'mensaje.txt', icon:'💌', folderColor:'#881633', tabColor:'#aa264a', accentColor:'#e05c95', windowTitle:'Lo Que Pienso de Ti' },
  { id:'timeline', label:'HISTORIA',    subLabel:'2025-2026',   icon:'🌹', folderColor:'#1a5533', tabColor:'#2a7a44', accentColor:'#2d7a2d', windowTitle:'Nuestra Historia' },
  { id:'games',    label:'EASTER EGGS', subLabel:'???',         icon:'🎮', folderColor:'#885500', tabColor:'#aa7700', accentColor:'#cc7700', windowTitle:'Easter Eggs 🎮' },
  { id:'cleo',     label:'CLEO.EXE',    subLabel:'~purring~',   icon:'🐱', folderColor:'#3a2a4a', tabColor:'#5a3a6a', accentColor:'#e05c95', windowTitle:'Cleo.exe' },
]

function PixelFolder({
  folder, onClick, visible, idx,
}: { folder: FolderDef; onClick: () => void; visible: boolean; idx: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      id={`folder-${folder.id}`}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(74,107,255,0.18)' : 'transparent',
        border: `2px solid ${hovered ? 'rgba(74,107,255,0.55)' : 'transparent'}`,
        display:'flex', flexDirection:'column', alignItems:'center', gap:6,
        padding:'8px 6px', cursor:'pointer',
        transition:'all 0.15s',
        transform: visible
          ? hovered ? 'translateY(-4px) scale(1.06)' : 'translateY(0) scale(1)'
          : 'translateY(20px) scale(0.8)',
        opacity: visible ? 1 : 0,
        transitionDelay: `${idx * 0.07}s`,
      }}
    >
      {/* Folder shape */}
      <div style={{ position:'relative', width:56, height:48 }}>
        {/* Tab */}
        <div style={{
          position:'absolute', top:-7, left:0, width:20, height:8,
          background: folder.tabColor, border:'2px solid #0f0f23', borderBottom:'none',
          transition:'background 0.15s',
        }}/>
        {/* Body */}
        <div style={{
          position:'absolute', inset:0,
          background: hovered ? `linear-gradient(135deg, ${folder.folderColor}, ${folder.tabColor})` : folder.folderColor,
          border:'3px solid #0f0f23',
          boxShadow: hovered
            ? `4px 4px 0 #0f0f23, 0 0 14px ${folder.accentColor}55`
            : '3px 3px 0 rgba(0,0,0,0.5)',
          display:'flex', alignItems:'center', justifyContent:'center',
          transition:'all 0.15s',
        }}>
          <span style={{ fontSize:22, filter: hovered ? 'drop-shadow(0 0 6px rgba(255,255,255,0.4))' : 'none', transition:'filter 0.15s' }}>
            {folder.icon}
          </span>
          {/* Shine */}
          <div style={{ position:'absolute', top:3, left:3, width:8, height:5, background:'rgba(255,255,255,0.12)' }}/>
        </div>
      </div>

      {/* Label */}
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:1 }}>
        <span style={{
          fontFamily:"'Press Start 2P',monospace", fontSize:7,
          color: hovered ? '#fff' : '#e0e0f0',
          textShadow:'1px 1px 0 #000,-1px 1px 0 #000,1px -1px 0 #000,-1px -1px 0 #000',
          maxWidth:72, lineHeight:1.6, textAlign:'center', wordBreak:'break-word',
          transition:'color 0.15s',
        }}>{folder.label}</span>
        <span style={{
          fontFamily:"'VT323',monospace", fontSize:13,
          color: hovered ? folder.accentColor : 'rgba(180,180,200,0.5)',
          textShadow:'1px 1px 0 #000', transition:'color 0.15s',
        }}>{folder.subLabel}</span>
      </div>
    </button>
  )
}

function WindowContent({ id }: { id: WindowId }) {
  switch (id) {
    case 'songs':    return <MusicPlayerPixel />
    case 'photos':   return <PhotoGallery />
    case 'letter':   return <LoveLetterPixel />
    case 'timeline': return <TimelinePixel />
    case 'games':    return <GamesEasterEgg />
    case 'cleo':     return <CleoWindow />
  }
}

function Taskbar({ openApps, activeApp, onToggle }: { openApps: WindowId[]; activeApp: WindowId | null; onToggle: (id: WindowId) => void }) {
  const [time, setTime] = useState('')
  const [daysTogether, setDaysTogether] = useState(0)

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('es-ES', { hour:'2-digit', minute:'2-digit' }))
      setDaysTogether(Math.floor((now.getTime() - new Date('2025-04-03').getTime()) / 86400000))
    }
    update()
    const iv = setInterval(update, 30000)
    return () => clearInterval(iv)
  }, [])

  return (
    <div className="px-taskbar" style={{ flexShrink:0, zIndex:20, position:'relative' }}>
      <button className="px-btn px-btn-blue" style={{ padding:'4px 8px', fontSize:7, flexShrink:0, gap:4 }}>
        💙 G&K
      </button>

      <div style={{ display:'flex', gap:4, flex:1, overflowX:'auto' }}>
        {openApps.map(id => {
          const f = FOLDERS.find(x => x.id === id)!
          const isActive = id === activeApp
          return (
            <button key={f.id} className="px-btn"
              onClick={() => onToggle(f.id)}
              style={{ padding:'3px 6px', fontSize:6, background: isActive ? '#1a3a6a' : '#111', borderColor: isActive ? '#4a6bff' : '#333', color:'#fff', flexShrink:0, borderBottomWidth: isActive ? 0 : 2, paddingTop: isActive ? 5 : 3 }}>
              {f.icon} {f.label}
            </button>
          )
        })}
      </div>

      <div style={{ display:'flex', alignItems:'center', gap:8, flexShrink:0 }}>
        <span className="heartbeat" style={{ color:'#e05c95', fontSize:12 }}>♡</span>
        <span style={{ fontFamily:"'VT323',monospace", fontSize:14, color:'#7b9ff9' }}>{daysTogether}d</span>
        <span style={{ fontFamily:"'Press Start 2P',monospace", fontSize:8, color:'#ffd700', minWidth:38, textAlign:'center' }}>{time}</span>
      </div>
    </div>
  )
}

function WelcomeMsg({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div style={{ position:'fixed', inset:0, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(0,0,0,0.6)', zIndex:90 }}
      onClick={onDismiss}>
      <div className="px-panel-gold window-appear" style={{ maxWidth:'min(90vw,400px)', padding:24, textAlign:'center' }}
        onClick={e => e.stopPropagation()}>
        <div style={{ fontSize:32, marginBottom:12 }} className="heartbeat">💙</div>
        <div className="px-heading" style={{ fontSize:9, color:'#ffd700', marginBottom:10, lineHeight:2 }}>BIENVENIDA, GABI</div>
        <div style={{ fontFamily:"'VT323',monospace", fontSize:18, color:'#c0c0e0', lineHeight:1.6, marginBottom:14 }}>
          Este escritorio es tuyo.<br/>Abre las carpetas para descubrir<br/>lo que este año fue para mí.
        </div>
        <div className="px-divider-gold"/>
        <div style={{ fontFamily:"'VT323',monospace", fontSize:15, color:'#606080', marginBottom:14 }}>3 de Abril, 2025 → 3 de Abril, 2026</div>
        <button className="px-btn px-btn-gold" style={{ fontSize:8 }} onClick={onDismiss}>▶ EXPLORAR</button>
      </div>
    </div>
  )
}

export default function Desktop() {
  const [openApps, setOpenApps] = useState<WindowId[]>([])
  const [activeApp, setActiveApp] = useState<WindowId | null>(null)
  const [showWelcome, setShowWelcome] = useState(true)
  const [foldersVisible, setFoldersVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setFoldersVisible(true), 100)
  }, [])

  const openApp = (id: WindowId) => {
    if (!openApps.includes(id)) setOpenApps(prev => [...prev, id])
    setActiveApp(id)
  }

  const closeApp = (id: WindowId) => {
    setOpenApps(prev => prev.filter(x => x !== id))
    if (activeApp === id) setActiveApp(null)
  }

  const toggleTaskbarApp = (id: WindowId) => {
    if (activeApp === id) setActiveApp(null) // minimize
    else setActiveApp(id) // restore
  }

  return (
    <div className="desktop-in" style={{
      width:'100vw', height:'100dvh', display:'flex', flexDirection:'column',
      position:'relative', overflow:'hidden',
    }}>
      <DesktopBackground />

      {/* Desktop area */}
      <div style={{ flex:1, position:'relative', zIndex:10, overflow:'hidden', display:'flex', flexDirection:'column', justifyContent:'flex-start', alignItems:'center' }}>

        {/* Title */}
        <div style={{
          fontFamily:"'Press Start 2P',monospace", fontSize:7,
          color:'rgba(255,255,255,0.25)', userSelect:'none', marginTop:10,
          textShadow:'1px 1px 0 rgba(0,0,0,0.5)',
        }}>
          GABI-OS — Anniversary Edition
        </div>

        {/* Folder grid — centered, responsive */}
        <div id="desktop-folders" style={{
          display:'grid',
          gridTemplateColumns:'repeat(3, 90px)',
          gap:'12px 16px',
          marginTop:30, /* pushed down a bit to be more centered */
          justifyItems:'center',
        }}>
          {FOLDERS.map((f,i) => (
            <PixelFolder key={f.id} folder={f} idx={i} visible={foldersVisible} onClick={() => openApp(f.id)} />
          ))}
        </div>
      </div>

      {/* Taskbar */}
      <Taskbar openApps={openApps} activeApp={activeApp} onToggle={toggleTaskbarApp} />

      {/* Window */}
      {activeApp && (() => {
        const folder = FOLDERS.find(f => f.id === activeApp)!
        return (
          <PixelWindow 
            title={folder.windowTitle} 
            icon={folder.icon} 
            accentColor={folder.accentColor} 
            onClose={() => closeApp(activeApp)}
            onMinimize={() => setActiveApp(null)}
          >
            <WindowContent id={activeApp} />
          </PixelWindow>
        )
      })()}

      {/* Welcome */}
      {showWelcome && <WelcomeMsg onDismiss={() => setShowWelcome(false)} />}

      {/* Responsive style overrides */}
      <style>{`
        @media (max-width: 480px) {
          /* 2-column grid on small phones, pushed down to center, larger gaps */
          #desktop-folders { 
            grid-template-columns: repeat(2, 100px) !important; 
            gap: 20px 24px !important;
            margin-top: 40px !important;
          }
        }
      `}</style>
    </div>
  )
}
