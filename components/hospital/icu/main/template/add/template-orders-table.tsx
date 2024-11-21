import NoResultSquirrel from '@/components/common/no-result-squirrel'
import SortableOrderWrapper from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/sortable-order-wrapper'
import AddTemplateDialog from '@/components/hospital/icu/main/template/add/table/add-template-dialog'
import AddTemplateHeader from '@/components/hospital/icu/main/template/add/table/add-template-header'
import AddTemplateRow from '@/components/hospital/icu/main/template/add/table/add-template-row'
import TemplateOrderForm from '@/components/hospital/icu/main/template/add/template-order-form'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { toast } from '@/components/ui/use-toast'
import { reorderOrders } from '@/lib/services/icu/chart/order-mutation'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { useTemplateStore } from '@/lib/store/icu/template'
import { hasOrderSortingChanges } from '@/lib/utils/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Sortable } from 'react-sortablejs'

export default function TemplateOrdersTable({
  isSorting,
  setIsSorting,
  initialOrders,
  editTemplateMode = false,
}: {
  isSorting: boolean
  setIsSorting: Dispatch<SetStateAction<boolean>>
  initialOrders?: Partial<SelectedIcuOrder>[]
  editTemplateMode?: boolean
}) {
  const orderRef = useRef<HTMLTableCellElement>(null)
  const { templateOrders, setTemplateOrders, setOrderIndex } =
    useTemplateStore()
  const {
    orderStep,
    setOrderStep,
    setSelectedChartOrder,
    isEditOrderMode,
    setIsEditOrderMode,
    reset,
  } = useIcuOrderStore()
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
    } else {
      setOrderStep('closed')
    }
    reset()
  }, [orderStep, setOrderStep, reset])

  const handleEditOrderDialogOpen = (
    order: Partial<SelectedIcuOrder>,
    index?: number,
  ) => {
    setOrderStep('upsert')
    setIsEditOrderMode(true)
    setSelectedChartOrder(order)
    setOrderIndex(index)
  }

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
    if (isSorting && editTemplateMode) {
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
    <Table className="h-full border">
      <AddTemplateHeader isSorting={isSorting!} onClick={handleSortButtonClick}>
        <AddTemplateDialog
          isOpen={orderStep !== 'closed'}
          onOpenChange={handleOpenChange}
          isEditOrderMode={isEditOrderMode}
        >
          <TemplateOrderForm editTemplateMode={editTemplateMode} />
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
              key={index}
              order={order}
              index={index}
              orderColors={orderColorsData}
              onEdit={() => handleEditOrderDialogOpen(order, index)}
              orderRef={orderRef}
              isSorting
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
              <AddTemplateRow
                key={index}
                order={order}
                index={index}
                orderColors={orderColorsData}
                onEdit={() => handleEditOrderDialogOpen(order, index)}
                orderRef={orderRef}
              />
            ))
          )}
        </TableBody>
      )}
    </Table>
  )
}
