import { Button } from '@/components/ui/button'
import { ArrowLeftToLine, ArrowRightFromLine } from 'lucide-react'
import { Dispatch, SetStateAction, useCallback } from 'react'

export default function OrderWidthButton({
  orderWidth,
  setOrderWidth,
  isMobile,
}: {
  orderWidth: number
  setOrderWidth: Dispatch<SetStateAction<number>>
  isMobile: boolean
}) {
  const handleOrderWidthChange = useCallback(() => {
    if (isMobile) {
      setOrderWidth(300)
      return
    }

    if (orderWidth === 300) {
      setOrderWidth(400)
      return
    }
    if (orderWidth === 400) {
      setOrderWidth(500)
      return
    }
    if (orderWidth === 500) {
      setOrderWidth(600)
      return
    }
    if (orderWidth === 600) {
      setOrderWidth(300)
      return
    }
    setOrderWidth(400)
  }, [orderWidth, setOrderWidth, isMobile])

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleOrderWidthChange}
      className="shrink-0"
    >
      {orderWidth === 600 ? (
        <ArrowLeftToLine size={18} />
      ) : (
        <ArrowRightFromLine size={18} />
      )}
    </Button>
  )
}
