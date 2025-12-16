import { Button } from '@/components/ui/button'
import { useSafeRefresh } from '@/hooks/use-realtime-refresh'
import { updateIsBordered } from '@/lib/services/icu/chart/order-mutation'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { SquareIcon } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'
import { toast } from 'sonner'

type Props = {
  setIsMultiOrderDialogOpen: Dispatch<SetStateAction<boolean>>
  multiOrderPendingQueue: Partial<SelectedIcuOrder>[]
  setMultiOrderPendingQueue: Dispatch<
    SetStateAction<Partial<SelectedIcuOrder>[]>
  >
}

export default function BorderSelectedOrdersButton({
  setIsMultiOrderDialogOpen,
  multiOrderPendingQueue,
  setMultiOrderPendingQueue,
}: Props) {
  const safeRefresh = useSafeRefresh()

  const handleBorderOrder = async () => {
    multiOrderPendingQueue.forEach(
      async (order) =>
        await updateIsBordered(order.icu_chart_order_id!, order.is_bordered!),
    )

    toast.success('오더 테두리를 변경하였습니다')

    setIsMultiOrderDialogOpen(false)
    setMultiOrderPendingQueue([])
    safeRefresh()
  }

  return (
    <Button
      onClick={handleBorderOrder}
      className="flex items-center justify-start gap-2 py-5 text-base"
      variant="outline"
    >
      <SquareIcon />
      테두리 변경
    </Button>
  )
}
