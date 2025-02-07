import { Button } from '@/components/ui/button'
import { ArrowLeftToLine, ArrowRightFromLine } from 'lucide-react'
import { type Dispatch, type SetStateAction } from 'react'

const WIDTH_SEQUENCE = [300, 400, 500, 600] as const
type OrderWidth = (typeof WIDTH_SEQUENCE)[number]

type OrderWidthButtonProps = {
  orderWidth: OrderWidth
  setOrderWidth: Dispatch<SetStateAction<number>>
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
    setOrderWidth(getNextWidth(orderWidth as OrderWidth))
  }

  const isMaxWidth = orderWidth === WIDTH_SEQUENCE[WIDTH_SEQUENCE.length - 1]

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleOrderWidthChange}
      className="hidden shrink-0 md:inline-flex"
    >
      {isMaxWidth ? (
        <ArrowLeftToLine size={18} />
      ) : (
        <ArrowRightFromLine size={18} />
      )}
    </Button>
  )
}
