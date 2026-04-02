'use client'

export default function CleoWindow() {
  const catAscii = `
   /\\  /\\
  ( o  o )
  =( Y )=
    )   (
   (_)-(_)
  `

  return (
    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center', height: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, alignSelf: 'stretch', flexShrink: 0 }}>
        <span className="px-heading" style={{ fontSize: 9, color: '#ff9ec4' }}>🐱 CLEO.EXE</span>
        <div style={{ flex: 1, height: 3, background: 'repeating-linear-gradient(90deg,#ff9ec4 0px,#ff9ec4 4px,transparent 4px,transparent 8px)' }} />
      </div>

      {/* Cat display */}
      <div className="px-panel-pink" style={{ textAlign: 'center', padding: 24 }}>
        <pre style={{
          fontFamily: "'VT323',monospace", fontSize: 22, color: '#ff9ec4',
          lineHeight: 1.6, letterSpacing: 2, userSelect: 'none',
        }}>
          {`   /\\_____/\\
  /  o   o  \\
 ( ==  ^  == )
   )         (
  (  Cleo    )
 (_(siamese)_)`}
        </pre>
        <div style={{
          marginTop: 12, fontFamily: "'Press Start 2P',monospace", fontSize: 8,
          color: '#ffd700', lineHeight: 2,
        }}>
          CLEO v1.0 — Miau...
        </div>
        <div className="blink" style={{ color: '#ff9ec4', fontFamily: "'VT323',monospace", fontSize: 22 }}>
          ♡ miau miau miau ♡
        </div>
      </div>

      {/* Messages */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignSelf: 'stretch' }}>
        {[
          { icon: '🐾', text: 'Cleoooooo.', color: '#ff9ec4' },
          { icon: '👑', text: 'La Mishi que siempre te acompaña.', color: '#ffd700' },
          { icon: '💙', text: 'Los gatos te eligen a ti igual que yo. Eso dice todo.', color: '#7b9ff9' },
          { icon: '🎮', text: 'Aunque te haga renegar esta ahi', color: '#55c57a' },
        ].map((item, i) => (
          <div key={i} className="px-panel" style={{ borderColor: item.color, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
            <span style={{ fontFamily: 'Inter,sans-serif', fontSize: 12, color: '#c0c0e0', fontStyle: 'italic', lineHeight: 1.6 }}>
              {item.text}
            </span>
          </div>
        ))}
      </div>

      {/* Fun fact */}
      <div style={{
        fontFamily: "'VT323',monospace", fontSize: 16, color: '#606080', textAlign: 'center', flexShrink: 0,
      }}>
        {'>'} fun_fact: Cleo.exe consume 87% del love.dll disponible.
      </div>
    </div>
  )
}
