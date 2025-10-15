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
import { cn } from '@/lib/utils/utils'
import { CheckIcon, ComponentIcon, RotateCcwIcon } from 'lucide-react'
import type { FilterState } from './filters'

type Props = {
  hosGroupList: string[]
  filters: FilterState
  setFilters: (value: FilterState) => void
}

export default function GroupFilter({
  hosGroupList,
  filters,
  setFilters,
}: Props) {
  const handleGroupChange = (group: string) => {
    setFilters({
      ...filters,
      selectedGroup: group,
    })
  }

  const isFiltered = !!filters.selectedGroup

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'flex-1 px-2 focus-visible:ring-0',
            isFiltered && 'bg-muted shadow-inner',
          )}
        >
          <ComponentIcon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        <DropdownMenuLabel>그룹</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {hosGroupList.map((group) => (
            <DropdownMenuItem
              key={group}
              className="flex cursor-pointer items-center justify-between gap-2"
              onClick={() => handleGroupChange(group)}
            >
              <span>{group}</span>

              {filters.selectedGroup === group && <CheckIcon size={12} />}
            </DropdownMenuItem>
          ))}

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => setFilters({ ...filters, selectedGroup: '' })}
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
