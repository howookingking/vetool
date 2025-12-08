'use client'

import PatientDetailInfo from '@/components/hospital/common/patient/patient-detail-info'
import { cn } from '@/lib/utils/utils'
import type { SelectedIcuChart } from '@/types/icu/chart'
import ReadOnlyChartInfos from './read-only-chart-infos'
import ReadOnlyChartTable from './read-only-chart-table'

type Props = {
  chartData: SelectedIcuChart
  ref?: React.RefObject<HTMLDivElement | null>
  isExport?: boolean
}

export default function ReadOnlyIcuChart({ chartData, ref, isExport }: Props) {
  const { patient, weight, weight_measured_date } = chartData

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col gap-2 p-2',
        isExport ? 'w-[1400px]' : 'w-full',
      )}
    >
      {isExport ? (
        <div className="relative">
          <span className="absolute left-2 font-mono text-sm">
            {chartData.target_date}
          </span>
          <div className="flex justify-center">
            <PatientDetailInfo
              species={patient.species}
              name={patient.name}
              breed={patient.breed}
              gender={patient.gender}
              birth={patient.birth}
              weight={weight}
              weightMeasuredDate={weight_measured_date}
            />
          </div>
        </div>
      ) : null}

      <ReadOnlyChartInfos chartData={chartData} />

      <ReadOnlyChartTable chartData={chartData} />
    </div>
  )
}
