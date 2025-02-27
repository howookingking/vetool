import { type Filter, type Vet } from '@/types/icu/chart'
import { type SummaryData } from '@/types/icu/summary'

type FilteredSummaryData = {
  summaryData: SummaryData[]
  patientFilter: Filter
  vetsListData: Vet[]
}

export const filterSummaryData = ({
  summaryData,
  patientFilter,
  vetsListData,
}: FilteredSummaryData) => {
  let filteredSummaryData = summaryData.filter((data) => {
    if (!patientFilter) return true

    const { selectedGroup, selectedVet } = patientFilter

    const groupMatch =
      selectedGroup.length === 0 ||
      selectedGroup.some((group) => data.icu_io.group_list.includes(group))

    const vetMatch = !selectedVet || data.main_vet === selectedVet

    return groupMatch && vetMatch
  })

  if (patientFilter?.selectedSort) {
    filteredSummaryData = sortFilteredData(
      filteredSummaryData,
      patientFilter.selectedSort,
      vetsListData,
    )
  }

  const hasData = filteredSummaryData.some((data) => data.orders.length > 0)

  return {
    filteredSummaryData,
    hasData,
  }
}

const sortFilteredData = (
  data: SummaryData[],
  sortType: string,
  vetsListData: Vet[],
) => {
  const filtered = [...data]

  if (sortType === 'name') {
    filtered.sort((a, b) => a.patient.name.localeCompare(b.patient.name, 'ko'))
  }

  if (sortType === 'vet') {
    const rankMap = Object.fromEntries(
      vetsListData.map((vet) => [vet.user_id, vet.rank]),
    )

    filtered.sort((a, b) => {
      const rankA = rankMap[a.main_vet ?? ''] ?? 99
      const rankB = rankMap[b.main_vet ?? ''] ?? 99
      return rankA - rankB
    })
  }

  if (sortType === 'urgency') {
    filtered.sort((a, b) => {
      if (a.main_vet === null && b.main_vet === null) return 0
      if (a.main_vet === null) return 1
      if (b.main_vet === null) return -1

      const urgencyA = a.urgency ?? 0
      const urgencyB = b.urgency ?? 0
      return urgencyB - urgencyA
    })
  }

  return filtered
}
