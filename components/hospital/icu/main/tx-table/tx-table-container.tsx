'use client'

import TxTable from '@/components/hospital/icu/main/tx-table/tx-table'
import TxTableFilter from '@/components/hospital/icu/main/tx-table/tx-table-filter'
import { DEFAULT_FILTER_STATE } from '@/constants/hospital/icu/chart/filters'
import { filterTxTableData } from '@/lib/utils/tx-table'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import type { IcuTxTableData } from '@/types/icu/tx-table'
import { useEffect, useState } from 'react'

export default function TxTableContainer({
  txTableData,
}: {
  txTableData: IcuTxTableData[]
}) {
  const {
    basicHosData: { showTxUser, orderColorsData, vetsListData },
  } = useBasicHosDataContext()

  const [localFilterState, setLocalFilterState] = useState<string[]>([])
  const [initialPatientFilter, setInitialPatientFilter] =
    useState(DEFAULT_FILTER_STATE)

  useEffect(() => {
    const storagePatientFilter = localStorage.getItem('patientFilter')
    if (storagePatientFilter) {
      setInitialPatientFilter(JSON.parse(storagePatientFilter))
    }

    const handleStorageChange = () => {
      const newValue = localStorage.getItem('patientFilter')
      if (newValue) {
        setInitialPatientFilter(JSON.parse(newValue))
      }
    }

    window.addEventListener('localStorageChange', handleStorageChange)

    return () => {
      window.removeEventListener('localStorageChange', handleStorageChange)
    }
  }, [])

  const { filteredTxData, hasOrder } = filterTxTableData({
    txTableData,
    patientFilter: initialPatientFilter,
    orderTypeFilter: localFilterState,
    vetsListData,
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
        showTxUser={showTxUser}
        orderColorsData={orderColorsData}
      />
    </>
  )
}

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
