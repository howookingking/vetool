import { SummaryData } from '@/types/icu/summary'
import MainVet from './main-vet'
import Patients from './patients/patients'
import Urgency from './urgency'

type Props = {
  summaryData: SummaryData[]
  targetDate: string
  prevSummaryCount: number
}

export default function SummaryInfos({
  summaryData,
  targetDate,
  prevSummaryCount,
}: Props) {
  return (
    <div className="hidden grid-cols-3 gap-2 xl:grid">
      <Patients
        summaryData={summaryData}
        targetDate={targetDate}
        prevSummaryCount={prevSummaryCount}
      />

      <Urgency summaryData={summaryData} />

      <MainVet summaryData={summaryData} />
    </div>
  )
}
