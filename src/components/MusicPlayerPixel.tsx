'use client'
import { useState, useRef, useEffect } from 'react'
import { songs, type Song } from '@/data/songs'

function PixelVinyl({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div style={{ position: 'relative', width: 120, height: 120, margin: '0 auto' }}>
      {/* Glow */}
      <div style={{
        position: 'absolute', inset: -8, borderRadius: '50%',
        boxShadow: isPlaying
          ? '0 0 24px rgba(74,107,255,0.7), 0 0 48px rgba(74,107,255,0.3)'
          : '0 0 8px rgba(74,107,255,0.2)',
        transition: 'box-shadow 0.5s ease',
      }} />
      {/* Record body */}
      <div style={{
        width: '100%', height: '100%', borderRadius: '50%',
        background: 'repeating-radial-gradient(circle at center, #111 0px, #111 3px, #1a1a2e 3px, #1a1a2e 6px)',
        border: '3px solid #0f0f23',
        animation: isPlaying ? 'spin 3s linear infinite' : 'none',
        position: 'relative',
        boxShadow: '0 4px 0 #000',
      }}>
        {/* Center label */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 36, height: 36, borderRadius: '50%',
          background: 'linear-gradient(135deg, #2255cc, #4a6bff)',
          border: '2px solid #0f0f23',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Press Start 2P', monospace", fontSize: '6px', color: '#fff',
        }}>G&K</div>
        {/* Hole */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 8, height: 8, borderRadius: '50%',
          background: '#0f0f23',
        }} />
      </div>

      {/* Needle arm */}
      <div style={{
        position: 'absolute', top: 4, right: -8, width: 4, height: 54,
        background: 'linear-gradient(180deg, #ffd700, #c8a400)',
        transform: isPlaying ? 'rotate(28deg)' : 'rotate(8deg)',
        transformOrigin: 'top center',
        transition: 'transform 0.6s ease',
        border: '1px solid #0f0f23',
        boxShadow: '2px 2px 0 rgba(0,0,0,0.4)',
        borderRadius: '0 0 4px 4px',
      }}>
        <div style={{ position:'absolute', bottom: -4, left: -4, width: 10, height: 10, borderRadius: '50%', background: '#ffd700', border: '2px solid #0f0f23' }} />
      </div>
    </div>
  )
}

function FloatingNotes({ isPlaying }: { isPlaying: boolean }) {
  const [notes, setNotes] = useState<{ id: number; x: number; note: string }[]>([])
  useEffect(() => {
    if (!isPlaying) { setNotes([]); return }
    const symbols = ['♩','♪','♫','♬']
    const interval = setInterval(() => {
      setNotes(p => [...p.slice(-4), { id: Date.now(), x: Math.random() * 60 - 30, note: symbols[Math.floor(Math.random() * symbols.length)] }])
    }, 700)
    return () => clearInterval(interval)
  }, [isPlaying])
  return (
    <div style={{ height: 40, position: 'relative', pointerEvents: 'none' }}>
      {notes.map(n => (
        <span key={n.id} style={{
          position: 'absolute', bottom: 0,
          left: `calc(50% + ${n.x}px)`,
          color: '#ffd700', fontSize: 18, fontWeight: 'bold',
          animation: 'noteFloat 1.8s ease-out forwards',
        }}>{n.note}</span>
      ))}
    </div>
  )
}

