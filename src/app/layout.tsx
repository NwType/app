import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GABI-OS — Anniversary Edition 💙',
  description: 'Un año contigo, Gabi. Hecho con amor por Kevin.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
        {children}
      </body>
    </html>
  )
}
