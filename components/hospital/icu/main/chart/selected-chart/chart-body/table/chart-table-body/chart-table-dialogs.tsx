import type { OrderStep } from '@/lib/store/icu/icu-order'
import type { IcuOrderColors } from '@/types/adimin'
import type { SelectedIcuChart, SelectedIcuOrder } from '@/types/icu/chart'
import type { Dispatch, SetStateAction } from 'react'
import MultiOrderDialog from '../order/multil-order/multi-order-dialog'
import OrderDialog from '../order/order-dialog'
import TxUpsertDialog from '../tx/tx-upsert-dialog'

type Props = {
  hosId: string
  showTxUser: boolean
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
  icuChartId: SelectedIcuChart['icu_chart_id']
  orders: SelectedIcuOrder[]
  showOrderer: boolean
  setOrderStep: (orderStep: OrderStep) => void
  mainVet: SelectedIcuChart['main_vet']
  orderColorsData: IcuOrderColors
  isCommandPressed: boolean
  multiOrderPendingQueue: Partial<SelectedIcuOrder>[]
  resetOrderStore: () => void
  setCopiedOrderPendingQueue: Dispatch<
    SetStateAction<Partial<SelectedIcuOrder>[]>
  >
  setMultiOrderPendingQueue: Dispatch<
    SetStateAction<Partial<SelectedIcuOrder>[]>
  >
}

export default function ChartTableDialogs({
  hosId,
  showTxUser,
  setSortedOrders,
  icuChartId,
  orders,
  showOrderer,
  setOrderStep,
  mainVet,
  orderColorsData,
  isCommandPressed,
  multiOrderPendingQueue,
  resetOrderStore,
  setCopiedOrderPendingQueue,
  setMultiOrderPendingQueue,
}: Props) {
  return (
    <>
      {/* 처치관련 : 처치 상세 입력, 처치자 입력 */}
      <TxUpsertDialog showTxUser={showTxUser} />

      {/* 다중 오더 선택 후 작업 : 오더 복사, 템플릿저장, 테두리 변경, 오더 삭제 */}
      <MultiOrderDialog
        hosId={hosId}
        setSortedOrders={setSortedOrders}
        isCommandPressed={isCommandPressed}
        multiOrderPendingQueue={multiOrderPendingQueue}
        resetOrderStore={resetOrderStore}
        setCopiedOrderPendingQueue={setCopiedOrderPendingQueue}
        setMultiOrderPendingQueue={setMultiOrderPendingQueue}
      />

      {/* 오더자선택, 오더수정 */}
      <OrderDialog
        icuChartId={icuChartId}
        orders={orders}
        showOrderer={showOrderer}
        setOrderStep={setOrderStep}
        setSortedOrders={setSortedOrders}
        mainVet={mainVet}
        orderColorsData={orderColorsData}
        resetOrderStore={resetOrderStore}
        hosId={hosId}
      />
    </>
  )
}
