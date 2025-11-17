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
import { Spinner } from '@/components/ui/spinner'
import { useSafeRefresh } from '@/hooks/use-realtime-refresh'
import { cancelOutDue } from '@/lib/services/icu/out-and-visit/icu-out-chart'
import { X } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

type Props = {
  icuIoId: string
  isDischarged: boolean
}

export function CancelOutDue({ icuIoId, isDischarged }: Props) {
  const safeRefresh = useSafeRefresh()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleUpdateOutDueDate = async () => {
    setIsDeleting(true)

    await cancelOutDue(icuIoId)

    toast.success('퇴원예정을 취소하였습니다')

    setIsDeleting(false)
    setIsDialogOpen(false)
    safeRefresh()
  }

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" disabled={isDischarged}>
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

          <AlertDialogAction
            onClick={handleUpdateOutDueDate}
            disabled={isDeleting}
          >
            예정취소 {isDeleting && <Spinner />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
