import HeroContent from '@/components/company/main/hero/hero-content'
import HeroLogos from '@/components/company/main/hero/hero-logos'
import DesktopMockupScreen from '@/components/company/main/hero/mockup/desktop/desktop-mockup-screen'
import MobileMockupScreen from '@/components/company/main/hero/mockup/mobile/mobile-mockup-screen'

export default function Hero() {
  return (
    <section id="hero" className="flex h-company flex-col justify-between pt-8">
      <div className="flex h-[calc(100%-80px)] flex-col items-center gap-16">
        <HeroContent />

        <DesktopMockupScreen />
        <MobileMockupScreen />
      </div>

      <HeroLogos />
    </section>
  )
}
