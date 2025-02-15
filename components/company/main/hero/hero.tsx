import DesktopMockupScreen from '@/components/company/main/hero/mockup/desktop/desktop-mockup-screen'
import HeroContent from '@/components/company/main/hero/hero-content'
import HeroLogos from '@/components/company/main/hero/hero-logos'

export default function Hero() {
  return (
    <section className="flex h-[calc(100vh-96px)] flex-col justify-between py-8">
      <div className="flex h-full flex-col items-center gap-16">
        <HeroContent />
        <DesktopMockupScreen />
      </div>

      <HeroLogos />
    </section>
  )
}
