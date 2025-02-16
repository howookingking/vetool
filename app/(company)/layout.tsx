import HomepageFooter from '@/components/company/footer/hompage-footer'
import HomepageHeader from '@/components/company/header/homepage-header'

export default function HompageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative">
      <HomepageHeader />
      <main>{children}</main>
      <HomepageFooter />
    </div>
  )
}
