import { Button } from '@/components/ui/button'
import type { Vet } from '@/types'
import { RotateCcwIcon } from 'lucide-react'
import GroupFilter from './group-filter'
import SortFilter from './sort-filter'
import VetFilter from './vet-filter'

type Props = {
  hosGroupList: string[]
  vetList: Vet[]
  filters: FilterState
  setFilters: (value: FilterState | ((val: FilterState) => FilterState)) => void
}

export default function Filters({
  hosGroupList,
  vetList,
  filters,
  setFilters,
}: Props) {
  return (
    <div className="flex">
      <GroupFilter
        hosGroupList={hosGroupList}
        filters={filters}
        setFilters={setFilters}
      />

      <VetFilter vetList={vetList} filters={filters} setFilters={setFilters} />

      <SortFilter filters={filters} setFilters={setFilters} />

      <Button
        size="icon"
        variant="outline"
        className=""
        onClick={() => setFilters(DEFAULT_FILTER_STATE)}
      >
        <RotateCcwIcon />
      </Button>
    </div>
  )
}

export const SORT_FILTER_ITEMS = [
  { label: '입원일순', value: 'date' },
  { label: '수의사순', value: 'vet' },
  { label: '가나다순', value: 'name' },
  { label: '응급도순', value: 'urgency' },
] as const

export type SortFilterValue = (typeof SORT_FILTER_ITEMS)[number]['value']

export type FilterState = {
  selectedGroup: string
  selectedVet: string
  selectedSort: SortFilterValue
}

export const DEFAULT_FILTER_STATE: FilterState = {
  selectedGroup: '',
  selectedVet: '',
  selectedSort: 'date',
}
