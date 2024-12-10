import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import useShorcutKey from '@/hooks/use-shortcut-key'
import { reorderOrders } from '@/lib/services/icu/chart/order-mutation'
import { cn, hasOrderSortingChanges } from '@/lib/utils/utils'
import { SelectedChart, SelectedIcuOrder } from '@/types/icu/chart'
import { ArrowUpDown } from 'lucide-react'
import React, { useCallback } from 'react'

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
    if (!isSorting) {
      toast({
        title: '오더를 드래그 앤 드롭하여 순서를 변경해주세요',
      })
      setIsSorting(true)
    }
    if (isSorting && !hasOrderSortingChanges(chartData.orders, sortedOrders)) {
      setIsSorting(false)
      return
    }
    if (isSorting) {
      const orderIds = sortedOrders.map((order) => order.order_id)
      await reorderOrders(orderIds)
      setIsSorting(false)
      toast({ title: '오더 순서를 변경하였습니다' })
    }
  }, [chartData.orders, isSorting, sortedOrders, setIsSorting])

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
