import { Button } from '@/components/ui/button'
import { ArrowLeftToLine, ArrowRightFromLine } from 'lucide-react'
import { type Dispatch, type SetStateAction } from 'react'
import useIsMobile from '@/hooks/use-is-mobile'
import {
  DESKTOP_WIDTH_SEQUENCE,
  MOBILE_WIDTH_SEQUENCE,
} from '@/constants/hospital/icu/chart/order'
import {
  type DesktopOrderWidth,
  type MobileOrderWidth,
  type OrderWidth,
} from '@/types/hospital/order'

type Props = {
  orderWidth: OrderWidth
  setOrderWidth: Dispatch<SetStateAction<OrderWidth>>
}

export default function OrderWidthButton({ orderWidth, setOrderWidth }: Props) {
  const isMobile = useIsMobile()
  const widthSequence = isMobile
    ? MOBILE_WIDTH_SEQUENCE
    : DESKTOP_WIDTH_SEQUENCE

  const getNextWidth = (currentWidth: OrderWidth) => {
    if (isMobile) {
      const sequence = MOBILE_WIDTH_SEQUENCE
      const currentIndex = sequence.indexOf(currentWidth as MobileOrderWidth)
      const nextIndex = (currentIndex + 1) % sequence.length

      return sequence[nextIndex]
    }

    const sequence = DESKTOP_WIDTH_SEQUENCE
    const currentIndex = sequence.indexOf(currentWidth as DesktopOrderWidth)
    const nextIndex = (currentIndex + 1) % sequence.length
    return sequence[nextIndex]
  }

  const handleOrderWidthChange = () => {
    setOrderWidth(getNextWidth(orderWidth))
  }

  const isMaxWidth = orderWidth === widthSequence[widthSequence.length - 1]

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
