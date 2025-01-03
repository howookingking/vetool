import UserAvatar from '@/components/hospital/common/user-avatar'
import GroupFilter from '@/components/hospital/icu/sidebar/filters/group-filter'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar'
import type { Vet } from '@/types/icu/chart'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import VetFilter from './vet-filter'
import SortFilter from './sort-filter'

type Filters = {
  hosGroupList: string[]
  vetsListData: Vet[]
  selectedGroup: string[]
  setSelectedGroup: (group: string[]) => void
  selectedVet: string
  setSelectedVet: (vet: string) => void
  selectedSort: string
  setSelectedSort: (value: string) => void
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
}: Filters) {
  const path = usePathname()
  const searchParams = useSearchParams()
  const currentParams = new URLSearchParams(searchParams.toString())

  const { push } = useRouter()

  const [tempSelectedGroup, setTempSelectedGroup] =
    useState<string[]>(selectedGroup)

  // 그룹 변경 메소드 (GroupFilter)
  const handleGroupChange = (group: string) => {
    const newGroups = tempSelectedGroup.includes(group)
      ? tempSelectedGroup.filter(
          (selectedGroup: string) => selectedGroup !== group,
        )
      : [...tempSelectedGroup, group]

    setTempSelectedGroup(newGroups)
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
    <Menubar className="border-none p-0">
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

      <SortFilter onSortSelect={handleSortSelect} />
    </Menubar>
  )
}
