import VetoolLogo from '@/components/common/vetool-logo'
import IcuShareDatePicker from '@/components/hospital/share/header/icu-share-date-picker'
import IcuSharePatientInfo from '@/components/hospital/share/header/icu-share-patient-info'
import type { SelectedChart } from '@/types/icu/chart'
import Link from 'next/link'
import HighlightGuide from '@/components/ui/highlight-guide'
import { SHARE_GUIDE_STEPS } from '@/constants/hospital/share'

export default function IcuShareHeader({
  targetDate,
  chartData,
}: {
  targetDate: string
  chartData: Omit<SelectedChart, 'orders'>
}) {
  const { patient, weight, weight_measured_date } = chartData

  return (
    <div className="relative flex flex-col gap-4 2xl:grid 2xl:grid-cols-3 2xl:items-center 2xl:gap-0">
      <div className="flex h-9 items-center 2xl:gap-8">
        <Link href="/" className="absolute left-2 w-16 sm:w-auto">
          <VetoolLogo />
        </Link>
        <IcuShareDatePicker targetDate={targetDate} />
      </div>

      <IcuSharePatientInfo
        patientData={patient}
        weight={weight}
        weightMeasuredDate={weight_measured_date as string}
      />

      <HighlightGuide
        steps={SHARE_GUIDE_STEPS}
        className="absolute right-0 top-0"
      />
    </div>
  )
}
