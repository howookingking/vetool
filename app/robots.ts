import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/hospital/', '/on-boarding/', '/share/', '/api/'],
    },
    sitemap: 'https://vetool.co.kr/sitemap.xml',
  }
}
