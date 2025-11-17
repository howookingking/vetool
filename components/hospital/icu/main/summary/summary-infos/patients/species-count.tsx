import type { SummaryData } from '@/types/icu/summary'
import { CatIcon, DogIcon } from 'lucide-react'

export default function SpeciesCount({
  summaryData,
}: {
  summaryData: SummaryData[]
}) {
  const canineCount = summaryData.filter(
    (item) => item.patient.species === 'canine',
  ).length
  return (
    <div className="absolute right-8 top-6">
      <div className="flex items-center gap-2">
        <DogIcon size={16} />
        <span className="text-lg">{canineCount}</span>
      </div>

      <div className="flex items-center gap-2">
        <CatIcon size={16} />
        <span className="text-lg">{summaryData.length - canineCount}</span>
      </div>
    </div>
  )
}
