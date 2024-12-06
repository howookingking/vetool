import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { reorderOrders } from '@/lib/services/icu/chart/order-mutation'
import { cn, hasOrderSortingChanges } from '@/lib/utils/utils'
import { SelectedChart, SelectedIcuOrder } from '@/types/icu/chart'
import { ArrowUpDown } from 'lucide-react'
import React, { useCallback, useEffect } from 'react'

export default function SortingButton({
  isSorting,
  chartData,
  sortedOrders,
  setIsSorting,
}: {
  isSorting: boolean
  chartData: SelectedChart
  sortedOrders: SelectedIcuOrder[]
  setIsSorting: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const handleSortButtonClick = useCallback(async () => {
    if (isSorting && !hasOrderSortingChanges(chartData.orders, sortedOrders)) {
      setIsSorting(false)
      return
    }

    if (isSorting) {
      const orderIds = sortedOrders.map((order) => order.order_id)

      await reorderOrders(orderIds)
      toast({ title: '오더 순서를 변경하였습니다' })
    }

    setIsSorting((prev) => !prev)
  }, [chartData.orders, isSorting, sortedOrders, setIsSorting])

  // --- sorting mode in / out keyboard shortcut ----
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault()
        handleSortButtonClick()
      }

      if (isSorting && event.key === 'Escape') {
        event.preventDefault()
        handleSortButtonClick()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleSortButtonClick, isSorting])
  // --- sorting mode in / out keyboard shortcut ----

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
