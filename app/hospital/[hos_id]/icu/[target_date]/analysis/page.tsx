import MobileTitle from '@/components/common/mobile-title'
import IcuAnalysisEntry from '@/components/hospital/icu/main/analysis/icu-analysis-entry'
import { BarChartHorizontalIcon } from 'lucide-react'

export default async function AnalysisPage() {
  return (
    <>
      <MobileTitle icon={BarChartHorizontalIcon} title="통계" />

      <IcuAnalysisEntry />
    </>
  )
}
