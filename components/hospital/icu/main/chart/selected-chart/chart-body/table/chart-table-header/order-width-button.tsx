import { Button } from '@/components/ui/button'
import { ArrowLeftToLine, ArrowRightFromLine } from 'lucide-react'
import { type Dispatch, type SetStateAction } from 'react'

export const WIDTH_SEQUENCE = [300, 400, 500, 600] as const
export type OrderWidth = (typeof WIDTH_SEQUENCE)[number]

type OrderWidthButtonProps = {
  orderWidth: OrderWidth
  setOrderWidth: Dispatch<SetStateAction<OrderWidth>>
}

export default function OrderWidthButton({
  orderWidth,
  setOrderWidth,
}: OrderWidthButtonProps) {
  const getNextWidth = (currentWidth: OrderWidth): OrderWidth => {
    const currentIndex = WIDTH_SEQUENCE.indexOf(currentWidth)
    const nextIndex = (currentIndex + 1) % WIDTH_SEQUENCE.length
    return WIDTH_SEQUENCE[nextIndex]
  }

  const handleOrderWidthChange = () => {
    setOrderWidth(getNextWidth(orderWidth))
  }

  const isMaxWidth = orderWidth === WIDTH_SEQUENCE[WIDTH_SEQUENCE.length - 1]

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleOrderWidthChange}
      className="shrink-0"
    >
      {isMaxWidth ? (
        <ArrowLeftToLine size={18} />
      ) : (
        <ArrowRightFromLine size={18} />
      )}
    </Button>
  )
}
