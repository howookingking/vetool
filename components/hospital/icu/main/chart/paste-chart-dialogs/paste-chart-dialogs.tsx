'use client'

import { getPrevIoChartData } from '@/lib/services/icu/chart/get-icu-chart'
import { type PrevIoChartData, type SelectedChart } from '@/types/icu/chart'
import { useEffect, useState } from 'react'
import PasteCopiedChartDialog from './paste-copied-chart-dialog'
import PasteDefaultChartDialog from './paste-default-chart-dialog'
import PastePrevChartDialog from './paste-prev-chart-dialog'
import PastePrevIoChartDialog from './paste-prev-io-chart-dialog'
import PasteTemplateOrderDialog from './template/paste-template-order-dialog'

type PasteChartDialogsProps = {
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

export default function PasteChartDialogs({
  chartData,
  patientId,
  firstChart,
}: PasteChartDialogsProps) {
  const [prevIoChartData, setPrevIoChartData] =
    useState<PrevIoChartData | null>(null)

  useEffect(() => {
    if (!firstChart) return
    getPrevIoChartData(patientId!).then(setPrevIoChartData)
  }, [patientId, firstChart])

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5 px-5 py-5 ring md:flex-row md:gap-10 lg:px-32">
      {firstChart ? (
        <PasteDefaultChartDialog chartData={chartData} />
      ) : (
        <PastePrevChartDialog />
      )}

      {/* 이전 입원기록(io)이 있는 경우 */}
      {prevIoChartData && (
        <PastePrevIoChartDialog prevIoChartData={prevIoChartData} />
      )}

      <PasteCopiedChartDialog />

      <PasteTemplateOrderDialog />
    </div>
  )
}
