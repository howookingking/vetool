import LargeLoaderCircle from '@/components/common/large-loader-circle'
import OrderTypeColorDot from '@/components/hospital/common/order-type-color-dot'
import OrdererSelectStep from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/orderer/orderer-select-step'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { DEFAULT_ICU_ORDER_TYPE_DIC } from '@/constants/hospital/icu/chart/order'
import { type OrderStep } from '@/lib/store/icu/icu-order'
import { IcuOrderColors } from '@/types/adimin'
import { type SelectedIcuOrder } from '@/types/icu/chart'
import dynamic from 'next/dynamic'
import { type Dispatch, type SetStateAction } from 'react'

const LazyOrderForm = dynamic(() => import('./order-form'), {
  ssr: false,
  loading: () => <LargeLoaderCircle className="h-[388px]" />,
})
const LazyTemplateTable = dynamic(
  () => import('./template/template-tab-content'),
  {
    ssr: false,
    loading: () => <LargeLoaderCircle className="h-[388px]" />,
  },
)

type OrderDialogProps = {
  hosId: string
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
  hosId,
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
      <DialogContent className="max-w-3xl overflow-x-auto">
        <DialogHeader>
          {orderStep === 'edit' && (
            <DialogTitle className="flex items-center gap-2">
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
          )}

          {orderStep === 'selectOrderer' && (
            <DialogTitle>수의사 선택</DialogTitle>
          )}

          {orderStep === 'template' && (
            <DialogTitle>템플릿 오더 추가</DialogTitle>
          )}
          <DialogDescription />
        </DialogHeader>

        {orderStep === 'edit' && (
          <LazyOrderForm
            showOrderer={showOrderer}
            icuChartId={icuChartId}
            setSortedOrders={setSortedOrders}
          />
        )}

        {orderStep === 'template' && (
          <LazyTemplateTable hosId={hosId} icuChartId={icuChartId} />
        )}

        {orderStep === 'selectOrderer' && (
          <OrdererSelectStep
            icuChartId={icuChartId}
            orders={orders}
            mainVetName={mainVetName}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
