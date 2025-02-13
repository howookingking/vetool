import Hero from '@/components/company/hero/hero'
import HomepageHeader from '@/components/company/homepage-header'
import React from 'react'

export default function HompageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <HomepageHeader />
      <Hero />
      <main>{children}</main>
    </div>
  )
}
