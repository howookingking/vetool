import NoResultSquirrel from '@/components/common/no-result-squirrel'
import OrderDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/order-dialog'
import SortableOrderWrapper from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/sortable-order-wrapper'
import OrderListHeader from '@/components/hospital/icu/main/template/add/table/add-template-header'
import OrderRow from '@/components/hospital/icu/main/template/add/table/add-template-row'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { toast } from '@/components/ui/use-toast'
import { reorderOrders } from '@/lib/services/icu/chart/order-mutation'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { useTemplateStore } from '@/lib/store/icu/template'
import { hasOrderSortingChanges } from '@/lib/utils/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { useParams } from 'next/navigation'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { Sortable } from 'react-sortablejs'

export default function TemplateOrdersTable({
  isSorting,
  setIsSorting,
  initialOrders,
  isEditTemplateMode = false,
}: {
  isSorting: boolean
  setIsSorting: Dispatch<SetStateAction<boolean>>
  initialOrders?: Partial<SelectedIcuOrder>[]
  isEditTemplateMode?: boolean
}) {
  const { hos_id } = useParams()
  const { templateOrders, setTemplateOrders } = useTemplateStore()
  const { orderStep, setOrderStep, reset, setOrderMode } = useIcuOrderStore()
  const {
    basicHosData: { orderColorsData },
  } = useBasicHosDataContext()
  const [sortedOrders, setSortedOrders] = useState<SelectedIcuOrder[]>([])

  useEffect(() => {
    if (Array.isArray(templateOrders)) {
      const orders = templateOrders

      setSortedOrders(orders as SelectedIcuOrder[])
    } else {
      setSortedOrders([])
    }
  }, [templateOrders])

  const handleOpenChange = useCallback(() => {
    if (orderStep === 'closed') {
      setOrderStep('upsert')
      setOrderMode('template')
    } else {
      setOrderStep('closed')
    }
    reset()
  }, [orderStep, setOrderStep, reset])

  const handleSortButtonClick = async () => {
    // 오더가 없다면 버튼 작동 X
    if (!sortedOrders.length) return

    // 최초 오더와 변경한 오더의 차이가 없다면 reorder X 버튼만 toggle
    if (
      !hasOrderSortingChanges(initialOrders as SelectedIcuOrder[], sortedOrders)
    ) {
      setIsSorting(!isSorting)
      return
    }

    // 오더 수정 중 정렬하면 reorder 통신
    if (isSorting && isEditTemplateMode) {
      const orderIds = sortedOrders.map((order) => order.order_id)
      await reorderOrders(orderIds)
      setIsSorting(!isSorting)

      toast({
        title: '오더 목록을 변경하였습니다',
      })
    }

    setIsSorting(!isSorting)
  }

  const handleReorder = async (event: Sortable.SortableEvent) => {
    const newOrders = [...sortedOrders]
    const [movedOrder] = newOrders.splice(event.oldIndex as number, 1)

    newOrders.splice(event.newIndex as number, 0, movedOrder)
    setSortedOrders(newOrders)
    setTemplateOrders(newOrders)
  }

  return (
    <Table className="h-full max-w-3xl border">
      <OrderListHeader isSorting={isSorting!} onClick={handleSortButtonClick}>
        <OrderDialog
          hosId={hos_id as string}
          orderStep={orderStep}
          onOpenChange={handleOpenChange}
          isEditTemplateMode={isEditTemplateMode}
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
              key={index}
              order={order}
              index={index}
              orderColors={orderColorsData}
              isSorting
              isTemplate
            />
          ))}
        </SortableOrderWrapper>
      ) : (
        <TableBody>
          {!sortedOrders.length ? (
            <TableRow className="h-[360px]">
              <TableCell className="text-center" colSpan={5}>
                <NoResultSquirrel text="저장할 오더를 추가해주세요" />
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
