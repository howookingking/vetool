import UserAvatar from '@/components/hospital/common/user-avatar'
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
import type { Vet } from '@/types'
import { CheckIcon, RotateCcwIcon, StethoscopeIcon } from 'lucide-react'
import type { FilterState } from './filters'

type Props = {
  vetList: Vet[]
  filters: FilterState
  setFilters: (value: FilterState | ((val: FilterState) => FilterState)) => void
}

export default function VetFilter({ filters, setFilters, vetList }: Props) {
  const handleVetSelect = (vetId: string) => {
    setFilters({
      ...filters,
      selectedVet: vetId,
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <StethoscopeIcon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        <DropdownMenuLabel>수의사</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {vetList.map((vet) => (
            <DropdownMenuItem
              key={vet.user_id}
              onClick={() => handleVetSelect(vet.user_id)}
              className="flex cursor-pointer items-center justify-between gap-2"
            >
              <div className="flex items-center gap-1">
                <UserAvatar src={vet.avatar_url} alt={vet.name} />
                {vet.name}
              </div>

              {filters.selectedVet === vet.user_id && <CheckIcon size={12} />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => setFilters({ ...filters, selectedVet: '' })}
          className="flex items-center gap-1 text-muted-foreground"
        >
          <RotateCcwIcon size={14} />
          초기화
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
