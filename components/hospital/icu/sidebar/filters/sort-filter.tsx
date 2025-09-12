import { Button } from '@/components/ui/button'
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar'
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

      <MenubarContent align="start" className="min-w-[120px]">
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

const SORT_FILTER_ITEMS = [
  { label: '입원일순', value: 'date' },
  { label: '수의사순', value: 'vet' },
  { label: '가나다순', value: 'name' },
  { label: '응급도순', value: 'urgency' },
] as const
