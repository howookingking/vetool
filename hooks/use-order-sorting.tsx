import { Kbd } from '@/components/ui/kbd'
import { useSafeRefresh } from '@/hooks/use-safe-refresh'
import useShortcutKey from '@/hooks/use-shortcut-key'
import { reorderDefaultOrders } from '@/lib/services/admin/icu/default-orders'
import { reorderOrders } from '@/lib/services/icu/chart/order-mutation'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { Sortable } from 'react-sortablejs'
import { toast } from 'sonner'

type Props = {
  initialOrders: SelectedIcuOrder[]
  type: 'chart' | 'template' | 'default'
  enabled?: boolean
}

export default function useOrderSorting({
  initialOrders,
  type,
  enabled = true,
}: Props) {
  const { refresh } = useRouter()

  const safeRefresh = useSafeRefresh()

  const [isSorting, setIsSorting] = useState(false)
  const [sortedOrders, setSortedOrders] =
    useState<SelectedIcuOrder[]>(initialOrders)

  useEffect(() => {
    setSortedOrders(initialOrders)
  }, [initialOrders])

  const handleOrderMove = (event: Sortable.SortableEvent) => {
    const newOrders = [...sortedOrders]
    const [movedOrder] = newOrders.splice(event.oldIndex as number, 1)
    newOrders.splice(event.newIndex as number, 0, movedOrder)
    setSortedOrders(newOrders)
  }

  const handleSortToggle = async () => {
    if (!isSorting) {
      toast.info('오더를 Drag & Drop 하여 순서를 변경해주세요', {
        description: (
          <>
            <Kbd>Ctrl </Kbd> + <Kbd>S</Kbd> 또는 <Kbd>Esc</Kbd>를 눌러 순서
            변경을 완료해주세요
          </>
        ),
      })

      setIsSorting(true)
      return
    }

    // If sorting, check if changed
    if (isSorting && !hasOrderSortingChanged(initialOrders, sortedOrders)) {
      setIsSorting(false)
      return
    }

    if (isSorting) {
      const orderIds = sortedOrders.map((order) => order.icu_chart_order_id)

      type === 'chart' && (await reorderOrders(orderIds))
      type === 'default' && (await reorderDefaultOrders(orderIds))

      setIsSorting(false)
      toast.success('오더 순서를 변경하였습니다')
      type === 'chart' && safeRefresh()
      type === 'default' && refresh()
    }
  }

  useShortcutKey({
    key: 'Escape',
    condition: isSorting && enabled,
    callback: handleSortToggle,
    requireCtrl: false,
  })

  useShortcutKey({
    key: 's',
    condition: enabled,
    ignoreInput: true,
    callback: handleSortToggle,
  })

  return {
    isSorting,
    sortedOrders,
    setSortedOrders,
    handleOrderMove,
    handleSortToggle,
  }
}

const hasOrderSortingChanged = (
  prevOrders: SelectedIcuOrder[],
  sortedOrders: SelectedIcuOrder[],
) => {
  return prevOrders.some(
    (order, index) =>
      order.icu_chart_order_id !== sortedOrders[index]?.icu_chart_order_id,
  )
}
