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
import { toast } from '@/components/ui/use-toast'
import { deleteVisitPatient } from '@/lib/services/icu/out-and-visit/icu-out-chart'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

export function CancelVisit({
  visitId,
  isDone,
}: {
  visitId: string
  isDone: boolean
}) {
  const { refresh } = useRouter()
  const handleUpdateOutDueDate = useCallback(async () => {
    await deleteVisitPatient(visitId)

    toast({
      title: '퇴원예정일을 취소하였습니다',
    })
    refresh()
  }, [refresh, visitId])

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-red-500"
          disabled={isDone}
        >
          <X size={18} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>면회예정을 취소하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            면회리스트에서 제거됩니다
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
