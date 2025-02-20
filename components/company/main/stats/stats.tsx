import StatsCounts from '@/components/company/main/stats/stats-counts'
import StatsContent from '@/components/company/main/stats/stats-content'
import StatsMockupImage from '@/components/company/main/stats/ui/stats-mockup-image'
import StatsTitle from '@/components/company/main/stats/stats-title'

export default function Stats() {
  return (
    <div
      id="stats"
      className="flex h-company flex-col bg-emerald-50/10 px-8 py-16"
    >
      <StatsTitle />
      <StatsCounts />

      <div className="flex h-full flex-col items-center md:gap-32 xl:flex-row xl:gap-8">
        <StatsMockupImage />
        <StatsContent />
      </div>
    </div>
  )
}
