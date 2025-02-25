'use client'

import ChartTable from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table'
import IcuShareHeader from '@/components/hospital/share/header/icu-share-header'
import IcuShareChartInfos from '@/components/hospital/share/icu-share-chart-infos'
import IcuShareNoResult from '@/components/hospital/share/icu-share-no-result'
import { type SelectedChart } from '@/types/icu/chart'
import { motion } from 'motion/react'

type Props = {
  sharedChartData: SelectedChart
  targetDate: string
}

export default function ShareContainer({ sharedChartData, targetDate }: Props) {
  return (
    <div className="h-full">
      <motion.div className="flex flex-col gap-4">
        <IcuShareHeader
          chartData={sharedChartData}
          targetDate={targetDate as string}
        />

        {!sharedChartData ? (
          <IcuShareNoResult text="차트가 존재하지 않습니다" />
        ) : (
          <>
            <IcuShareChartInfos chartData={sharedChartData} />
            <ChartTable chartData={sharedChartData} preview />
          </>
        )}
      </motion.div>
    </div>
  )
}
