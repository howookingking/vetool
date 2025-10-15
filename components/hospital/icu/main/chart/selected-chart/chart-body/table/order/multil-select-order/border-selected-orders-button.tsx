import { Button } from '@/components/ui/button'
import { updateIsBordered } from '@/lib/services/icu/chart/order-mutation'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { SquareIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

export default function BorderSelectedOrdersButton({
  setIsMultiSelectOrderActionDialogOpen,
}: {
  setIsMultiSelectOrderActionDialogOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >
}) {
  const { refresh } = useRouter()

  const { selectedOrderPendingQueue, reset: orderReset } = useIcuOrderStore()

  const handleBorderOrder = async () => {
    selectedOrderPendingQueue.forEach(async (order) => {
      await updateIsBordered(order.order_id!, order.is_bordered!)
    })

    toast.success('오더 테두리를 변경하였습니다')

    setIsMultiSelectOrderActionDialogOpen(false)
    orderReset()
    refresh()
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
