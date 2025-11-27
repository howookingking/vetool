import StatsContent from '@/components/company/main/stats/stats-content'
import StatsCounts from '@/components/company/main/stats/stats-counts'
import StatsMockupImage from '@/components/company/main/stats/ui/stats-mockup-image'
import Section from '../section'
import SectionTitle from '../section-title'

export default async function StatsSection() {
  return (
    <Section id="stats" className="flex flex-col">
      <SectionTitle className="text-center">
        벳툴과 함께 <br /> 업무 효율을 높여보세요
      </SectionTitle>
      <StatsCounts />

      <div className="flex flex-col items-center gap-12 xl:flex-row xl:gap-24">
        <StatsMockupImage />
        <StatsContent />
      </div>
    </Section>
  )
}
