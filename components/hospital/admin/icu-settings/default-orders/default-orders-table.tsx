'use client'

import DtOrderCreator from '@/components/hospital/common/default-template-order/dt-order-creator'
import DtOrderRows from '@/components/hospital/common/default-template-order/dt-order-rows'
import DtSortingOrderRows from '@/components/hospital/common/default-template-order/dt-sorting-order-rows'
import DtTableHeader from '@/components/hospital/common/default-template-order/dt-table-header'
import UserKeyGuideMessage from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-body/order-creator/user-key-guide-message'
import type { OrderWidth } from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-header/order-width-button'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import useIsCommandPressed from '@/hooks/use-is-command-pressed'
import useLocalStorage from '@/hooks/use-local-storage'
import useOrderSorting from '@/hooks/use-order-sorting'
import {
  HosDefaultChartOrder,
  upsertDefaultChartOrder,
} from '@/lib/services/admin/icu/default-orders'
import { useDtOrderTimePendingQueueStore } from '@/lib/store/icu/dt-order'
import { formatOrders } from '@/lib/utils/utils'
import { SelectedIcuOrder } from '@/types/icu/chart'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'

type Props = {
  defaultChartOrders: HosDefaultChartOrder[]
  hosId: string
}

export default function DefaultOrdersTable({
  defaultChartOrders,
  hosId,
}: Props) {
  const { refresh } = useRouter()

  const [orderWidth, setOrderWidth] = useLocalStorage<OrderWidth>(
    'orderWidth',
    400,
  )

  const isCommandPressed = useIsCommandPressed()

  const { orderTimePendingQueue, resetTimePendingQueue } =
    useDtOrderTimePendingQueueStore()

  const handleUpsertOrderTime = async () => {
    const formattedOrders = formatOrders(orderTimePendingQueue)

    for (const order of formattedOrders) {
      const currentOrder = defaultChartOrders.find(
        (o) => o.icu_chart_order_id === order.orderId,
      )!

      const updatedOrderTimes = currentOrder.icu_chart_order_time.map(
        (ordererOrZero, index) =>
          order.orderTimes.includes(index)
            ? ordererOrZero === '0'
              ? '기본'
              : '0'
            : ordererOrZero,
      )

      await upsertDefaultChartOrder(hosId, order.orderId, updatedOrderTimes, {
        icu_chart_order_name: currentOrder.icu_chart_order_name,
        icu_chart_order_comment: currentOrder.icu_chart_order_comment ?? '',
        icu_chart_order_type: currentOrder.icu_chart_order_type,
        is_bordered: currentOrder.is_bordered,
      })
    }

    toast.success('오더시간을 변경하였습니다')

    resetTimePendingQueue()
    refresh()
  }

  useEffect(() => {
    if (!isCommandPressed) {
      if (orderTimePendingQueue.length >= 1) {
        handleUpsertOrderTime()
      }
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [isCommandPressed])

  const {
    isSorting,
    sortedOrders,
    setSortedOrders,
    handleOrderMove,
    handleSortToggle,
  } = useOrderSorting({
    initialOrders: defaultChartOrders as SelectedIcuOrder[],
    type: 'default',
  })

  return (
    <div className="relative">
      <Table className="border">
        <DtTableHeader
          onSortToggle={handleSortToggle}
          isSorting={isSorting}
          orderWidth={orderWidth}
          setOrderWidth={setOrderWidth}
        />

        {isSorting ? (
          <DtSortingOrderRows
            orderWidth={orderWidth}
            isSorting={isSorting}
            sortedOrders={sortedOrders}
            setSortedOrders={setSortedOrders}
            onOrderMove={handleOrderMove}
            hosId={hosId}
          />
        ) : (
          <TableBody>
            <DtOrderRows
              sortedOrders={sortedOrders}
              isSorting={isSorting}
              orderWidth={orderWidth}
              setSortedOrders={setSortedOrders}
              hosId={hosId}
            />

            <TableRow className="hover:bg-transparent">
              <TableCell className="p-0">
                <DtOrderCreator
                  sortedOrders={sortedOrders}
                  hosId={hosId}
                  setSortedOrders={setSortedOrders}
                />
              </TableCell>

              <UserKeyGuideMessage isDT />
            </TableRow>
          </TableBody>
        )}
      </Table>
    </div>
  )
}
