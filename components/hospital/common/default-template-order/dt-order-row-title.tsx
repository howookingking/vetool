import OrderTitleContent from '@/components/hospital/common/order-title-content'
import { Button } from '@/components/ui/button'
import { TableCell } from '@/components/ui/table'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { cn } from '@/lib/utils/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import { type IcuOrderColors } from '@/types/adimin'
import { type SelectedIcuOrder } from '@/types/icu/chart'

type DtOrderRowTitleProps = {
  order: SelectedIcuOrder
  index: number
  isSorting: boolean
  orderWidth: number
}

export default function DtOrderRowTitle({
  order,
  isSorting,
  index,
  orderWidth,
}: DtOrderRowTitleProps) {
  const { order_comment, order_type, order_name } = order

  const {
    basicHosData: { orderColorsData, orderColorDisplay, orderFontSizeData },
  } = useBasicHosDataContext()
  const { reset, setOrderStep, setSelectedChartOrder } = useIcuOrderStore()

  const handleClickOrderTitle = () => {
    reset()
    setOrderStep!('edit')
    setSelectedChartOrder(order)
  }

  return (
    <TableCell
      className={cn(
        'handle group p-0',
        isSorting && index % 2 === 0 && 'animate-shake-strong',
        isSorting && index % 2 !== 0 && 'animate-shake-strong-reverse',
      )}
      style={{
        width: orderWidth,
        transition: 'width 0.3s ease-in-out, transform 0.3s ease-in-out',

        // 오더 색 표시 방법이 full 인경우
        background:
          orderColorDisplay === 'full'
            ? orderColorsData[order_type as keyof IcuOrderColors]
            : 'transparent',
      }}
    >
      <Button
        variant="ghost"
        onClick={isSorting ? undefined : handleClickOrderTitle}
        className={cn(
          'group flex h-11 justify-between rounded-none bg-transparent px-2 outline-none transition duration-300 hover:scale-[97%] hover:bg-transparent',
        )}
        style={{
          width: orderWidth,
          transition: 'width 0.3s ease-in-out, transform 0.3s ease-in-out',
        }}
      >
        <OrderTitleContent
          orderType={order_type}
          orderName={order_name}
          orderComment={order_comment}
          orderColorDisplay={orderColorDisplay}
          orderColorsData={orderColorsData}
          orderFontSizeData={orderFontSizeData}
        />
      </Button>
    </TableCell>
  )
}
