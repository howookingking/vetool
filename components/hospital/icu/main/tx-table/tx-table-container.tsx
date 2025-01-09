'use client'

import TxTable from '@/components/hospital/icu/main/tx-table/tx-table'
import TxTableFilter from '@/components/hospital/icu/main/tx-table/tx-table-filter'
import type { IcuTxTableData } from '@/types/icu/tx-table'
import { useState } from 'react'

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
  const [localFilterState, setLocalFilterState] = useState<string[]>([])

  const filteredTxData = txTableData.map((data) => {
    const filteredOrders = data.orders
      .filter((order) => {
        // 필터가 있는 경우 기존 필터링 로직 실행
        // if (!localFilterState.includes(order.icu_chart_order_type)) {
        //   return false
        // }

        const orderTimes = order.icu_chart_order_time
          .map((time, index) => (time !== '0' ? index + 1 : null))
          .filter((time) => time !== null)

        const treatmentTimes = order.treatments.map((treatment) => {
          if (treatment.tx_result) return treatment.time
        })

        const pendingOrderTimes = orderTimes.filter(
          (time) => !treatmentTimes.includes(time),
        )

        return pendingOrderTimes.length > 0
      })
      .filter((order) => {
        if (localFilterState.length === 0) {
          return true
        }

        return localFilterState.includes(order.icu_chart_order_type)
      })

    return {
      ...data,
      orders: filteredOrders,
    }
  })

  const chartBackgroundMap = txTableData.reduce<{ [key: string]: string }>(
    (acc, item, index) => {
      acc[item.icu_charts.icu_chart_id] =
        TX_TABLE_BACKGROUD_COLORS[index % TX_TABLE_BACKGROUD_COLORS.length]
      return acc
    },
    {},
  )

  const hasOrder = filteredTxData.some((data) => data.orders.length > 0)

  return (
    <>
      <TxTableFilter
        localFilterState={localFilterState}
        setLocalFilterState={setLocalFilterState}
      />

      <TxTable
        localFilterState={localFilterState}
        filteredTxData={filteredTxData}
        chartBackgroundMap={chartBackgroundMap}
        hasOrder={hasOrder}
      />
    </>
  )
}
