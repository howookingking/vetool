import { Button } from '@/components/ui/button'
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar'
import { ArrowDownNarrowWide } from 'lucide-react'

export default function SortFilter({
  onSortSelect,
}: {
  onSortSelect: (value: string) => void
}) {
  return (
    <MenubarMenu>
      <MenubarTrigger className="flex w-full justify-center gap-1" asChild>
        <Button variant="ghost" size="icon">
          <ArrowDownNarrowWide />
        </Button>
      </MenubarTrigger>
      <MenubarContent align="end">
        <MenubarItem onClick={() => onSortSelect('date')}>입원일순</MenubarItem>
        <MenubarItem onClick={() => onSortSelect('vet')}>수의사순</MenubarItem>
        <MenubarItem onClick={() => onSortSelect('name')}>
          환자 가나다순
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  )
}
