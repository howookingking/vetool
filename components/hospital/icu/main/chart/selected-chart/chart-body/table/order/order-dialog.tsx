import OrderTypeColorDot from '@/components/hospital/common/order/order-type-color-dot'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { DEFAULT_ICU_ORDER_TYPE_DIC } from '@/constants/hospital/icu/chart/order'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { cn } from '@/lib/utils/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import type { SelectedIcuChart, SelectedIcuOrder } from '@/types/icu/chart'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import type { Dispatch, SetStateAction } from 'react'
import OrderForm from './order-form'
import OrdererSelectStep from './orderer-select-step'

type Props = {
  icuChartId: SelectedIcuChart['icu_chart_id']
  orders: SelectedIcuOrder[]
  mainVet: SelectedIcuChart['main_vet']
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
  hosId: string
}

export default function OrderDialog({
  hosId,
  icuChartId,
  setSortedOrders,
  orders,
  mainVet,
}: Props) {
  const { orderStep, selectedChartOrder, setOrderStep } = useIcuOrderStore()
  const {
    basicHosData: { orderColorsData },
  } = useBasicHosDataContext()

  const handleOpenChange = () =>
    orderStep === 'closed' ? setOrderStep('edit') : setOrderStep('closed')

  return (
    <Dialog open={orderStep !== 'closed'} onOpenChange={handleOpenChange}>
      <DialogContent className={cn(orderStep === 'edit' ? 'max-w-3xl' : '')}>
        <DialogHeader className="space-y-0">
          {orderStep === 'edit' && (
            <>
              <DialogTitle className="mb-2 flex items-center gap-2">
                <OrderTypeColorDot
                  orderColorsData={orderColorsData}
                  orderType={selectedChartOrder.icu_chart_order_type!}
                />
                <span>
                  {
                    DEFAULT_ICU_ORDER_TYPE_DIC[
                      selectedChartOrder.icu_chart_order_type!
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
                icuChartId={icuChartId}
                setSortedOrders={setSortedOrders}
              />
            </>
          )}

          {orderStep === 'selectOrderer' && (
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
          )}

          <DialogDescription />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
