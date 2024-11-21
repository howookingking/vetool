import { Toaster } from '@/components/ui/toaster'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'VETOOL - 벳툴',
  description: '수의사 전문차트 서비스',
}

export const viewport: Viewport = {
  width: 'device-width',
  userScalable: true,
  initialScale: 1,
  minimumScale: 0.5,
  maximumScale: 2,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  )
}
