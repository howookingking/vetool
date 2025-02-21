import HomepageFooter from '@/components/company/footer/hompage-footer'
import HomepageHeader from '@/components/company/header/homepage-header'
import ScrollToTopButton from '@/components/company/ui/scroll-to-top-button'
import ChatWidget from '@/components/company/ui/chat/chat-widget'
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
      <ChatWidget />
      <ScrollToTopButton />
    </div>
  )
}
