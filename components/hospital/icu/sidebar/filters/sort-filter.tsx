import { Button } from '@/components/ui/button'
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar'
import { SORT_FILTER_ITEMS } from '@/constants/hospital/sidebar-items'
import { ArrowDownNarrowWide } from 'lucide-react'

export default function SortFilter({
  selectedSort,
  onSortSelect,
}: {
  selectedSort: string
  onSortSelect: (value: string) => void
}) {
  return (
    <MenubarMenu>
      <MenubarTrigger asChild>
        <Button variant="ghost" className="h-[30px] w-full rounded-none">
          <ArrowDownNarrowWide />
        </Button>
      </MenubarTrigger>

      <MenubarContent align="end" className="min-w-[144px]">
        {SORT_FILTER_ITEMS.map((item) => (
          <MenubarItem
            key={item.value}
            onClick={() => onSortSelect(item.value)}
            className={'flex items-center justify-between'}
          >
            <span>{item.label}</span>

            {selectedSort === item.value && <span>✓</span>}
          </MenubarItem>
        ))}
      </MenubarContent>
    </MenubarMenu>
  )
}
