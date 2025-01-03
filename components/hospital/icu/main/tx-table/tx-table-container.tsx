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
  const [localFilterState, setLocalFilterState] = useState('all')

  const filteredTxData = txTableData.map((data) => {
    const filteredOrders = data.orders.filter((order) => {
      // 필터가 전체가 아니고 현재 선택한 필터가 아닌 오더들은 필터링
      if (
        localFilterState !== 'all' &&
        order.icu_chart_order_type !== localFilterState
      ) {
        return false
      }

      // 오더 시간들을 배열로 생성 [1, 3, 5, 7]
      const orderTimes = order.icu_chart_order_time
        .map((time, index) => (time !== '0' ? index + 1 : null))
        .filter((time) => time !== null)

      // 처치 결과가 있는 시간들을 배열로 생성 [1, 3]
      const treatmentTimes = order.treatments.map((treatment) => {
        if (treatment.tx_result) return treatment.time
      })

      // 아직 처치가 안된 오더의 시간을 배열로 생성 [5, 7]
      const pendingOrderTimes = orderTimes.filter(
        (time) => !treatmentTimes.includes(time),
      )

      return pendingOrderTimes.length > 0
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

  return (
    <div className="mt-12 2xl:mt-0 2xl:w-auto">
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
