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
import { CheckIcon, ComponentIcon, RotateCcwIcon } from 'lucide-react'
import type { FilterState } from './filters'

type Props = {
  hosGroupList: string[]
  filters: FilterState
  setFilters: (value: FilterState | ((val: FilterState) => FilterState)) => void
}

export default function GroupFilter({
  hosGroupList,
  filters,
  setFilters,
}: Props) {
  console.log(filters)

  const handleGroupChange = (group: string) => {
    setFilters({
      ...filters,
      selectedGroup: group,
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
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
            className="gap-1text-muted-foreground flex items-center"
          >
            <RotateCcwIcon size={14} />
            초기화
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
