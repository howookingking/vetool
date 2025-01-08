import { Button } from '@/components/ui/button'
import { MenubarMenu, MenubarTrigger } from '@/components/ui/menubar'
import { RotateCcw } from 'lucide-react'

export default function ResetFilters({
  resetFilters,
}: {
  resetFilters: () => void
}) {
  return (
    <MenubarMenu>
      <MenubarTrigger asChild>
        <Button
          variant="ghost"
          className="h-[30px] w-full rounded-l-none"
          onClick={resetFilters}
        >
          <RotateCcw />
        </Button>
      </MenubarTrigger>
    </MenubarMenu>
  )
}
