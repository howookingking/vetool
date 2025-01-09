import UserAvatar from '@/components/hospital/common/user-avatar'
import { Button } from '@/components/ui/button'
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar'
import { cn } from '@/lib/utils/utils'
import type { Vet } from '@/types/icu/chart'
import { Stethoscope } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

type VetFilterProps = {
  vetsListData: Vet[]
  selectedVet: string
  onVetSelect: (vet: string) => void
}

export default function VetFilter({
  vetsListData,
  selectedVet,
  onVetSelect,
}: VetFilterProps) {
  const searchParams = useSearchParams()
  const isReset = !searchParams.get('vet')

  return (
    <MenubarMenu>
      <MenubarTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            !isReset && 'bg-primary text-white',
            'h-[30px] w-full rounded-none',
          )}
        >
          <Stethoscope />
        </Button>
      </MenubarTrigger>

      <MenubarContent align="start" className="min-w-[144px]">
        {vetsListData.map((vet) => (
          <MenubarItem
            key={vet.user_id}
            onClick={() => onVetSelect(vet.user_id)}
            className={cn(
              'flex items-center justify-between',
              selectedVet === vet.user_id && 'bg-muted',
            )}
          >
            <div className="flex items-center gap-1">
              <UserAvatar src={vet.avatar_url} alt={vet.name} />
              {vet.name}
            </div>

            {selectedVet === vet.user_id && <span>✓</span>}
          </MenubarItem>
        ))}
        <MenubarSeparator />
        <MenubarItem onClick={() => onVetSelect('reset')}>
          <div className="text-center text-muted-foreground">선택 초기화</div>
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  )
}
