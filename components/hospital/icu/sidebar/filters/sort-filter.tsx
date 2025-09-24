import { Button } from '@/components/ui/button'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ArrowDownNarrowWideIcon, CheckIcon, RotateCcwIcon } from 'lucide-react'
import {
  type FilterState,
  SORT_FILTER_ITEMS,
  type SortFilterValue,
} from './filters'

type Props = {
  filters: FilterState
  setFilters: (value: FilterState) => void
}

export default function SortFilter({ filters, setFilters }: Props) {
  const handleSelectSort = (value: SortFilterValue) => {
    setFilters({
      ...filters,
      selectedSort: value,
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex-1 rounded-none px-2 focus-visible:ring-0"
        >
          <ArrowDownNarrowWideIcon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        <DropdownMenuLabel>정렬</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {SORT_FILTER_ITEMS.map((item) => (
            <DropdownMenuItem
              key={item.value}
              onClick={() => handleSelectSort(item.value)}
              className="flex cursor-pointer items-center justify-between gap-2"
            >
              <span>{item.label}</span>

              {filters.selectedSort === item.value && <CheckIcon size={12} />}
            </DropdownMenuItem>
          ))}

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => setFilters({ ...filters, selectedSort: 'date' })}
            className="flex items-center gap-1"
          >
            <RotateCcwIcon size={14} />
            초기화
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
