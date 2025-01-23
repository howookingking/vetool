import OrderTypeColorDot from '@/components/hospital/common/order-type-color-dot'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { DEFAULT_ICU_ORDER_TYPE_DIC } from '@/constants/hospital/icu/chart/order'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import { type SelectedIcuOrder } from '@/types/icu/chart'
import { type Dispatch, type SetStateAction } from 'react'
import DtOrderForm from './dt-order-form'

export default function DtOrderDialog({
  setSortedOrders,
}: {
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
}) {
  const { orderStep, setOrderStep, selectedChartOrder } = useIcuOrderStore()
  const {
    basicHosData: { orderColorsData },
  } = useBasicHosDataContext()

  const handleOpenChange = () =>
    orderStep === 'closed' ? setOrderStep('edit') : setOrderStep('closed')

  return (
    <Dialog open={orderStep !== 'closed'} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-3xl overflow-x-auto">
        <DialogHeader>
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

          <DialogDescription />
        </DialogHeader>

        <DtOrderForm setSortedOrders={setSortedOrders} />
      </DialogContent>
    </Dialog>
  )
}
