'use client'

import DtOrderCreator from '@/components/hospital/common/default-template-order/dt-order-creator'
import DtOrderDialog from '@/components/hospital/common/default-template-order/dt-order-dialog'
import DtOrderRows from '@/components/hospital/common/default-template-order/dt-order-rows'
import DtSortingOrderRows from '@/components/hospital/common/default-template-order/dt-sorting-order-rows'
import DtTableHeader from '@/components/hospital/common/default-template-order/dt-table-header'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { toast } from '@/components/ui/use-toast'
import useIsCommandPressed from '@/hooks/use-is-command-pressed'
import useLocalStorage from '@/hooks/use-local-storage'
import { upsertDefaultChartOrder } from '@/lib/services/admin/icu/default-orders'
import { useDefaultOrderStore } from '@/lib/store/icu/dt-order'
import { cn, formatOrders } from '@/lib/utils/utils'
import { IcuOrderColors } from '@/types/adimin'
import type { OrderWidth } from '@/types/hospital/order'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type Props = {
  defaultChartOrders: SelectedIcuOrder[]
  isSetting?: boolean
  localColorState?: IcuOrderColors
  localColorDisplayMethod?: 'dot' | 'full'
}

export default function DefaultOrdersTable({
  defaultChartOrders,
  isSetting,
  localColorState,
  localColorDisplayMethod,
}: Props) {
  const { hos_id } = useParams()
  const { refresh } = useRouter()

  const [orderWidth, setOrderWidth] = useLocalStorage<OrderWidth>(
    'orderWidth',
    400,
  )

  const isCommandPressed = useIsCommandPressed()

  const { orderTimePendingQueue, reset: resetOrderStore } =
    useDefaultOrderStore()

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
      )
      if (!currentOrder) continue

      const updatedOrderTimes = currentOrder.order_times.map((time, index) =>
        order.orderTimes.includes(index + 1)
          ? time === '0'
            ? '1'
            : '0'
          : time,
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
    toast({
      title: '오더시간을 변경하였습니다',
    })
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
    <Table className="border">
      <DtTableHeader
        isSorting={isSorting}
        orderWidth={orderWidth}
        setOrderWidth={setOrderWidth}
        sortedOrders={sortedOrders}
        setIsSorting={setIsSorting}
        defaultChartOrders={defaultChartOrders}
        isSetting={isSetting}
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
            isSetting={isSetting}
            localColorState={localColorState}
            localColorDisplayMethod={localColorDisplayMethod}
          />

          <TableRow
            className={cn('hover:bg-transparent', isSetting && 'hidden')}
          >
            <TableCell className="p-0">
              <DtOrderCreator sortedOrders={sortedOrders} />
            </TableCell>
          </TableRow>
        </TableBody>
      )}

      <DtOrderDialog
        setSortedOrders={setSortedOrders}
        isTemplate={false}
        isLastDefaultOrder={sortedOrders.length === 1}
      />
    </Table>
  )
}
