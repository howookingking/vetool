import { Button } from '@/components/ui/button'
import { useSafeRefresh } from '@/hooks/use-realtime-refresh'
import useShortcutKey from '@/hooks/use-shortcut-key'
import { reorderDefaultOrders } from '@/lib/services/admin/icu/default-orders'
import { reorderOrders } from '@/lib/services/icu/chart/order-mutation'
import { cn, hasOrderSortingChanged } from '@/lib/utils/utils'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { ArrowUpDownIcon } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'
import { toast } from 'sonner'

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
  const safeRefresh = useSafeRefresh()

  const handleSortButtonClick = async () => {
    if (!isSorting) {
      toast.info('오더를 Drag & Drop 하여 순서를 변경해주세요', {
        description: '"CTRL + S" 또는 "ESC"를 눌러 순서 변경을 완료해주세요',
      })

      setIsSorting(true)
    }

    if (isSorting && !hasOrderSortingChanged(prevOrders, sortedOrders)) {
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

      toast.success('오더 순서를 변경하였습니다')

      !isDt && safeRefresh()
    }
  }

  useShortcutKey({
    key: 'Escape',
    ignoreInput: true,
    condition: isSorting,
    callback: handleSortButtonClick,
    requireCtrl: false,
  })

  useShortcutKey({
    key: 's',
    ignoreInput: true,
    callback: handleSortButtonClick,
  })

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        isSorting ? 'animate-pulse text-primary' : null,
        'hidden shrink-0 md:flex',
      )}
      onClick={handleSortButtonClick}
    >
      <ArrowUpDownIcon size={18} />
    </Button>
  )
}
