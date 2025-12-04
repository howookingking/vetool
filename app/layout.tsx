import { Toaster } from '@/components/ui/sonner'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
  title: '벳툴 | VETOOL',
  description: '동물병원 전문차트 서비스',
  openGraph: {
    siteName: '벳툴 | VETOOL',
    title: '벳툴 | VETOOL',
    description: '동물병원 전문차트 서비스',
    url: process.env.NEXT_PUBLIC_APP_URL!,
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'SITE OPENGRAPH IMAGE',
      },
    ],
  },
  keywords: ['동물병원', '전문차트', '수의사', 'VETOOL'],
  twitter: {
    card: 'summary_large_image',
    title: '벳툴 | VETOOL',
    description: '동물병원 전문차트 서비스',
    images: [
      {
        url: '/opengraph-image.png',
        alt: 'SITE OPENGRAPH IMAGE',
      },
    ],
  },
  authors: [{ name: 'howoo', url: process.env.NEXT_PUBLIC_APP_URL! }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL!,
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
