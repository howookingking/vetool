/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import NoResultSquirrel from '@/components/common/no-result-squirrel'
import OrderDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/order-dialog'
import SortableOrderWrapper from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/sortable-order-wrapper'
import OrderListHeader from '@/components/hospital/icu/main/template/add/table/add-template-header'
import OrderRow from '@/components/hospital/icu/main/template/add/table/add-template-row'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { toast } from '@/components/ui/use-toast'
import { reorderDefaultOrders } from '@/lib/services/admin/icu/default-orders'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { hasOrderSortingChanges } from '@/lib/utils/utils'
import type { IcuOrderColors } from '@/types/adimin'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { Sortable } from 'react-sortablejs'

export default function DefaultOrdersTable({
  hosId,
  defaultChartOrders,
  orderColorsData,
}: {
  hosId: string
  defaultChartOrders: SelectedIcuOrder[] | []
  orderColorsData: IcuOrderColors
}) {
  const { refresh } = useRouter()
  const { orderStep, setOrderStep, setOrderMode, reset } = useIcuOrderStore()
  const [isSorting, setIsSorting] = useState(false)
  const [sortedOrders, setSortedOrders] =
    useState<SelectedIcuOrder[]>(defaultChartOrders)

  useEffect(() => {
    setSortedOrders(defaultChartOrders)
  }, [defaultChartOrders])

  const handleOpenChange = useCallback(() => {
    if (orderStep === 'closed') {
      setOrderStep('upsert')
      setOrderMode('default')
      refresh()
    } else {
      setOrderStep('closed')
    }
    reset()
  }, [orderStep, setOrderStep, reset, refresh])

  const handleSortButtonClick = async () => {
    if (
      (isSorting &&
        !hasOrderSortingChanges(sortedOrders, defaultChartOrders)) ||
      !sortedOrders.length
    ) {
      setIsSorting(!isSorting)
      return
    }

    if (isSorting) {
      const orderIds = sortedOrders.map((order) => order.order_id)

      await reorderDefaultOrders(orderIds)

      toast({
        title: '오더 목록을 변경하였습니다',
      })
    }

    setIsSorting(!isSorting)
    refresh()
  }

  const handleReorder = async (event: Sortable.SortableEvent) => {
    const newOrders = [...sortedOrders]
    const [movedOrder] = newOrders.splice(event.oldIndex as number, 1)

    newOrders.splice(event.newIndex as number, 0, movedOrder)
    setSortedOrders(newOrders)
  }

  useEffect(() => {
    if (orderStep === 'closed') {
      refresh()
    }
  }, [orderStep])

  return (
    <Table className="h-full max-w-3xl border">
      <OrderListHeader isSorting={isSorting} onClick={handleSortButtonClick}>
        <OrderDialog
          hosId={hosId}
          orderStep={orderStep}
          onOpenChange={handleOpenChange}
        />
      </OrderListHeader>

      {isSorting ? (
        <SortableOrderWrapper
          orders={sortedOrders}
          onOrdersChange={setSortedOrders}
          onSortEnd={handleReorder}
        >
          {sortedOrders.map((order, index) => (
            <OrderRow
              key={order.order_id}
              order={order}
              index={index}
              orderColors={orderColorsData}
              isSorting={isSorting}
              isTemplate
            />
          ))}
        </SortableOrderWrapper>
      ) : (
        <TableBody>
          {!sortedOrders.length ? (
            <TableRow className="h-[360px]">
              <TableCell className="text-center" colSpan={5}>
                <NoResultSquirrel text="기본차트 오더를 추가해주세요" />
              </TableCell>
            </TableRow>
          ) : (
            sortedOrders.map((order, index) => (
              <OrderRow
                key={index}
                order={order}
                index={index}
                orderColors={orderColorsData}
                isTemplate
              />
            ))
          )}
        </TableBody>
      )}
    </Table>
  )
}
