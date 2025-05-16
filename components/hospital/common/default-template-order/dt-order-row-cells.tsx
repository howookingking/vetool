import { TIMES } from '@/constants/hospital/icu/chart/time'
import { useDefaultOrderStore } from '@/lib/store/icu/dt-order'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import { SelectedIcuOrder } from '@/types/icu/chart'
import DtCell from './dt-cell'

export default function DtOrderRowCells({
  order,
}: {
  order: SelectedIcuOrder
}) {
  const { order_times, order_id } = order

  const {
    basicHosData: { timeGuidelineData },
  } = useBasicHosDataContext()
  const { setOrderTimePendingQueue, orderTimePendingQueue } =
    useDefaultOrderStore()

  const toggleOrderTime = (orderId: string, time: number) => {
    setOrderTimePendingQueue((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.orderId === orderId && item.orderTime === time,
      )

      if (existingIndex !== -1) {
        return prev.filter((_, index) => index !== existingIndex)
      } else {
        return [...prev, { orderId: orderId, orderTime: time }]
      }
    })
  }

  return (
    <>
      {TIMES.map((time) => {
        const isGuidelineTime = timeGuidelineData.includes(time)
        const isInOrderTimePendingQueue = orderTimePendingQueue.some(
          (t) => t.orderId === order.order_id && t.orderTime === time,
        )
        const hasOrder = order_times[time - 1] !== '0'
        const orderer = order_times[time - 1]
        return (
          <DtCell
            hasOrder={hasOrder}
            isGuidelineTime={isGuidelineTime}
            isInOrderTimePendingQueue={isInOrderTimePendingQueue}
            toggleOrderTime={toggleOrderTime}
            icuChartOrderId={order_id}
            key={time}
            time={time}
            orderer={orderer}
          />
        )
      })}
    </>
  )
}
