import OrderTitleContent from '@/components/hospital/common/order/order-title-content'
import { Button } from '@/components/ui/button'
import { TableCell } from '@/components/ui/table'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { cn } from '@/lib/utils/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import type { IcuOrderColors } from '@/types/adimin'
import type { SelectedIcuOrder } from '@/types/icu/chart'

type Props = {
  order: SelectedIcuOrder
  index: number
  isSorting: boolean
  orderWidth: number
  localColorState?: IcuOrderColors
}

export default function DtOrderRowTitle({
  order,
  isSorting,
  index,
  orderWidth,
  localColorState,
}: Props) {
  const { order_comment, order_type, order_name } = order

  const {
    basicHosData: { orderColorsData, orderFontSizeData },
  } = useBasicHosDataContext()

  // local state가 있다는 것은 오더 색상 설정이라는 것임
  const orderColor = localColorState ?? orderColorsData

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
          orderColorsData={orderColor}
          orderFontSizeData={orderFontSizeData}
        />
      </Button>
    </TableCell>
  )
}
