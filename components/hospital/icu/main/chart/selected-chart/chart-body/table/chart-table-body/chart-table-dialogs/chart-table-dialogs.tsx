import { type OrderStep } from '@/lib/store/icu/icu-order'
import { type IcuOrderColors } from '@/types/adimin'
import { type SelectedIcuOrder } from '@/types/icu/chart'
import { type Dispatch, type SetStateAction } from 'react'
import MultiSelectOrderDialog from '../../order/multil-select-order/multi-select-order-dialog'
import OrderDialog from '../../order/order-dialog'
import TxUpsertDialog from '../../tx/tx-upsert-dialog'

type ChartTableDialogsProps = {
  showTxUser: boolean
  isMultiOrderDialogOpen: boolean
  setIsMultiOrderDialogOpen: Dispatch<SetStateAction<boolean>>
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
  icuChartId: string
  orders: SelectedIcuOrder[]
  showOrderer: boolean
  orderStep: OrderStep
  setOrderStep: (orderStep: OrderStep) => void
  reset: () => void
  selectedChartOrder: Partial<SelectedIcuOrder>
  mainVetName: string
  orderColorsData: IcuOrderColors
}

export default function ChartTableDialogs({
  isMultiOrderDialogOpen,
  setIsMultiOrderDialogOpen,
  showTxUser,
  setSortedOrders,
  icuChartId,
  orders,
  showOrderer,
  orderStep,
  setOrderStep,
  reset,
  selectedChartOrder,
  mainVetName,
  orderColorsData,
}: ChartTableDialogsProps) {
  return (
    <>
      {/* 처치관련 : 처치 상세 입력, 처치자 입력 */}
      <TxUpsertDialog showTxUser={showTxUser} />

      {/* 다중 오더 선택 후 작업 : 오더 복사, 템플릿저장, 테두리 변경, 오더 삭제 */}
      <MultiSelectOrderDialog
        isMultiOrderDialogOpen={isMultiOrderDialogOpen}
        setIsMultiOrderDialogOpen={setIsMultiOrderDialogOpen}
        setSortedOrders={setSortedOrders}
      />

      {/* 오더자선택, 오더수정 */}
      <OrderDialog
        icuChartId={icuChartId}
        orders={orders}
        showOrderer={showOrderer}
        orderStep={orderStep}
        reset={reset}
        setOrderStep={setOrderStep}
        setSortedOrders={setSortedOrders}
        mainVetName={mainVetName}
        selectedChartOrder={selectedChartOrder}
        orderColorsData={orderColorsData}
      />
    </>
  )
}
