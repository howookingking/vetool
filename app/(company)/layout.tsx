import HomepageFooter from '@/components/company/footer/hompage-footer'
import HomepageHeader from '@/components/company/header/homepage-header'
import OpenKakao from '@/components/company/ui/open-kakao'
import ScrollToTopButton from '@/components/company/ui/scroll-to-top-button'

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
      <ScrollToTopButton />
      <OpenKakao />
    </div>
  )
}
