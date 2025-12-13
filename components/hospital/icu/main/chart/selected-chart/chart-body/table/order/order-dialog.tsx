import OrderTypeColorDot from '@/components/hospital/common/order/order-type-color-dot'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { DEFAULT_ICU_ORDER_TYPE_DIC } from '@/constants/hospital/icu/chart/order'
import { useIcuOrderStore, type OrderStep } from '@/lib/store/icu/icu-order'
import type { IcuOrderColors } from '@/types/adimin'
import type { SelectedIcuChart, SelectedIcuOrder } from '@/types/icu/chart'
import type { Dispatch, SetStateAction } from 'react'
import OrderForm from './order-form'
import OrdererSelectStep from './orderer-select-step'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { cn } from '@/lib/utils/utils'

type Props = {
  icuChartId: SelectedIcuChart['icu_chart_id']
  orders: SelectedIcuOrder[]
  showOrderer: boolean
  setOrderStep: (orderStep: OrderStep) => void
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
  mainVet: SelectedIcuChart['main_vet']
  orderColorsData: IcuOrderColors
  resetOrderStore: () => void
  hosId: string
}

export default function OrderDialog({
  icuChartId,
  orders,
  showOrderer,
  setOrderStep,
  setSortedOrders,
  resetOrderStore,
  mainVet,
  orderColorsData,
  hosId,
}: Props) {
  const { orderStep, selectedChartOrder } = useIcuOrderStore()

  const handleOpenChange = () => {
    if (orderStep === 'closed') {
      setOrderStep('edit')
    } else {
      setOrderStep('closed')
    }
    resetOrderStore()
  }

  return (
    <Dialog open={orderStep !== 'closed'} onOpenChange={handleOpenChange}>
      <DialogContent className={cn(orderStep === 'edit' ? 'max-w-3xl' : '')}>
        <DialogHeader>
          {orderStep === 'edit' ? (
            <>
              <DialogTitle className="mb-2 flex items-center gap-2">
                <OrderTypeColorDot
                  orderColorsData={orderColorsData}
                  orderType={selectedChartOrder.icu_chart_order_type!}
                />
                <span>
                  {
                    DEFAULT_ICU_ORDER_TYPE_DIC[
                      selectedChartOrder.icu_chart_order_type as keyof typeof DEFAULT_ICU_ORDER_TYPE_DIC
                    ]
                  }
                  오더 수정
                </span>
              </DialogTitle>
              <VisuallyHidden>
                <DialogDescription />
              </VisuallyHidden>

              <OrderForm
                hosId={hosId}
                showOrderer={showOrderer}
                icuChartId={icuChartId}
                setSortedOrders={setSortedOrders}
              />
            </>
          ) : null}

          {orderStep === 'selectOrderer' ? (
            <>
              <DialogTitle>오더자 선택</DialogTitle>
              <VisuallyHidden>
                <DialogDescription />
              </VisuallyHidden>

              <OrdererSelectStep
                icuChartId={icuChartId}
                orders={orders}
                mainVet={mainVet}
                hosId={hosId}
              />
            </>
          ) : null}

          <DialogDescription />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
