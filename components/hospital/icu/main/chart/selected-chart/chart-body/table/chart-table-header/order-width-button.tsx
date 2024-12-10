import { Button } from '@/components/ui/button'
import { ArrowLeftToLine, ArrowRightFromLine } from 'lucide-react'
import { Dispatch, SetStateAction, useCallback } from 'react'

const MOBILE_WIDTH = 300
const WIDTH_SEQUENCE = [300, 400, 500, 600] as const
type OrderWidth = (typeof WIDTH_SEQUENCE)[number]

type OrderWidthButtonProps = {
  orderWidth: OrderWidth
  setOrderWidth: Dispatch<SetStateAction<number>>
  isMobile: boolean
}

export default function OrderWidthButton({
  orderWidth,
  setOrderWidth,
  isMobile,
}: OrderWidthButtonProps) {
  const getNextWidth = useCallback((currentWidth: OrderWidth): OrderWidth => {
    const currentIndex = WIDTH_SEQUENCE.indexOf(currentWidth)
    const nextIndex = (currentIndex + 1) % WIDTH_SEQUENCE.length
    return WIDTH_SEQUENCE[nextIndex]
  }, [])

  const handleOrderWidthChange = useCallback(() => {
    if (isMobile) {
      setOrderWidth(MOBILE_WIDTH)
      return
    }

    setOrderWidth(getNextWidth(orderWidth as OrderWidth))
  }, [orderWidth, setOrderWidth, isMobile, getNextWidth])

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