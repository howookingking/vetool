import type { SelectedIcuChart, SelectedIcuOrder } from '@/types/icu/chart'
import type { Dispatch, SetStateAction } from 'react'
import MultiOrderDialog from '../order/multil-order/multi-order-dialog'
import OrderDialog from '../order/order-dialog'
import TxUpsertDialog from '../tx/tx-upsert-dialog'

type Props = {
  hosId: string
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
  icuChartId: SelectedIcuChart['icu_chart_id']
  orders: SelectedIcuOrder[]
  mainVet: SelectedIcuChart['main_vet']
  isCommandPressed: boolean
}

export default function ChartTableDialogs({
  hosId,
  setSortedOrders,
  icuChartId,
  orders,
  mainVet,
  isCommandPressed,
}: Props) {
  return (
    <>
      {/* 처치관련 : 처치 상세 입력, 처치자 입력 */}
      <TxUpsertDialog hosId={hosId} />

      {/* 다중 오더 선택 후 작업 : 오더 복사, 템플릿저장, 테두리 변경, 오더 삭제 */}
      <MultiOrderDialog
        hosId={hosId}
        setSortedOrders={setSortedOrders}
        isCommandPressed={isCommandPressed}
      />

      {/* 오더자선택, 오더수정 */}
      <OrderDialog
        icuChartId={icuChartId}
        orders={orders}
        setSortedOrders={setSortedOrders}
        mainVet={mainVet}
        hosId={hosId}
      />
    </>
  )
}
