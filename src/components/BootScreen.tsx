'use client'
import { useEffect, useState } from 'react'

const BOOT_LINES = [
  { text: 'GABI-OS Version 1.0 — ANNIVERSARY EDITION', delay: 300, color: '#ffd700' },
  { text: '(c) 2025-2026 Kevin & Gabi  All Rights Reserved.', delay: 500, color: '#a0a0c0' },
  { text: '', delay: 700, color: '' },
  { text: 'Inicializando hardware...', delay: 900, color: '#f0f0f0' },
  { text: '[  OK  ] Cargando recuerdos compartidos...', delay: 1200, color: '#55c57a' },
  { text: '[  OK  ] Iniciando módulo del corazón...', delay: 1600, color: '#55c57a' },
  { text: '[  OK  ] Cargando 365 días juntos...', delay: 2000, color: '#55c57a' },
  { text: '[  OK  ] Deftones + Boa activados...', delay: 2400, color: '#55c57a' },
  { text: '[  OK  ] Karaoke engine iniciado...', delay: 2700, color: '#55c57a' },
  { text: '[  OK  ] Importando fotos (/home/kevin/nosotros)...', delay: 3000, color: '#55c57a' },
  { text: '[  OK  ] Cleo.exe encontrado — purring...', delay: 3350, color: '#ff9ec4' },
  { text: '[  OK  ] Hollow Knight, Fallout, L4D cargados...', delay: 3700, color: '#55c57a' },
  { text: '', delay: 4000, color: '' },
  { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', delay: 4100, color: '#ffd700' },
  { text: '  FELIZ ANIVERSARIO, GABI  💙', delay: 4300, color: '#ff9ec4' },
  { text: '  3 Abril 2025  →  3 Abril 2026', delay: 4500, color: '#7b9ff9' },
  { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', delay: 4700, color: '#ffd700' },
  { text: '', delay: 4900, color: '' },
]

interface Props {
  onComplete: () => void
}

export default function BootScreen({ onComplete }: Props) {
  const [visible, setVisible] = useState(false)
  const [lines, setLines] = useState<number>(0)
  const [showPrompt, setShowPrompt] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 200)
    BOOT_LINES.forEach((_, i) => {
      setTimeout(() => setLines(i + 1), BOOT_LINES[i].delay)
    })
    setTimeout(() => setShowPrompt(true), 5200)
  }, [])

  const handleClick = () => {
    if (!showPrompt) return
    setFadeOut(true)
    setTimeout(onComplete, 600)
  }

  return (
    <div
      className={`crt fixed inset-0 flex flex-col items-center justify-center cursor-pointer select-none ${
        fadeOut ? 'boot-fade-out' : visible ? 'crt-flicker' : ''
      }`}
      style={{ background: '#000', zIndex: 200 }}
      onClick={handleClick}
    >
      <div
        className="w-full max-w-3xl px-6 py-8"
        style={{ fontFamily: "'VT323', monospace", fontSize: '18px', lineHeight: '1.5' }}
      >
        {BOOT_LINES.slice(0, lines).map((line, i) => (
          <div
            key={i}
            style={{ color: line.color || '#f0f0f0', minHeight: '1.5em' }}
          >
            {line.text}
          </div>
        ))}

        {showPrompt && (
          <div className="mt-6" style={{ color: '#ffd700' }}>
            <span>{'>'} </span>
            <span style={{ color: '#fff' }}>HAZ CLICK EN CUALQUIER PARTE PARA CONTINUAR</span>
            <span className="blink" style={{ color: '#ffd700' }}>_</span>
          </div>
        )}
      </div>
    </div>
  )
}
