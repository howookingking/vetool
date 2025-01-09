import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'VETOOL',
    short_name: 'VETOOL',
    description: '수의사 전문차트 서비스',
    start_url: '/',
    display: 'standalone',
    background_color: '#15B797',
    lang: 'ko',
    id: '/',
    theme_color: '#15B797',
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
