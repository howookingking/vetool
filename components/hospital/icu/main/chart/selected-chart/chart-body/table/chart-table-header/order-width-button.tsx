import { Button } from '@/components/ui/button'
import { ArrowLeftToLineIcon, ArrowRightFromLineIcon } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'

export const ORDER_WIDTH_SEQUENCE = [400, 500, 600] as const
export type OrderWidth = (typeof ORDER_WIDTH_SEQUENCE)[number]

type Props = {
  orderWidth: OrderWidth
  setOrderWidth: Dispatch<SetStateAction<OrderWidth>>
}

export default function OrderWidthButton({ orderWidth, setOrderWidth }: Props) {
  const getNextWidth = (currentWidth: OrderWidth) => {
    const currentIndex = ORDER_WIDTH_SEQUENCE.indexOf(currentWidth)
    const nextIndex = (currentIndex + 1) % ORDER_WIDTH_SEQUENCE.length
    return ORDER_WIDTH_SEQUENCE[nextIndex]
  }

  const handleOrderWidthChange = () => {
    setOrderWidth(getNextWidth(orderWidth))
  }

  const isMaxWidth =
    orderWidth === ORDER_WIDTH_SEQUENCE[ORDER_WIDTH_SEQUENCE.length - 1]

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleOrderWidthChange}
      className="shrink-0"
    >
      {isMaxWidth ? <ArrowLeftToLineIcon /> : <ArrowRightFromLineIcon />}
    </Button>
  )
}
