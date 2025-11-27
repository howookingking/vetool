import HeroContent from '@/components/company/main/hero/hero-content'
import HeroLogos from '@/components/company/main/hero/hero-logos'
import DesktopMockupScreen from './mockup/desktop-mockup-screen'

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex h-[calc(100svh-64px)] flex-col justify-between bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-50 via-white to-white"
    >
      <HeroContent />

      <div className="absolute bottom-0 z-20 w-screen">
        <DesktopMockupScreen />
        <HeroLogos />
      </div>
    </section>
  )
}
