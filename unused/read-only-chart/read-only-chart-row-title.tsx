import OrderTitleContent from '@/components/hospital/common/order/order-title-content'
import { TableCell } from '@/components/ui/table'
import { IcuOrderColors } from '@/types/adimin'
import type { IcuReadOnlyOrderData } from '@/types/icu/chart'

export default function ReadOnlyChartRowTitle({
  order,
  orderColorDisplay,
  orderColorsData,
  orderFontSizeData,
  orderWidth,
  isMobile,
}: {
  order: IcuReadOnlyOrderData
  orderColorDisplay: string
  orderColorsData: IcuOrderColors
  orderFontSizeData: number
  orderWidth: number
  isMobile: boolean
}) {
  return (
    <TableCell
      className="p-0"
      style={{
        width: isMobile ? 300 : orderWidth,
        transition: 'width 0.3s ease-in-out',
        background:
          orderColorDisplay === 'full'
            ? orderColorsData[
                order.icu_chart_order_type as keyof IcuOrderColors
              ]
            : 'transparent',
      }}
    >
      <div
        className={
          'flex h-11 cursor-not-allowed items-center justify-between rounded-none bg-transparent px-2 outline-none ring-inset ring-primary'
        }
        style={{
          width: isMobile ? 300 : orderWidth,
          transition: 'width 0.3s ease-in-out',
        }}
      >
        <OrderTitleContent
          orderType={order.icu_chart_order_type}
          orderName={order.icu_chart_order_name}
          orderComment={order.icu_chart_order_comment}
          orderColorDisplay={orderColorDisplay}
          orderColorsData={orderColorsData}
          orderFontSizeData={orderFontSizeData}
        />
      </div>
    </TableCell>
  )
}
