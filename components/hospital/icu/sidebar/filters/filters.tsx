import GroupFilter from '@/components/hospital/icu/sidebar/filters/group-filter'
import ResetFilters from '@/components/hospital/icu/sidebar/filters/reset-filters'
import SortFilter from '@/components/hospital/icu/sidebar/filters/sort-filter'
import VetFilter from '@/components/hospital/icu/sidebar/filters/vet-filter'
import { Menubar } from '@/components/ui/menubar'
import { DEFAULT_FILTER_STATE } from '@/constants/hospital/icu/chart/filters'
import { type Filter, type Vet } from '@/types/icu/chart'

type FiltersProps = {
  hosGroupList: string[]
  vetsListData: Vet[]
  filters: Filter
  setFilters: (filters: Filter) => void
}

export default function Filters({
  hosGroupList,
  vetsListData,
  filters,
  setFilters,
}: FiltersProps) {
  // 그룹 다중 선택 로직
  const handleGroupChange = (group: string) => {
    const newGroups = filters.selectedGroup.includes(group)
      ? filters.selectedGroup.filter((selectedGroup) => selectedGroup !== group)
      : [...filters.selectedGroup, group]

    setFilters({
      ...filters,
      selectedGroup: newGroups,
    })

    window.dispatchEvent(new Event('localStorageChange'))
  }

  // 수의사 선택 로직
  const handleVetSelect = (vetId: string) => {
    setFilters({
      ...filters,
      selectedVet: vetId === 'reset' ? '' : vetId,
    })

    window.dispatchEvent(new Event('localStorageChange'))
  }

  // 환자 정렬 방식 로직
  const handleSortSelect = (value: string) => {
    setFilters({
      ...filters,
      selectedSort: value,
    })

    window.dispatchEvent(new Event('localStorageChange'))
  }

  // 필터 리셋 로직
  const resetFilters = () => {
    setFilters(DEFAULT_FILTER_STATE)

    window.dispatchEvent(new Event('localStorageChange'))
  }

  return (
    <Menubar className="flex h-8 space-x-0 p-0">
      <GroupFilter
        hosGroupList={hosGroupList}
        selectedGroup={filters.selectedGroup}
        onGroupChange={handleGroupChange}
      />

      <VetFilter
        vetsListData={vetsListData}
        selectedVet={filters.selectedVet}
        onVetSelect={handleVetSelect}
      />

      <SortFilter
        selectedSort={filters.selectedSort}
        onSortSelect={handleSortSelect}
      />

      <ResetFilters resetFilters={resetFilters} />
    </Menubar>
  )
}
