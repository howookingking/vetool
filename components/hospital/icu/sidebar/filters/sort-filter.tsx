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
      <MenubarTrigger asChild>
        <Button variant="ghost" className="h-[30px] w-full rounded-none">
          <ArrowDownNarrowWide />
        </Button>
      </MenubarTrigger>
      <MenubarContent align="center" className="min-w-[100px]">
        <MenubarItem onClick={() => onSortSelect('date')}>입원일순</MenubarItem>
        <MenubarItem onClick={() => onSortSelect('vet')}>수의사순</MenubarItem>
        <MenubarItem onClick={() => onSortSelect('name')}>
          환자 가나다순
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  )
}
