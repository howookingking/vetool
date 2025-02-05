import LargeLoaderCircle from '@/components/common/large-loader-circle'
import OrderTypeColorDot from '@/components/hospital/common/order/order-type-color-dot'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { DEFAULT_ICU_ORDER_TYPE_DIC } from '@/constants/hospital/icu/chart/order'
import { type OrderStep } from '@/lib/store/icu/icu-order'
import { type IcuOrderColors } from '@/types/adimin'
import { type SelectedIcuOrder } from '@/types/icu/chart'
import dynamic from 'next/dynamic'
import { type Dispatch, type SetStateAction } from 'react'
import OrdererSelectStep from './orderer-select-step'

const LazyOrderForm = dynamic(() => import('./order-form'), {
  ssr: false,
  loading: () => <LargeLoaderCircle className="h-[360px]" />,
})

type OrderDialogProps = {
  icuChartId: string
  orders: SelectedIcuOrder[]
  showOrderer: boolean
  orderStep: OrderStep
  setOrderStep: (orderStep: OrderStep) => void
  reset: () => void
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
  mainVetName: string
  selectedChartOrder: Partial<SelectedIcuOrder>
  orderColorsData: IcuOrderColors
}

export default function OrderDialog({
  icuChartId,
  orders,
  showOrderer,
  orderStep,
  setOrderStep,
  reset,
  setSortedOrders,
  mainVetName,
  selectedChartOrder,
  orderColorsData,
}: OrderDialogProps) {
  const handleOpenChange = () => {
    if (orderStep === 'closed') {
      setOrderStep('edit')
    } else {
      setOrderStep('closed')
    }
    reset()
  }

  return (
    <Dialog open={orderStep !== 'closed'} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          {orderStep === 'edit' && (
            <>
              <DialogTitle className="mb-2 flex items-center gap-2">
                <OrderTypeColorDot
                  orderColorsData={orderColorsData}
                  orderType={selectedChartOrder.order_type!}
                />
                <span>
                  {
                    DEFAULT_ICU_ORDER_TYPE_DIC[
                      selectedChartOrder.order_type as keyof typeof DEFAULT_ICU_ORDER_TYPE_DIC
                    ]
                  }
                  오더 수정
                </span>
              </DialogTitle>

              <LazyOrderForm
                showOrderer={showOrderer}
                icuChartId={icuChartId}
                setSortedOrders={setSortedOrders}
              />
            </>
          )}

          {orderStep === 'selectOrderer' && (
            <>
              <DialogTitle>수의사 선택</DialogTitle>
              <OrdererSelectStep
                icuChartId={icuChartId}
                orders={orders}
                mainVetName={mainVetName}
              />
            </>
          )}

          <DialogDescription />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
