import VetoolLogo from '@/components/common/vetool-logo'
import IcuShareDateSelector from '@/components/hospital/share/header/icu-share-date-selector'
import IcuSharePatientInfo from '@/components/hospital/share/header/icu-share-patient-info'
import { checkIfUserIsVisitor } from '@/lib/services/icu/share'
import { type SelectedChart } from '@/types/icu/chart'
import Link from 'next/link'
import VitalChartDialog from '../../icu/main/chart/selected-chart/chart-header/header-center/vital-chart/vital-chart-dialog'

type IcuShaerHeaderProps = {
  targetDate: string
  chartData: SelectedChart
}

export default async function IcuShareHeader({
  targetDate,
  chartData,
}: IcuShaerHeaderProps) {
  const isVistor = await checkIfUserIsVisitor()

  const { patient, weight, weight_measured_date } = chartData

  return (
    <div className="flex items-center justify-between">
      <IcuShareDateSelector
        targetDate={targetDate}
        inDate={chartData.icu_io.in_date}
      />

      <div className="flex items-center">
        <IcuSharePatientInfo
          patientData={patient}
          weight={weight}
          weightMeasuredDate={weight_measured_date as string}
        />
        <VitalChartDialog
          inDate={chartData.icu_io.in_date}
          patientId={chartData.patient.patient_id}
        />
      </div>

      {isVistor ? (
        <Link href="/">
          <VetoolLogo />
        </Link>
      ) : (
        <VetoolLogo />
      )}
    </div>
  )
}
