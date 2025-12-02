import { Toaster } from '@/components/ui/sonner'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'VETOOL - 벳툴',
  description: '동물병원 전문차트 서비스',
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
        <Toaster richColors />
        <Analytics />
      </body>
    </html>
  )
}
