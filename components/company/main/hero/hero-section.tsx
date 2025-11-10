import HeroContent from '@/components/company/main/hero/hero-content'
import HeroLogos from '@/components/company/main/hero/hero-logos'
import DesktopMockupScreen from './mockup/desktop-mockup-screen'

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex h-company flex-col justify-between"
    >
      <HeroContent />

      <div className="flex flex-col items-center">
        <DesktopMockupScreen />
        <HeroLogos />
      </div>
    </section>
  )
}
