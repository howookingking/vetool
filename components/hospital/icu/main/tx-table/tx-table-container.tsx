'use client'

import NoResultSquirrel from '@/components/common/no-result-squirrel'
import TxTable from '@/components/hospital/icu/main/tx-table/tx-table'
import TxTableOrderTypeFilter from '@/components/hospital/icu/main/tx-table/tx-table-order-type-filter'
import {
  DEFAULT_ICU_ORDER_TYPE,
  type OrderType,
} from '@/constants/hospital/icu/chart/order'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import type { IcuTxTableData } from '@/types/icu/tx-table'
import { useState } from 'react'

export default function TxTableContainer({
  txTableData,
}: {
  txTableData: IcuTxTableData[]
}) {
  const {
    basicHosData: { showTxUser, orderColorsData },
  } = useBasicHosDataContext()

  const [orderTypeFilter, setOrderTypeFilter] = useState<OrderType | null>(null)

  const filteredTxData = txTableData.map((data) => ({
    ...data,
    orders: data.orders
      .filter((order) => {
        // 오더시간을 배열로 리턴하는 로직
        // ["0", "0", "슈퍼샤이", "0", "0", "슈퍼샤이", "슈퍼샤이" ...] => [2, 5, 6, ...]
        const orderTimes = order.icu_chart_order_time.reduce<number[]>(
          (acc, time, index) => {
            if (time !== '0') acc.push(index)
            return acc
          },
          [],
        )

        // tx_result가 있는 치료시간을 Set으로 리턴하는 로직
        // [{ time: 2, tx_result: "처치결과" }, { time: 6, tx_result: '' }, { time: 5, tx_result: '결과' }, ...] => {2, 5}
        const doneTreatmentTimeSet = new Set(
          order.treatments.filter((t) => t.tx_result).map((t) => t.time),
        )

        // orderTimes에 있는 시간 중 doneTreatmentTimeSet에 없는 시간일 경우 true
        // 6시 오더만 남게 된다.
        return orderTimes.some((time) => !doneTreatmentTimeSet.has(time))
      })
      // 오더 타입 필터링
      // orderTypeFilters가 비어있으면 모든 오더 타입을 보여줌
      .filter((order) => {
        if (orderTypeFilter === null) return true
        return orderTypeFilter === order.icu_chart_order_type
      }),
  }))

  const hasOrder = filteredTxData.some((data) => data.orders.length > 0)

  const orderTypeFiltersToKrString = DEFAULT_ICU_ORDER_TYPE.find(
    (type) => type.value === orderTypeFilter,
  )?.label

  return (
    <>
      {!hasOrder ? (
        <NoResultSquirrel
          text={`${orderTypeFiltersToKrString} 처치를 완료했습니다`}
          className="h-desktop flex-col"
          size="lg"
        />
      ) : (
        <TxTable
          orderTypeFilter={orderTypeFilter}
          filteredTxData={filteredTxData}
          showTxUser={showTxUser}
          orderColorsData={orderColorsData}
        />
      )}

      <TxTableOrderTypeFilter
        orderTypeFilter={orderTypeFilter}
        setOrderTypeFilters={setOrderTypeFilter}
      />
    </>
  )
}

// 환자 사이드바 필터에 대한 필터링 기능 일단 비활성화
// const [initialPatientFilter, setInitialPatientFilter] =
//   useState(DEFAULT_FILTER_STATE)

// useEffect(() => {
//   const storagePatientFilter = localStorage.getItem('patientFilter')
//   if (storagePatientFilter) {
//     setInitialPatientFilter(JSON.parse(storagePatientFilter))
//   }

//   const handleStorageChange = () => {
//     const newValue = localStorage.getItem('patientFilter')
//     if (newValue) {
//       setInitialPatientFilter(JSON.parse(newValue))
//     }
//   }

//   window.addEventListener('localStorageChange', handleStorageChange)

//   return () => {
//     window.removeEventListener('localStorageChange', handleStorageChange)
//   }
// }, [])

// const { filteredTxData, hasOrder } = filterTxTableData({
//   txTableData,
//   patientFilter: DEFAULT_FILTER_STATE,
//   orderTypeFilter: orderTypeFilters,
//   vetsListData,
// })
