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
      <MenubarTrigger className="flex w-full justify-center gap-1" asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(!isReset && 'animate-pulse bg-primary')}
        >
          <Component />
        </Button>
      </MenubarTrigger>

      <MenubarContent>
        {hosGroupList.map((group) => (
          <MenubarItem
            key={group}
            className="flex items-center gap-2"
            onClick={(e) => {
              e.preventDefault()
              onGroupChange(group)
            }}
          >
            <Checkbox checked={selectedGroup.includes(group)} />
            <span>{group}</span>
          </MenubarItem>
        ))}
      </MenubarContent>
    </MenubarMenu>
  )
}
