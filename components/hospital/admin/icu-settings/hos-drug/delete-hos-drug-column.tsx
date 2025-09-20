import WarningMessage from '@/components/common/warning-message'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { deleteHosDrug } from '@/lib/services/admin/icu/hos-drugs'
import { cn } from '@/lib/utils/utils'
import { LoaderCircle, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

type Props = {
  hosDrugId: string
  hosDrugName: string
}

export function DeleteHosDrugColumn({ hosDrugId, hosDrugName }: Props) {
  const { refresh } = useRouter()

  const [isDeleting, setIsDeleting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleDeleteStaff = async () => {
    setIsDeleting(true)

    await deleteHosDrug(hosDrugId)

    toast.success(`${hosDrugName} 삭제하였습니다`)

    setIsDeleting(false)
    setIsDialogOpen(false)
    refresh()
  }

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trash2 size={14} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{hosDrugName} 삭제</AlertDialogTitle>
          <AlertDialogDescription>
            {hosDrugName}을(룰) 자주 사용하는 주사약물 목록에 삭제하시겠습니까?
            <WarningMessage text="해당 작업은 되돌릴 수 없습니다" />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive/80"
            disabled={isDeleting}
            onClick={handleDeleteStaff}
          >
            삭제
            <LoaderCircle
              className={cn(isDeleting ? 'ml-2 animate-spin' : 'hidden')}
            />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
