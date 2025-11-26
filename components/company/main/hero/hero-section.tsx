import HeroContent from '@/components/company/main/hero/hero-content'
import HeroLogos from '@/components/company/main/hero/hero-logos'
import DesktopMockupScreen from './mockup/desktop-mockup-screen'

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex flex-col justify-between bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-50 via-white to-white"
    >
      <HeroContent />

      <div className="flex flex-col items-center">
        <DesktopMockupScreen />
        <HeroLogos />
      </div>
    </section>
  )
}
