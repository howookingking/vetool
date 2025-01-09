import GroupFilter from '@/components/hospital/icu/sidebar/filters/group-filter'
import ResetFilters from '@/components/hospital/icu/sidebar/filters/reset-filters'
import SortFilter from '@/components/hospital/icu/sidebar/filters/sort-filter'
import VetFilter from '@/components/hospital/icu/sidebar/filters/vet-filter'
import { Menubar } from '@/components/ui/menubar'
import type { Vet } from '@/types/icu/chart'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type FiltersProps = {
  hosGroupList: string[]
  vetsListData: Vet[]
  selectedGroup: string[]
  setSelectedGroup: (group: string[]) => void
  selectedVet: string
  setSelectedVet: (vet: string) => void
  selectedSort: string
  setSelectedSort: (value: string) => void
  resetFilters: () => void
}

export default function Filters({
  hosGroupList,
  vetsListData,
  selectedGroup,
  setSelectedGroup,
  selectedVet,
  setSelectedVet,
  selectedSort,
  setSelectedSort,
  resetFilters,
}: FiltersProps) {
  const path = usePathname()
  const searchParams = useSearchParams()
  const currentParams = new URLSearchParams(searchParams.toString())

  const { push } = useRouter()

  // 그룹 변경 메소드 (GroupFilter)
  const handleGroupChange = (group: string) => {
    const newGroups = selectedGroup.includes(group)
      ? selectedGroup.filter((selectedGroup: string) => selectedGroup !== group)
      : [...selectedGroup, group]

    setSelectedGroup(newGroups)

    if (newGroups.length) {
      currentParams.set('group', newGroups.join(','))
    } else {
      currentParams.delete('group')
    }

    updateUrl()
  }

  // 수의사 선택 메소드 (VetFilter)
  const handleVetSelect = (vetId: string) => {
    if (vetId === 'reset') {
      currentParams.delete('vet')
      setSelectedVet('')
    } else {
      currentParams.set('vet', vetId)
      setSelectedVet(vetId)
    }

    updateUrl()
  }

  // 정렬 변경 메소드 (SortFilter)
  const handleSortSelect = (value: string) => {
    currentParams.set('sort', value)
    setSelectedSort(value)
    updateUrl()
  }

  const updateUrl = () => {
    const newUrl = `${path}${currentParams.toString() ? '?' : ''}${currentParams.toString()}`

    push(newUrl)
  }

  return (
    <Menubar className="flex h-8 space-x-0 p-0">
      <GroupFilter
        hosGroupList={hosGroupList}
        selectedGroup={selectedGroup}
        onGroupChange={handleGroupChange}
      />

      <VetFilter
        vetsListData={vetsListData}
        selectedVet={selectedVet}
        onVetSelect={handleVetSelect}
      />

      <SortFilter selectedSort={selectedSort} onSortSelect={handleSortSelect} />

      <ResetFilters resetFilters={resetFilters} />
    </Menubar>
  )
}
