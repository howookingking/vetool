import DesktopMockupScreen from '@/components/company/hero/mockup/desktop/desktop-mockup-screen'
import HeroContent from '@/components/company/hero/hero-content'
import HeroLogos from '@/components/company/hero/hero-logos'

export default function Hero() {
  return (
    <section className="flex h-[calc(100vh-80px)] flex-col justify-between pt-16">
      <div className="flex h-full flex-col items-center gap-16">
        <HeroContent />
        <DesktopMockupScreen />
      </div>

      <HeroLogos />
    </section>
  )
}
