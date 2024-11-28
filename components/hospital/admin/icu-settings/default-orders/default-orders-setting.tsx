/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import NoResultSquirrel from '@/components/common/no-result-squirrel'
import DefaultOrderForm from '@/components/hospital/admin/icu-settings/default-orders/default-order-form'
import SortableOrderWrapper from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/sortable-order-wrapper'
import AddTemplateDialog from '@/components/hospital/icu/main/template/add/table/add-template-dialog'
import AddTemplateHeader from '@/components/hospital/icu/main/template/add/table/add-template-header'
import AddTemplateRow from '@/components/hospital/icu/main/template/add/table/add-template-row'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { toast } from '@/components/ui/use-toast'
import { reorderDefaultOrders } from '@/lib/services/admin/icu/default-orders'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { hasOrderSortingChanges } from '@/lib/utils/utils'
import type { IcuOrderColors } from '@/types/adimin'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Sortable } from 'react-sortablejs'

export default function DefaultOrdersSetting({
  defaultChartOrders,
  orderColorsData,
}: {
  defaultChartOrders: SelectedIcuOrder[] | []
  orderColorsData: IcuOrderColors
}) {
  const lastOrderRef = useRef<HTMLTableCellElement>(null)
  const { refresh } = useRouter()
  const {
    orderStep,
    setOrderStep,
    setSelectedChartOrder,
    isEditOrderMode,
    setIsEditOrderMode,
    reset,
  } = useIcuOrderStore()
  const [isSorting, setIsSorting] = useState(false)
  const [sortedOrders, setSortedOrders] =
    useState<SelectedIcuOrder[]>(defaultChartOrders)

  useEffect(() => {
    setSortedOrders(defaultChartOrders)
  }, [defaultChartOrders])

  const handleOpenChange = useCallback(() => {
    if (orderStep === 'closed') {
      setOrderStep('upsert')
    } else {
      setOrderStep('closed')
    }
    reset()
  }, [orderStep, setOrderStep, reset])

  const handleEditOrderDialogOpen = (order: Partial<SelectedIcuOrder>) => {
    setOrderStep('upsert')
    setIsEditOrderMode(true)
    setSelectedChartOrder(order)
  }

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

  return (
    <Table className="h-full max-w-3xl border">
      <AddTemplateHeader isSorting={isSorting} onClick={handleSortButtonClick}>
        <AddTemplateDialog
          isOpen={orderStep !== 'closed'}
          onOpenChange={handleOpenChange}
          isEditOrderMode={isEditOrderMode}
        >
          <DefaultOrderForm />
        </AddTemplateDialog>
      </AddTemplateHeader>

      {isSorting ? (
        <SortableOrderWrapper
          orders={sortedOrders}
          onOrdersChange={setSortedOrders}
          onSortEnd={handleReorder}
        >
          {sortedOrders.map((order, index) => (
            <AddTemplateRow
              key={order.order_id}
              order={order}
              index={index}
              orderColors={orderColorsData}
              onEdit={handleEditOrderDialogOpen}
              orderRef={lastOrderRef}
              isSorting={isSorting}
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
              <AddTemplateRow
                key={index}
                order={order}
                index={index}
                orderColors={orderColorsData}
                onEdit={handleEditOrderDialogOpen}
                orderRef={lastOrderRef}
              />
            ))
          )}
        </TableBody>
      )}
    </Table>
  )
}
