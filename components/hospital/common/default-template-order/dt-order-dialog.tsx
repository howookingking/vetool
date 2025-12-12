import OrderTypeColorDot from '@/components/hospital/common/order/order-type-color-dot'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { DEFAULT_ICU_ORDER_TYPE_DIC } from '@/constants/hospital/icu/chart/order'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { useState, type Dispatch, type SetStateAction } from 'react'
import OrderTitleContent from '../order/order-title-content'
import DtOrderForm from './dt-order-form'

type Props = {
  order: SelectedIcuOrder
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
  isLastDefaultOrder?: boolean
  hosId: string
  isTemplate?: boolean
}

export default function DtOrderDialog({
  order,
  setSortedOrders,
  isLastDefaultOrder,
  hosId,
  isTemplate,
}: Props) {
  const {
    basicHosData: { orderColorsData },
  } = useBasicHosDataContext()

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger className="h-11 w-full px-2">
        <OrderTitleContent
          orderType={order.icu_chart_order_type!}
          orderName={order.icu_chart_order_name!}
          orderComment={order.icu_chart_order_comment!}
          orderColorsData={orderColorsData}
          orderFontSizeData={14}
        />
      </DialogTrigger>

      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <OrderTypeColorDot
              orderColorsData={orderColorsData}
              orderType={order.icu_chart_order_type!}
            />
            <span>
              {
                DEFAULT_ICU_ORDER_TYPE_DIC[
                  order.icu_chart_order_type as keyof typeof DEFAULT_ICU_ORDER_TYPE_DIC
                ]
              }
              오더 수정
            </span>
          </DialogTitle>

          <DialogDescription />
        </DialogHeader>

        <DtOrderForm
          setSortedOrders={setSortedOrders}
          isLastDefaultOrder={isLastDefaultOrder}
          hosId={hosId}
          order={order}
          setIsDialogOpen={setIsDialogOpen}
          isTemplate={isTemplate}
        />
      </DialogContent>
    </Dialog>
  )
}
