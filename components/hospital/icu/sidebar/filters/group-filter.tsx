import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar'
import { cn } from '@/lib/utils/utils'
import { Component } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

export default function GroupFilter({
  hosGroupList,
  selectedGroup,
  onGroupChange,
}: {
  hosGroupList: string[]
  selectedGroup: string[]
  onGroupChange: (group: string) => void
}) {
  const searchParams = useSearchParams()
  const isReset = !searchParams.get('group')

  return (
    <MenubarMenu>
      <MenubarTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            !isReset && 'bg-primary text-white',
            'h-[30px] w-full rounded-r-none',
          )}
        >
          <Component />
        </Button>
      </MenubarTrigger>

      <MenubarContent align="start" className="min-w-[120px]" hideWhenDetached>
        {hosGroupList.map((group) => (
          <MenubarItem
            key={group}
            className="flex items-center gap-1.5"
            onClick={(e) => {
              e.preventDefault()
              onGroupChange(group)
            }}
          >
            <Checkbox checked={selectedGroup.includes(group)} />
            <span>{group}</span>
          </MenubarItem>
        ))}
        {/* <MenubarSeparator /> */}
        {/* <MenubarItem>
          <div className="text-center text-muted-foreground">선택 초기화</div>
        </MenubarItem> */}
      </MenubarContent>
    </MenubarMenu>
  )
}
