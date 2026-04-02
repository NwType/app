'use client'
import { useState, useRef, useEffect } from 'react'
import { songs, type Song } from '@/data/songs'

function VinylRecord({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div className="relative w-48 h-48 mx-auto select-none">
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-full transition-all duration-700"
        style={{
          boxShadow: isPlaying
            ? '0 0 40px rgba(106,143,212,0.5), 0 0 80px rgba(106,143,212,0.2)'
            : '0 0 15px rgba(106,143,212,0.15)',
        }}
      />

      {/* Vinyl disk */}
      <div
        className="w-full h-full rounded-full vinyl-record"
        style={{
          animation: isPlaying ? 'spin 4s linear infinite' : 'none',
        }}
      >
        {/* Grooves overlay */}
        <div className="absolute inset-0 rounded-full" style={{
          background: 'repeating-radial-gradient(circle at center, transparent 20px, rgba(106,143,212,0.05) 22px, transparent 24px)',
        }} />

        {/* Label center */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ top: '30%', left: '30%', width: '40%', height: '40%' }}
        >
          <div className="w-full h-full rounded-full flex items-center justify-center"
            style={{
              background: 'radial-gradient(circle, #1a2d5a, #0a0f1e)',
              border: '1px solid rgba(201,169,110,0.3)',
            }}
          >
            <span className="text-gold-vintage text-[8px] font-serif text-center leading-tight px-1">
              G&K
            </span>
          </div>
        </div>

        {/* Center hole */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-midnight border border-sapphire-mid" />
        </div>
      </div>

      {/* Needle arm */}
      <div
        className="absolute top-2 right-0 w-1 h-16 rounded-full origin-top transition-all duration-700"
        style={{
          background: 'linear-gradient(to bottom, #c9a96e, #a07845)',
          transform: isPlaying ? 'rotate(25deg) translateX(-10px)' : 'rotate(5deg)',
          transformOrigin: 'top right',
          right: '-4px',
        }}
      >
        <div className="w-2 h-2 rounded-full bg-gold-vintage absolute -bottom-1 -left-0.5" />
      </div>
    </div>
  )
}

function MusicNote({ isPlaying }: { isPlaying: boolean }) {
  const notes = ['♩', '♪', '♫', '♬', '𝅘𝅥𝅮']
  const [floatingNotes, setFloatingNotes] = useState<{ id: number; x: number; note: string }[]>([])

  useEffect(() => {
    if (!isPlaying) { setFloatingNotes([]); return }
    const interval = setInterval(() => {
      setFloatingNotes(prev => [
        ...prev.slice(-5),
        { id: Date.now(), x: Math.random() * 60 - 30, note: notes[Math.floor(Math.random() * notes.length)] },
      ])
    }, 600)
    return () => clearInterval(interval)
  }, [isPlaying])

  return (
    <div className="relative h-24 w-48 mx-auto overflow-hidden pointer-events-none">
      {floatingNotes.map(n => (
        <span
          key={n.id}
          className="absolute bottom-0 text-gold-vintage text-xl"
          style={{
            left: `calc(50% + ${n.x}px)`,
            animation: 'noteFloat 2s ease-out forwards',
          }}
        >
          {n.note}
        </span>
      ))}
      <style>{`
        @keyframes noteFloat {
          0% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-80px) scale(0.5); }
        }
      `}</style>
    </div>
  )
}

