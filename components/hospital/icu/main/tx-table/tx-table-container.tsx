'use client'

import TxTable from '@/components/hospital/icu/main/tx-table/tx-table'
import TxTableFilter from '@/components/hospital/icu/main/tx-table/tx-table-filter'
import type { IcuTxTableData } from '@/types/icu/tx-table'
import { useMemo, useState } from 'react'

const TX_TABLE_BACKGROUD_COLORS = [
  '#fef2f2',
  '#fffbeb',
  '#f7fee7',
  '#ecfdf5',
  '#ecfeff',
  '#eff6ff',
  '#f5f3ff',
  '#fdf4ff',
  '#fff1f2',
  '#fff7ed',
  '#fefce8',
  '#f0fdf4',
  '#f0fdfa',
  '#e0f2fe',
  '#f0f9ff',
  '#eef2ff',
  '#faf5ff',
  '#fdf2f8',
]

export default function TxTableContainer({
  txTableData,
}: {
  txTableData: IcuTxTableData[]
}) {
  const [localFilterState, setLocalFilterState] = useState('all')

  const filteredTxData = useMemo(() => {
    return txTableData
      .filter((data) => !data.icu_io.out_date)
      .map((data) => ({
        ...data,
        orders: data.orders.filter((order) => {
          if (localFilterState && localFilterState !== 'all') {
            if (order.icu_chart_order_type !== localFilterState) {
              return false
            }
          }

          const orderTimes = order.icu_chart_order_time
            .map((time, index) => (time !== '0' ? index + 1 : null))
            .filter((time): time is number => time !== null)

          const treatmentTimes = order.treatments.map((t) => t.time)

          const pendingOrderTimes = orderTimes.filter(
            (time) => !treatmentTimes.includes(time),
          )

          return pendingOrderTimes.length > 0
        }),
      }))
      .filter((data) => data.orders.length > 0)
  }, [txTableData, localFilterState])

  const chartBackgroundMap = useMemo(
    () =>
      txTableData.reduce<{ [key: string]: string }>((acc, item, index) => {
        acc[item.icu_charts.icu_chart_id] =
          TX_TABLE_BACKGROUD_COLORS[index % TX_TABLE_BACKGROUD_COLORS.length]
        return acc
      }, {}),
    [txTableData],
  )

  return (
    <div className="mt-12 md:mt-0 md:w-auto">
      <TxTableFilter
        localFilterState={localFilterState}
        setLocalFilterState={setLocalFilterState}
      />

      <TxTable
        localFilterState={localFilterState}
        filteredTxData={filteredTxData}
        chartBackgroundMap={chartBackgroundMap}
      />
    </div>
  )
}
