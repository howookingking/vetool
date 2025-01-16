'use client'

import AddDefaultChartDialog from '@/components/hospital/icu/main/chart/add-chart-dialogs/add-default-chart-dialog'
import AddTemplateOrderDialog from '@/components/hospital/icu/main/chart/add-chart-dialogs/template/add-template-order-dialog'
import CopyPrevChartDialog from '@/components/hospital/icu/main/chart/add-chart-dialogs/copy-prev-chart-dialog'
import CopyPrevIoChartDialog from '@/components/hospital/icu/main/chart/add-chart-dialogs/copy-prev-io-chart-dialog'
import PasteCopiedChartDialog from '@/components/hospital/icu/main/chart/add-chart-dialogs/paste-copied-chart-dialog'
import { getPrevIoChartData } from '@/lib/services/icu/chart/get-icu-chart'
import type { PrevIoChartData, SelectedChart } from '@/types/icu/chart'
import { useEffect, useState } from 'react'

type AddChartDialogsProps = {
  chartData: SelectedChart
} & (
  | {
      firstChart: true
      patientId: string
    }
  | {
      firstChart?: false
      patientId?: never
    }
)

export default function AddChartDialogs({
  chartData,
  patientId,
  firstChart,
}: AddChartDialogsProps) {
  const [prevIoChartData, setPrevIoChartData] =
    useState<PrevIoChartData | null>(null)

  useEffect(() => {
    if (!firstChart) return
    getPrevIoChartData(patientId!).then(setPrevIoChartData)
  }, [patientId, firstChart])

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5 px-5 py-5 ring md:flex-row md:gap-10 lg:px-32">
      {firstChart ? (
        <AddDefaultChartDialog chartData={chartData} />
      ) : (
        <CopyPrevChartDialog />
      )}

      {prevIoChartData && (
        <CopyPrevIoChartDialog prevIoChartData={prevIoChartData} />
      )}

      <PasteCopiedChartDialog />

      <AddTemplateOrderDialog />
    </div>
  )
}
