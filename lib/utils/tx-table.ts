import { type Vet } from '@/types/icu/chart'
import { type IcuTxTableData } from '@/types/icu/tx-table'
import { type Filter } from '@/types/icu/chart'

type FilteredTxTableResult = {
  txTableData: IcuTxTableData[]
  patientFilter: Filter | null
  orderTypeFilter: string[]
  vetsListData: Vet[]
}

export const filterTxTableData = ({
  txTableData,
  patientFilter,
  orderTypeFilter,
  vetsListData,
}: FilteredTxTableResult) => {
  let filteredTxData = txTableData
    .filter((data) => {
      if (!patientFilter) return true

      const { selectedGroup, selectedVet } = patientFilter

      const groupMatch =
        selectedGroup.length === 0 ||
        selectedGroup.some((group) => data.icu_io.group_list.includes(group))

      const vetMatch = !selectedVet || data.icu_charts.main_vet === selectedVet

      return vetMatch && groupMatch
    })
    .map((data) => ({
      ...data,
      orders: filterOrders({ orders: data.orders, orderTypeFilter }),
    }))

  // 3. 정렬 적용
  if (patientFilter?.selectedSort) {
    filteredTxData = sortFilteredData(
      filteredTxData,
      patientFilter.selectedSort,
      vetsListData,
    )
  }

  const hasOrder = filteredTxData.some((data) => data.orders.length > 0)

  return {
    filteredTxData,
    hasOrder,
  }
}

// 오더 필터링 로직
const filterOrders = ({
  orders,
  orderTypeFilter,
}: {
  orders: IcuTxTableData['orders']
  orderTypeFilter: string[]
}) => {
  return orders
    .filter((order) => {
      const orderTimes = order.icu_chart_order_time
        .map((time, index) => (time !== '0' ? index + 1 : null))
        .filter((time): time is number => time !== null)

      const treatmentTimes = order.treatments
        .map((treatment) => (treatment.tx_result ? treatment.time : null))
        .filter((time): time is number => time !== null)

      const pendingOrderTimes = orderTimes.filter(
        (time) => !treatmentTimes.includes(time),
      )

      return pendingOrderTimes.length > 0
    })
    .filter((order) => {
      if (orderTypeFilter.length === 0) return true
      return orderTypeFilter.includes(order.icu_chart_order_type)
    })
}

const sortFilteredData = (
  data: IcuTxTableData[],
  sortType: string,
  vetsListData: Vet[],
): IcuTxTableData[] => {
  const filtered = [...data]

  if (sortType === 'vet') {
    const rankMap = Object.fromEntries(
      vetsListData.map((vet) => [vet.user_id, vet.rank]),
    )

    filtered.sort((a, b) => {
      const rankA = rankMap[a.icu_charts.main_vet ?? ''] ?? 99
      const rankB = rankMap[b.icu_charts.main_vet ?? ''] ?? 99
      return rankA - rankB
    })
  }

  // 2. 환자명 정렬
  if (sortType === 'name') {
    console.log(sortType, filtered)

    filtered.sort((a, b) => a.patient.name.localeCompare(b.patient.name, 'ko'))

    console.log(sortType, filtered)
  }

  // 3. 응급도순 정렬
  if (sortType === 'urgency') {
    filtered.sort((a, b) => {
      if (a.icu_charts.main_vet === null && b.icu_charts.main_vet === null)
        return 0
      if (a.icu_charts.main_vet === null) return 1
      if (b.icu_charts.main_vet === null) return -1

      const urgencyA = a.icu_charts.urgency ?? 0
      const urgencyB = b.icu_charts.urgency ?? 0
      return urgencyB - urgencyA
    })
  }

  // 최종으로 퇴원 환자 후미로 정렬
  filtered.sort((a, b) => {
    if (a.icu_io.out_date === null && b.icu_io.out_date === null) return 0
    if (a.icu_io.out_date === null) return -1
    if (b.icu_io.out_date === null) return 1
    return 0
  })

  return filtered
}
