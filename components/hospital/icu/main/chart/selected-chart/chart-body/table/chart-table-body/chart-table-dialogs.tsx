import { type OrderStep } from '@/lib/store/icu/icu-order'
import { type IcuOrderColors } from '@/types/adimin'
import { type SelectedIcuOrder } from '@/types/icu/chart'
import { type Dispatch, type SetStateAction } from 'react'
import MultiSelectOrderDialog from '../order/multil-select-order/multi-select-order-dialog'
import OrderDialog from '../order/order-dialog'
import TxUpsertDialogDynamc from '../tx/tx-upsert-dialog-dynamic'

type Props = {
  showTxUser: boolean
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
  icuChartId: string
  orders: SelectedIcuOrder[]
  showOrderer: boolean
  setOrderStep: (orderStep: OrderStep) => void
  mainVetName: string
  orderColorsData: IcuOrderColors
  isCommandPressed: boolean
  selectedOrderPendingQueue: Partial<SelectedIcuOrder>[]
  resetOrderStore: () => void
}

export default function ChartTableDialogs({
  showTxUser,
  setSortedOrders,
  icuChartId,
  orders,
  showOrderer,
  setOrderStep,
  mainVetName,
  orderColorsData,
  isCommandPressed,
  selectedOrderPendingQueue,
  resetOrderStore,
}: Props) {
  return (
    <>
      {/* 처치관련 : 처치 상세 입력, 처치자 입력 */}
      <TxUpsertDialogDynamc showTxUser={showTxUser} />

      {/* 다중 오더 선택 후 작업 : 오더 복사, 템플릿저장, 테두리 변경, 오더 삭제 */}
      <MultiSelectOrderDialog
        setSortedOrders={setSortedOrders}
        isCommandPressed={isCommandPressed}
        selectedOrderPendingQueue={selectedOrderPendingQueue}
        resetOrderStore={resetOrderStore}
      />

      {/* 오더자선택, 오더수정 */}
      <OrderDialog
        icuChartId={icuChartId}
        orders={orders}
        showOrderer={showOrderer}
        setOrderStep={setOrderStep}
        setSortedOrders={setSortedOrders}
        mainVetName={mainVetName}
        orderColorsData={orderColorsData}
        resetOrderStore={resetOrderStore}
      />
    </>
  )
}
