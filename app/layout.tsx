import { Toaster } from '@/components/ui/sonner'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'VETOOL - 벳툴',
  description: '동물병원 전문차트 서비스',
  openGraph: {
    title: '벳툴',
    description: '동물병원 전문차트 서비스',
    url: 'https://vetool.co.kr',
    images: [
      {
        url: 'https://vetool.co.kr/opengraph-image.png',
        width: 1200,
        height: 630,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '벳툴',
    description: '동물병원 전문차트 서비스',
    images: ['https://vetool.co.kr/opengraph-image.png'],
  },
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
        <Analytics />
        <Toaster richColors />
      </body>
    </html>
  )
}
