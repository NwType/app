'use client'
import { useState } from 'react'
import BootScreen from '@/components/BootScreen'
import Desktop from '@/components/Desktop'

export default function Home() {
  const [phase, setPhase] = useState<'boot' | 'desktop'>('boot')

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', background: '#0f0f23' }}>
      {phase === 'boot' && (
        <BootScreen onComplete={() => setPhase('desktop')} />
      )}
      {phase === 'desktop' && (
        <Desktop />
      )}
    </div>
  )
}
