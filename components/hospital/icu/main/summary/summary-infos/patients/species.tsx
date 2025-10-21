import type { SummaryData } from '@/types/icu/summary'
import { CatIcon, DogIcon } from 'lucide-react'

export default function Species({
  summaryData,
}: {
  summaryData: SummaryData[]
}) {
  const canineCount = summaryData.filter(
    (item) => item.patient.species === 'canine',
  ).length
  return (
    <div className="absolute right-12 top-8">
      <div className="flex items-center gap-4">
        <DogIcon size={20} />
        <span className="text-xl">{canineCount}</span>
      </div>

      <div className="flex items-center gap-4">
        <CatIcon size={20} />
        <span className="text-xl">{summaryData.length - canineCount}</span>
      </div>
    </div>
  )
}
