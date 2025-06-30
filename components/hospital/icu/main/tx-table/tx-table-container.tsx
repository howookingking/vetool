'use client'

import NoResultSquirrel from '@/components/common/no-result-squirrel'
import TxTable from '@/components/hospital/icu/main/tx-table/tx-table'
import TxTableOrderTypeFilter from '@/components/hospital/icu/main/tx-table/tx-table-order-type-filter'
import { DEFAULT_ICU_ORDER_TYPE } from '@/constants/hospital/icu/chart/order'
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

  const [orderTypeFilters, setOrderTypeFilters] = useState<string[]>([])

  const filteredTxData = txTableData.map((data) => ({
    ...data,
    orders: data.orders
      .filter((order) => {
        // 오더시간을 배열로 리턴하는 로직
        // ["0", "0", "슈퍼샤이", "0", "0", "슈퍼샤이", "슈퍼샤이" ...] => [3, 7, 8,...]
        const orderTimes = order.icu_chart_order_time.reduce<number[]>(
          (acc, time, index) => {
            if (time !== '0') acc.push(index + 1)
            return acc
          },
          [],
        )

        // tx_result가 있는 치료시간을 Set으로 리턴하는 로직
        // [{ time: 3, tx_result: "처치결과" }, { time: 7, tx_result: '' }, { time: 8, tx_result: '결과' }, ...] => {3, 8}
        const doneTreatmentTimeSet = new Set(
          order.treatments.filter((t) => t.tx_result).map((t) => t.time),
        )

        // orderTimes에 있는 시간 중 doneTreatmentTimeSet에 없는 시간일 경우 true
        // 7번째 오더만 남게 된다.
        return orderTimes.some((time) => !doneTreatmentTimeSet.has(time))
      })
      // 오더 타입 필터링
      // orderTypeFilters가 비어있으면 모든 오더 타입을 보여줌
      .filter((order) => {
        if (orderTypeFilters.length === 0) return true
        return orderTypeFilters.includes(order.icu_chart_order_type)
      }),
  }))

  const hasOrder = filteredTxData.some((data) => data.orders.length > 0)

  const orderTypeFiltersToKrString = orderTypeFilters
    .map(
      (filter) =>
        DEFAULT_ICU_ORDER_TYPE.find((type) => type.value === filter)?.label,
    )
    .join(', ')

  return (
    <>
      <TxTableOrderTypeFilter
        orderTypeFilters={orderTypeFilters}
        setOrderTypeFilters={setOrderTypeFilters}
      />

      {!hasOrder ? (
        <NoResultSquirrel
          text={`${orderTypeFiltersToKrString} 처치를 완료했습니다`}
          className="h-exclude-header flex-col"
          size="lg"
        />
      ) : (
        <TxTable
          localFilterState={orderTypeFilters}
          filteredTxData={filteredTxData}
          showTxUser={showTxUser}
          orderColorsData={orderColorsData}
        />
      )}
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
