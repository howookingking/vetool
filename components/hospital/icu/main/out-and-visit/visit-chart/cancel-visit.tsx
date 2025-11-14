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
import type { VisitChart } from '@/constants/hospital/icu/chart/out-and-visit'
import { updateVisitChart } from '@/lib/services/icu/out-and-visit/icu-visit-chart'
import { X } from 'lucide-react'
import { toast } from 'sonner'

type Props = {
  icuChartId: string
  visitChart: VisitChart
}

export function CancelVisit({ icuChartId, visitChart }: Props) {
  const isDone = visitChart.is_done

  const handleUpdateOutDueDate = async () => {
    await updateVisitChart(icuChartId, null)

    toast.success('퇴원 예정을 취소하였습니다')
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" disabled={isDone}>
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
