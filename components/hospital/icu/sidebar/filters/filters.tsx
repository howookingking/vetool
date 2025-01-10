import GroupFilter from '@/components/hospital/icu/sidebar/filters/group-filter'
import ResetFilters from '@/components/hospital/icu/sidebar/filters/reset-filters'
import SortFilter from '@/components/hospital/icu/sidebar/filters/sort-filter'
import VetFilter from '@/components/hospital/icu/sidebar/filters/vet-filter'
import { Menubar } from '@/components/ui/menubar'
import { DEFAULT_FILTER_STATE } from '@/constants/hospital/icu/chart/filters'
import useLocalStorage from '@/hooks/use-local-storage'
import type { Vet } from '@/types/icu/chart'

export default function Filters({
  hosGroupList,
  vetsListData,
}: {
  hosGroupList: string[]
  vetsListData: Vet[]
}) {
  const [filterState, setFilterState] = useLocalStorage(
    `patientFilter`,
    DEFAULT_FILTER_STATE,
  )

  // 그룹 다중 선택 로직
  const handleGroupChange = (group: string) => {
    const newGroups = filterState.selectedGroup.includes(group)
      ? filterState.selectedGroup.filter(
          (selectedGroup) => selectedGroup !== group,
        )
      : [...filterState.selectedGroup, group]

    setFilterState({
      ...filterState,
      selectedGroup: newGroups,
    })
  }

  // 수의사 선택 로직
  const handleVetSelect = (vetId: string) => {
    setFilterState({
      ...filterState,
      selectedVet: vetId === 'reset' ? '' : vetId,
    })
  }

  // 환자 정렬 방식 로직
  const handleSortSelect = (value: string) => {
    setFilterState({
      ...filterState,
      selectedSort: value,
    })
  }

  // 필터 리셋 로직
  const resetFilters = () => {
    setFilterState(DEFAULT_FILTER_STATE)
  }

  return (
    <Menubar className="flex h-8 space-x-0 p-0">
      <GroupFilter
        hosGroupList={hosGroupList}
        selectedGroup={filterState.selectedGroup}
        onGroupChange={handleGroupChange}
      />

      <VetFilter
        vetsListData={vetsListData}
        selectedVet={filterState.selectedVet}
        onVetSelect={handleVetSelect}
      />

      <SortFilter
        selectedSort={filterState.selectedSort}
        onSortSelect={handleSortSelect}
      />

      <ResetFilters resetFilters={resetFilters} />
    </Menubar>
  )
}