export default function MusicPlayerPixel() {
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [activeTab, setActiveTab] = useState<'all' | 'gabi' | 'kevin'>('all')
  const audioRef = useRef<HTMLAudioElement>(null)

  const tabs = [
    { id: 'all' as const, label: '💙 ALL', color: '#2255cc' },
    { id: 'gabi' as const, label: '🌸 GABI', color: '#e05c95' },
    { id: 'kevin' as const, label: '🎸 KEVIN', color: '#c8a400' },
  ]

  const filtered = activeTab === 'all' ? songs
    : songs.filter(s => s.dedicatedBy === activeTab || s.dedicatedBy === 'ambos')

  const playSong = (song: Song) => {
    if (currentSong?.id === song.id) {
      if (!audioRef.current) return
      isPlaying ? audioRef.current.pause() : audioRef.current.play()
      setIsPlaying(!isPlaying)
      return
    }
    setCurrentSong(song)
    setProgress(0); setCurrentTime(0)
    setTimeout(() => {
      if (!audioRef.current) return
      audioRef.current.load()
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
    }, 60)
  }

  const nextSong = () => {
    const idx = songs.findIndex(s => s.id === currentSong?.id)
    playSong(songs[(idx + 1) % songs.length])
  }

  const fmt = (s: number) => `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}`

  return (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16, height: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span className="px-heading" style={{ fontSize: 10, color: '#ffd700' }}>♫ BANDA SONORA</span>
        <div className="px-divider-gold" style={{ flex: 1, margin: 0 }} />
      </div>

      {/* Player + list */}
      <div id="music-player-layout" style={{ display: 'flex', gap: 16, flex: 1, overflow: 'hidden' }}>

        {/* Vinyl + controls */}
        <div className="px-panel" style={{ minWidth: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <PixelVinyl isPlaying={isPlaying} />
          <FloatingNotes isPlaying={isPlaying} />

          {currentSong ? (
            <>
              <div style={{ textAlign: 'center' }}>
                <div className="px-label" style={{ color: '#ffd700', fontSize: 8 }}>{currentSong.title}</div>
                <div style={{ fontFamily: "'VT323',monospace", fontSize: 16, color: '#a0a0c0' }}>{currentSong.artist}</div>
                <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 10, color: '#606080', fontStyle: 'italic', marginTop: 2 }}>
                  "{currentSong.note}"
                </div>
              </div>

              {/* Progress */}
              <div style={{ width: '100%', cursor: 'pointer' }}
                onClick={e => {
                  if (!audioRef.current || !duration) return
                  const r = e.currentTarget.getBoundingClientRect()
                  audioRef.current.currentTime = ((e.clientX - r.left) / r.width) * duration
                }}
              >
                <div className="px-progress-track" style={{ width: '100%' }}>
                  <div className="px-progress-fill" style={{ width: `${progress}%` }} />
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', fontFamily:"'VT323',monospace", fontSize: 14, color:'#606080', marginTop: 2 }}>
                  <span>{fmt(currentTime)}</span><span>{fmt(duration)}</span>
                </div>
              </div>

              {/* Controls */}
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="px-btn px-btn-dark" style={{ padding: '6px 10px' }}
                  onClick={() => { const i = songs.findIndex(s=>s.id===currentSong?.id); playSong(songs[(i-1+songs.length)%songs.length]) }}>
                  ⏮
                </button>
                <button id="play-pause-btn" className="px-btn px-btn-gold" style={{ padding: '6px 14px' }}
                  onClick={() => {
                    if (!audioRef.current) return
                    isPlaying ? audioRef.current.pause() : audioRef.current.play()
                    setIsPlaying(!isPlaying)
                  }}>
                  {isPlaying ? '⏸' : '▶'}
                </button>
                <button id="next-song-btn" className="px-btn px-btn-dark" style={{ padding: '6px 10px' }}
                  onClick={nextSong}>⏭</button>
              </div>
            </>
          ) : (
            <div style={{ fontFamily:"'VT323',monospace", fontSize:18, color:'#606080', textAlign:'center' }}>
              Elige una canción<span className="blink">_</span>
            </div>
          )}

          <audio ref={audioRef}
            onTimeUpdate={() => {
              if (!audioRef.current) return
              setCurrentTime(audioRef.current.currentTime)
              setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100 || 0)
            }}
            onLoadedMetadata={() => audioRef.current && setDuration(audioRef.current.duration)}
            onEnded={nextSong}
          >
            {currentSong && <source src={currentSong.file} />}
          </audio>
        </div>

        {/* Song list */}
        <div id="music-player-list-container" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, minWidth: 200, overflow: 'hidden' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: 4 }}>
            {tabs.map(t => (
              <button key={t.id} id={`tab-${t.id}`}
                className="px-btn" style={{
                  flex: 1, padding: '6px 4px', fontSize: 7,
                  background: activeTab === t.id ? t.color : '#1a1a2e',
                  color: activeTab === t.id ? '#fff' : '#a0a0c0',
                  borderColor: t.color,
                }}
                onClick={() => setActiveTab(t.id as 'all' | 'gabi' | 'kevin')}
              >{t.label}</button>
            ))}
          </div>

          {/* List */}
          <div id="music-player-scroll" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {filtered.map((song, i) => {
              const active = currentSong?.id === song.id
              return (
                <button key={song.id} id={`song-${song.id}`}
                  onClick={() => playSong(song)}
                  style={{
                    display: 'flex', gap: 8, alignItems: 'flex-start', textAlign: 'left',
                    padding: '8px 10px', width: '100%', cursor: 'pointer',
                    background: active ? '#2255cc' : 'rgba(255,255,255,0.03)',
                    border: `2px solid ${active ? '#4a6bff' : '#1a2a4a'}`,
                    boxShadow: active ? '3px 3px 0 rgba(0,0,0,0.4)' : 'none',
                    transition: 'all 0.1s',
                  }}
                >
                  <span style={{ fontFamily:"'VT323',monospace", fontSize:16, color: active ? '#ffd700' : '#606080', minWidth: 20 }}>
                    {active && isPlaying ? '♫' : `${i+1}`}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily:"'Press Start 2P',monospace", fontSize:7, color: active ? '#fff' : '#d0d0f0', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', lineHeight: 1.8 }}>
                      {song.title}
                    </div>
                    <div style={{ fontFamily:"'VT323',monospace", fontSize:14, color: active ? '#c0d0ff' : '#606080', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                      {song.artist}
                    </div>
                    <div style={{ fontFamily:'Inter,sans-serif', fontSize:9, color: active ? '#aac0ff' : '#404060', fontStyle:'italic', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                      {song.note}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
      
      {/* Mobile styles */}
      <style>{`
        @media (max-width: 600px) {
          #music-player-layout {
            flex-direction: column !important;
            overflow-y: auto !important; /* allow the whole layout to scroll */
          }
          #music-player-list-container {
            overflow: visible !important; /* let the document scroll handle it */
          }
          #music-player-scroll {
            overflow-y: visible !important;
          }
        }
      `}</style>
    </div>
  )
}
