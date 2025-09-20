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
import { updateOutDueDate } from '@/lib/services/icu/chart/update-icu-chart-infos'
import { X } from 'lucide-react'
import { toast } from 'sonner'

export function CancelOutDue({
  icuIoId,
  isDischarged,
}: {
  icuIoId: string
  isDischarged: boolean
}) {
  const handleUpdateOutDueDate = async () => {
    await updateOutDueDate(icuIoId, null)

    toast.success('퇴원예정일을 취소하였습니다')
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-red-500"
          disabled={isDischarged}
        >
          <X size={18} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>퇴원예정을 취소하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            퇴원예정일이 미정으로 변경됩니다
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>아니오</AlertDialogCancel>
          <AlertDialogAction onClick={handleUpdateOutDueDate}>
            예정취소
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
