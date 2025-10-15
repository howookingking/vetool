'use client'

import DtOrderCreator from '@/components/hospital/common/default-template-order/dt-order-creator'
import DtOrderDialog from '@/components/hospital/common/default-template-order/dt-order-dialog'
import DtOrderRows from '@/components/hospital/common/default-template-order/dt-order-rows'
import DtSortingOrderRows from '@/components/hospital/common/default-template-order/dt-sorting-order-rows'
import DtTableHeader from '@/components/hospital/common/default-template-order/dt-table-header'
import UserKeyGuideMessage from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-body/order-creator/user-key-guide-message'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import useIsCommandPressed from '@/hooks/use-is-command-pressed'
import useLocalStorage from '@/hooks/use-local-storage'
import { upsertDefaultChartOrder } from '@/lib/services/admin/icu/default-orders'
import { useDtOrderStore } from '@/lib/store/icu/dt-order'
import { formatOrders } from '@/lib/utils/utils'
import type { OrderWidth } from '@/types/hospital/order'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function DefaultOrdersTable({
  defaultChartOrders,
}: {
  defaultChartOrders: SelectedIcuOrder[]
}) {
  const { hos_id } = useParams()
  const { refresh } = useRouter()

  const [orderWidth, setOrderWidth] = useLocalStorage<OrderWidth>(
    'orderWidth',
    400,
  )

  const isCommandPressed = useIsCommandPressed()

  const { orderTimePendingQueue, reset: resetOrderStore } = useDtOrderStore()

  const [isSorting, setIsSorting] = useState(false)
  const [sortedOrders, setSortedOrders] =
    useState<SelectedIcuOrder[]>(defaultChartOrders)

  useEffect(() => {
    setSortedOrders(defaultChartOrders)
  }, [defaultChartOrders])

  const handleUpsertOrderTime = async () => {
    const formattedOrders = formatOrders(orderTimePendingQueue)

    for (const order of formattedOrders) {
      const currentOrder = defaultChartOrders.find(
        (o) => o.order_id === order.orderId,
      )!

      const updatedOrderTimes = currentOrder.order_times.map(
        (ordererOrZero, index) =>
          order.orderTimes.includes(index)
            ? ordererOrZero === '0'
              ? '기본'
              : '0'
            : ordererOrZero,
      )

      await upsertDefaultChartOrder(
        hos_id as string,
        order.orderId,
        updatedOrderTimes,
        {
          default_chart_order_name: currentOrder.order_name,
          default_chart_order_comment: currentOrder.order_comment ?? '',
          default_chart_order_type: currentOrder.order_type,
          is_bordered: currentOrder.is_bordered,
        },
      )
    }

    toast.success('오더시간을 변경하였습니다')

    resetOrderStore()
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

  return (
    <div className="relative">
      <Table className="border">
        <DtTableHeader
          isSorting={isSorting}
          setIsSorting={setIsSorting}
          orderWidth={orderWidth}
          setOrderWidth={setOrderWidth}
          sortedOrders={sortedOrders}
          defaultChartOrders={defaultChartOrders}
        />

        {isSorting ? (
          <DtSortingOrderRows
            isSorting={isSorting}
            sortedOrders={sortedOrders}
            setSortedOrders={setSortedOrders}
            orderWidth={orderWidth}
          />
        ) : (
          <TableBody>
            <DtOrderRows
              sortedOrders={sortedOrders}
              isSorting={isSorting}
              orderwidth={orderWidth}
            />

            <TableRow className="hover:bg-transparent">
              <TableCell className="p-0">
                <DtOrderCreator sortedOrders={sortedOrders} />
              </TableCell>

              <UserKeyGuideMessage isDT />
            </TableRow>
          </TableBody>
        )}

        <DtOrderDialog
          setSortedOrders={setSortedOrders}
          isTemplate={false}
          isLastDefaultOrder={sortedOrders.length === 1}
        />
      </Table>
    </div>
  )
}
