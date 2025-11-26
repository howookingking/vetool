import StatsContent from '@/components/company/main/stats/stats-content'
import StatsCounts from '@/components/company/main/stats/stats-counts'
import StatsTitle from '@/components/company/main/stats/stats-title'
import StatsMockupImage from '@/components/company/main/stats/ui/stats-mockup-image'

export default function StatsSection() {
  return (
    <section
      id="stats"
      className="flex h-company flex-col bg-slate-50 px-8 py-24"
    >
      <StatsTitle />
      <StatsCounts />

      <div className="flex h-full flex-col items-center md:gap-32 xl:flex-row xl:gap-8">
        <StatsMockupImage />
        <StatsContent />
      </div>
    </section>
  )
}
