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

type GroupFilterProps = {
  hosGroupList: string[]
  selectedGroup: string[]
  onGroupChange: (group: string) => void
}

export default function GroupFilter({
  hosGroupList,
  selectedGroup,
  onGroupChange,
}: GroupFilterProps) {
  return (
    <MenubarMenu>
      <MenubarTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            selectedGroup.length > 0 && 'bg-primary text-white',
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
      </MenubarContent>
    </MenubarMenu>
  )
}
