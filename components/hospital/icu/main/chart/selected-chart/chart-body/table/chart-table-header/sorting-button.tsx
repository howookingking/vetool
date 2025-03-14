import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import useShorcutKey from '@/hooks/use-shortcut-key'
import { reorderDefaultOrders } from '@/lib/services/admin/icu/default-orders'
import { reorderOrders } from '@/lib/services/icu/chart/order-mutation'
import { cn, hasOrderSortingChanges } from '@/lib/utils/utils'
import { type SelectedIcuOrder } from '@/types/icu/chart'
import { ArrowUpDown } from 'lucide-react'
import { type Dispatch, type SetStateAction } from 'react'

type SortingButtonProps = {
  isSorting: boolean
  prevOrders: SelectedIcuOrder[]
  sortedOrders: SelectedIcuOrder[]
  setIsSorting: Dispatch<SetStateAction<boolean>>
  isDt?: boolean
}

export default function SortingButton({
  isSorting,
  prevOrders,
  sortedOrders,
  setIsSorting,
  isDt,
}: SortingButtonProps) {
  const handleSortButtonClick = async () => {
    if (!isSorting) {
      toast({
        title: '오더를 Drag & Drop 하여 순서를 변경해주세요',
      })
      setIsSorting(true)
    }
    if (isSorting && !hasOrderSortingChanges(prevOrders, sortedOrders)) {
      setIsSorting(false)
      return
    }
    if (isSorting) {
      const orderIds = sortedOrders.map((order) => order.order_id)

      // default, template
      isDt
        ? await reorderDefaultOrders(orderIds)
        : await reorderOrders(orderIds)

      setIsSorting(false)
      toast({ title: '오더 순서를 변경하였습니다' })
    }
  }

  useShorcutKey({
    keys: ['s'],
    ignoreInput: true,
    callback: handleSortButtonClick,
  })

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(isSorting && 'animate-pulse text-primary', 'shrink-0')}
      onClick={handleSortButtonClick}
    >
      <ArrowUpDown size={18} />
    </Button>
  )
}
