import StatsContent from '@/components/company/main/stats/stats-content'
import StatsCounts from '@/components/company/main/stats/stats-counts'
import StatsTitle from '@/components/company/main/stats/stats-title'
import StatsMockupImage from '@/components/company/main/stats/ui/stats-mockup-image'
import Section from '../section'

export default async function StatsSection() {
  return (
    <Section id="stats" className="flex flex-col" isEven>
      <StatsTitle />
      <StatsCounts />

      <div className="flex flex-col items-center gap-12 xl:flex-row xl:gap-24">
        <StatsMockupImage />
        <StatsContent />
      </div>
    </Section>
  )
}
