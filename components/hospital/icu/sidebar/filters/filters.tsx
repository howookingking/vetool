import GroupFilter from '@/components/hospital/icu/sidebar/filters/group-filter'
import VetFilter from '@/components/hospital/icu/sidebar/filters/vet-filter'
import type { Vet } from '@/types/icu/chart'
import { RotateCcw } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useCallback } from 'react'

type Filter = {
  selectedGroup: string[]
  selectedVet: string
}

type FiltersProps = {
  filters: Filter
  setFilters: React.Dispatch<React.SetStateAction<Filter>>
  vetsListData: Vet[]
  hosGroupList: string[]
}

export default function Filters({
  filters,
  setFilters,
  vetsListData,
  hosGroupList,
}: FiltersProps) {
  const pathname = usePathname()
  const { push } = useRouter()

  const resetFilters = useCallback(() => {
    setFilters({ selectedGroup: [], selectedVet: '' })

    push(pathname)
  }, [setFilters, push, pathname])

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-muted-foreground">필터</span>
        <RotateCcw
          size={14}
          onClick={resetFilters}
          className="cursor-pointer transition hover:text-primary"
        />
      </div>

      <GroupFilter
        hosGroupList={hosGroupList}
        selectedGroup={filters.selectedGroup}
        setSelectedGroup={(group) =>
          setFilters({ ...filters, selectedGroup: group })
        }
      />
      <VetFilter
        vetsListData={vetsListData}
        selectedVet={filters.selectedVet}
        setSelectedVet={(vet) => setFilters({ ...filters, selectedVet: vet })}
      />
    </div>
  )
}
