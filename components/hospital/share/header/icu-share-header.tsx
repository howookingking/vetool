'use client'

import VetoolLogo from '@/components/common/vetool-logo'
import VitalChartDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-center/vital-chart/vital-chart-dialog'
import IcuShareDateSelector from '@/components/hospital/share/header/icu-share-date-selector'
import IcuSharePatientInfo from '@/components/hospital/share/header/icu-share-patient-info'
import { checkIfUserIsVisitor } from '@/lib/services/icu/share'
import { type SelectedChart } from '@/types/icu/chart'
import Link from 'next/link'
import { useEffect, useState } from 'react'
type Props = {
  targetDate: string
  chartData: SelectedChart | null
}

export default function IcuShareHeader({ targetDate, chartData }: Props) {
  const [isVistor, setIsVistor] = useState(false)

  useEffect(() => {
    const checkVistor = async () => {
      const isVistor = await checkIfUserIsVisitor()
      setIsVistor(isVistor)
    }
    checkVistor()
  }, [])

  return (
    <div className="flex items-center justify-between">
      <IcuShareDateSelector
        targetDate={targetDate}
        inDate={chartData?.icu_io.in_date ?? '2024-01-01'}
      />
      <div className="flex items-center">
        {chartData && (
          <>
            <IcuSharePatientInfo
              patientData={chartData?.patient}
              weight={chartData?.weight}
              weightMeasuredDate={chartData?.weight_measured_date as string}
            />
            <VitalChartDialog
              inDate={chartData.icu_io.in_date}
              icuIoId={chartData.icu_io.icu_io_id}
            />
          </>
        )}
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
