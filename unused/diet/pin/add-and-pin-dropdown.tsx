import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import AddDietDialog from '../add-diet-dialog'
import AddEntireDietDialog from './add-entire-diet-dialog'

export default function AddAndPinDropDown({ hosId }: { hosId: string }) {
  const [isSingleAddDialogOpen, setIsSingleAddDialogOpen] = useState(false)
  const [isEntireAddDialogOpen, setIsEntireAddDialogOpen] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" className="h-6 w-6 rounded-full">
            <Plus size={18} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setIsSingleAddDialogOpen(true)}>
            사료 정보 직접 추가
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsEntireAddDialogOpen(true)}>
            벳툴 사료 전부 등록
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AddDietDialog
        isOpen={isSingleAddDialogOpen}
        onOpenChange={setIsSingleAddDialogOpen}
      />

      <AddEntireDietDialog
        isDialogOpen={isEntireAddDialogOpen}
        setIsDialogOpen={setIsEntireAddDialogOpen}
        hosId={hosId}
      />
    </>
  )
}
