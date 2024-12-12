import OrderRowCells from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-body/order-row-cells'
import OrderRowTitle from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-body/order-row-title'
import { TableRow } from '@/components/ui/table'
import { toast } from '@/components/ui/use-toast'
import useShorcutKey from '@/hooks/use-shortcut-key'
import {
  OrderTimePendingQueue,
  useIcuOrderStore,
} from '@/lib/store/icu/icu-order'
import { useTxMutationStore } from '@/lib/store/icu/tx-mutation'
import type { VitalRefRange } from '@/types/adimin'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { RefObject } from 'react'

type CellsRowTitlesProps = {
  sortedOrders: SelectedIcuOrder[]
  isSorting: boolean
  preview?: boolean
  showOrderer: boolean
  selectedTxPendingQueue: OrderTimePendingQueue[]
  orderStep: 'closed' | 'upsert' | 'selectOrderer' | 'multipleEdit'
  orderTimePendingQueueLength: number
  vitalRefRange: VitalRefRange[]
  species: string
  orderwidth: number
  isMobile: boolean
  cellRef?: RefObject<HTMLTableRowElement>
  isTouchMove?: boolean
}

export default function OrderRows({
  sortedOrders,
  isSorting,
  preview,
  showOrderer,
  selectedTxPendingQueue,
  orderStep,
  orderTimePendingQueueLength,
  vitalRefRange,
  species,
  orderwidth,
  cellRef,
  isTouchMove,
  isMobile,
}: CellsRowTitlesProps) {
  // 세로 hover 가이드라인 기능 없에고 반응보기로
  // const { handleColumnHover, handleColumnLeave, hoveredColumn } =
  //   useVerticalGuideline()
  const {
    setOrderStep,
    setIsEditOrderMode,
    setSelectedChartOrder,
    selectedOrderPendingQueue,
    setSelectedOrderPendingQueue,
    setCopiedOrderPendingQueue,
    reset,
    setOrderTimePendingQueue,
    setSelectedTxPendingQueue,
  } = useIcuOrderStore()

  const {
    isMutationCanceled,
    setIsMutationCanceled,
    setTxStep,
    setTxLocalState,
  } = useTxMutationStore()

  useShorcutKey({
    keys: ['c'],
    condition: selectedOrderPendingQueue.length > 0,
    callback: () => {
      setCopiedOrderPendingQueue(selectedOrderPendingQueue)
      setSelectedOrderPendingQueue([])
      toast({
        title: '오더 복사 완료',
        description: '붙여넣기 할 차트로 이동해주세요',
      })
    },
  })

  return (
    <>
      {sortedOrders.map((order, index) => {
        const isInOrderPendingQueue = selectedOrderPendingQueue.some(
          (o) => o.order_id === order.order_id,
        )
        return (
          <TableRow
            className="relative w-full divide-x"
            key={order.order_id}
            ref={cellRef}
          >
            <OrderRowTitle
              isInOrderPendingQueue={isInOrderPendingQueue}
              index={index}
              order={order}
              preview={preview}
              isSorting={isSorting}
              vitalRefRange={vitalRefRange}
              species={species}
              orderWidth={orderwidth}
              isTouchMove={isTouchMove}
              isMobile={isMobile}
              reset={reset}
              setSelectedOrderPendingQueue={setSelectedOrderPendingQueue}
              setOrderStep={setOrderStep}
              setIsEditOrderMode={setIsEditOrderMode}
              setSelectedChartOrder={setSelectedChartOrder}
            />
            <OrderRowCells
              preview={preview}
              order={order}
              showOrderer={showOrderer}
              selectedTxPendingQueue={selectedTxPendingQueue}
              orderStep={orderStep}
              orderTimePendingQueueLength={orderTimePendingQueueLength}
              vitalRefRange={vitalRefRange}
              species={species}
              setOrderTimePendingQueue={setOrderTimePendingQueue}
              setSelectedTxPendingQueue={setSelectedTxPendingQueue}
              isMutationCanceled={isMutationCanceled}
              setIsMutationCanceled={setIsMutationCanceled}
              setTxStep={setTxStep}
              setTxLocalState={setTxLocalState}
            />
          </TableRow>
        )
      })}
    </>
  )
}
