/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import NoResultSquirrel from '@/components/common/no-result-squirrel'
import SortableOrderWrapper from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/sortable-order-wrapper'
import DtOrderDialog from '@/components/hospital/common/default-template-order/dt-order-dialog'
import DtOrderForm from '@/components/hospital/common/default-template-order/dt-order-form'
import DtOrderTableHeader from '@/components/hospital/common/default-template-order/dt-order-table-header'
import DtOrderTableRow from '@/components/hospital/common/default-template-order/dt-order-table-row'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { toast } from '@/components/ui/use-toast'
import { reorderDefaultOrders } from '@/lib/services/admin/icu/default-orders'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { hasOrderSortingChanges } from '@/lib/utils/utils'
import { type SelectedIcuOrder } from '@/types/icu/chart'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Sortable } from 'react-sortablejs'

type DefaultOrdersTableProps = {
  defaultChartOrders: SelectedIcuOrder[]
}

export default function DefaultOrdersTable({
  defaultChartOrders,
}: DefaultOrdersTableProps) {
  const { refresh } = useRouter()

  const { orderStep, setOrderStep, setSelectedChartOrder, reset } =
    useIcuOrderStore()

  const [sortedOrders, setSortedOrders] =
    useState<SelectedIcuOrder[]>(defaultChartOrders)
  const [isSorting, setIsSorting] = useState(false)
  const lastOrderRef = useRef<HTMLTableCellElement>(null)

  useEffect(() => {
    setSortedOrders(defaultChartOrders)
  }, [defaultChartOrders])

  const handleOpenChange = () => {
    if (orderStep === 'closed') {
      setOrderStep('edit')
    } else {
      setOrderStep('closed')
    }
    reset()
  }

  const handleEditOrderDialogOpen = (order: Partial<SelectedIcuOrder>) => {
    setOrderStep('edit')
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
    <Table className="border">
      <DtOrderTableHeader isSorting={isSorting} onClick={handleSortButtonClick}>
        <DtOrderDialog
          isOpen={orderStep !== 'closed'}
          onOpenChange={handleOpenChange}
        >
          <DtOrderForm mode="default" />
        </DtOrderDialog>
      </DtOrderTableHeader>

      {isSorting ? (
        <SortableOrderWrapper
          orders={sortedOrders}
          onOrdersChange={setSortedOrders}
          onSortEnd={handleReorder}
        >
          {sortedOrders.map((order, index) => (
            <DtOrderTableRow
              key={order.order_id}
              order={order}
              sortedOrders={sortedOrders}
              index={index}
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
              <DtOrderTableRow
                key={index}
                order={order}
                sortedOrders={sortedOrders}
                index={index}
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