export default function MusicPlayer() {
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [activeTab, setActiveTab] = useState<'gabi' | 'kevin' | 'ambos'>('ambos')
  const audioRef = useRef<HTMLAudioElement>(null)

  const tabs = [
    { id: 'ambos' as const, label: '💙 Juntos', emoji: '🎤' },
    { id: 'gabi' as const, label: 'De Gabi', emoji: '🌸' },
    { id: 'kevin' as const, label: 'De Kevin', emoji: '🎸' },
  ]

  const filteredSongs = activeTab === 'ambos'
    ? songs
    : songs.filter(s => s.dedicatedBy === activeTab || s.dedicatedBy === 'ambos')

  const playSong = (song: Song) => {
    if (currentSong?.id === song.id) {
      if (audioRef.current) {
        if (isPlaying) { audioRef.current.pause(); setIsPlaying(false) }
        else { audioRef.current.play(); setIsPlaying(true) }
      }
      return
    }
    setCurrentSong(song)
    setProgress(0)
    setCurrentTime(0)
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.load()
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
      }
    }, 50)
  }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    audioRef.current.currentTime = ratio * duration
  }

  const nextSong = () => {
    const idx = songs.findIndex(s => s.id === currentSong?.id)
    const next = songs[(idx + 1) % songs.length]
    playSong(next)
  }

  const prevSong = () => {
    const idx = songs.findIndex(s => s.id === currentSong?.id)
    const prev = songs[(idx - 1 + songs.length) % songs.length]
    playSong(prev)
  }

  const dedicatedByLabel = (d: Song['dedicatedBy']) => {
    if (d === 'ambos') return { text: 'Ambos', color: 'text-sapphire-glow' }
    if (d === 'gabi') return { text: 'Gabi →Kevin', color: 'text-rose-soft' }
    return { text: 'Kevin → Gabi', color: 'text-gold-vintage' }
  }

  return (
    <section id="songs" className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 section-reveal">
          <p className="font-mono text-sapphire-glow text-xs tracking-[0.3em] uppercase mb-3">✦ nuestra banda sonora ✦</p>
          <h2 className="font-serif text-5xl md:text-6xl text-gold-vintage text-glow mb-4">Nuestras Canciones</h2>
          <div className="ornament-divider max-w-xs mx-auto">
            <span className="text-gold-vintage text-sm">♬</span>
          </div>
          <p className="font-serif italic text-parchment/70 text-lg">
            Las melodías que pintaron este año juntos
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start max-w-4xl mx-auto">
          {/* Vinyl player left */}
          <div className="glass-card p-8 flex flex-col items-center sticky top-24">
            <VinylRecord isPlaying={isPlaying} />
            <MusicNote isPlaying={isPlaying} />

            {currentSong ? (
              <div className="text-center w-full mt-2">
                <h3 className="font-serif text-xl text-parchment font-semibold">{currentSong.title}</h3>
                <p className="font-mono text-sapphire-glow text-sm">{currentSong.artist}</p>
                <p className="font-serif italic text-parchment/50 text-xs mt-2 px-4">"{currentSong.note}"</p>

                {/* Progress */}
                <div className="mt-4 w-full">
                  <div
                    className="w-full h-1 bg-sapphire-deep rounded-full cursor-pointer"
                    onClick={handleSeek}
                  >
                    <div className="progress-bar" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="flex justify-between font-mono text-xs text-parchment/40 mt-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-6 mt-4">
                  <button id="prev-song-btn" onClick={prevSong} className="text-parchment/60 hover:text-gold-vintage transition-colors text-xl">⏮</button>
                  <button
                    id="play-pause-btn"
                    onClick={() => {
                      if (!audioRef.current) return
                      if (isPlaying) { audioRef.current.pause(); setIsPlaying(false) }
                      else { audioRef.current.play(); setIsPlaying(true) }
                    }}
                    className="w-12 h-12 rounded-full flex items-center justify-center text-midnight font-bold text-lg transition-transform hover:scale-110"
                    style={{ background: 'linear-gradient(135deg, #c9a96e, #e8c98a)' }}
                  >
                    {isPlaying ? '⏸' : '▶'}
                  </button>
                  <button id="next-song-btn" onClick={nextSong} className="text-parchment/60 hover:text-gold-vintage transition-colors text-xl">⏭</button>
                </div>
              </div>
            ) : (
              <div className="text-center mt-4">
                <p className="font-serif italic text-parchment/40">Elige una canción...</p>
              </div>
            )}

            <audio
              ref={audioRef}
              onTimeUpdate={() => {
                if (!audioRef.current) return
                setCurrentTime(audioRef.current.currentTime)
                setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100 || 0)
              }}
              onLoadedMetadata={() => {
                if (audioRef.current) setDuration(audioRef.current.duration)
              }}
              onEnded={nextSong}
            >
              {currentSong && <source src={currentSong.file} />}
            </audio>
          </div>

          {/* Song list right */}
          <div>
            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex-1 py-2 px-3 rounded-lg font-mono text-xs tracking-wider uppercase transition-all duration-300"
                  style={{
                    background: activeTab === tab.id
                      ? 'linear-gradient(135deg, #1a2d5a, #2e4a8c)'
                      : 'rgba(26,45,90,0.2)',
                    border: `1px solid ${activeTab === tab.id ? 'rgba(201,169,110,0.5)' : 'rgba(201,169,110,0.1)'}`,
                    color: activeTab === tab.id ? '#c9a96e' : '#f5e6c8aa',
                  }}
                >
                  {tab.emoji} {tab.label}
                </button>
              ))}
            </div>

            {/* Songs */}
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
              {filteredSongs.map((song, i) => {
                const isActive = currentSong?.id === song.id
                const label = dedicatedByLabel(song.dedicatedBy)
                return (
                  <button
                    key={song.id}
                    id={`song-${song.id}`}
                    onClick={() => playSong(song)}
                    className="w-full text-left rounded-xl p-4 transition-all duration-300 group"
                    style={{
                      background: isActive
                        ? 'linear-gradient(135deg, rgba(46,74,140,0.6), rgba(26,45,90,0.8))'
                        : 'rgba(26,45,90,0.25)',
                      border: `1px solid ${isActive ? 'rgba(201,169,110,0.5)' : 'rgba(201,169,110,0.1)'}`,
                      boxShadow: isActive ? '0 0 20px rgba(106,143,212,0.2)' : 'none',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-gold-vintage/40 font-mono text-xs w-5 text-center">{i + 1}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-serif text-parchment truncate font-medium group-hover:text-gold-vintage transition-colors">
                            {isActive && isPlaying ? '♫ ' : ''}{song.title}
                          </p>
                        </div>
                        <p className="font-mono text-xs text-sapphire-glow/70 truncate">{song.artist}</p>
                      </div>
                      <span className={`text-[10px] font-mono ${label.color} shrink-0`}>{label.text}</span>
                    </div>
                    <p className="font-serif italic text-parchment/40 text-xs mt-1 pl-8 truncate">
                      "{song.note}"
                    </p>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
