import { TIMES } from '@/constants/hospital/icu/chart/time'
import { useDtOrderStore } from '@/lib/store/icu/dt-order'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import type { SelectedIcuOrder } from '@/types/icu/chart'
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
  const { setOrderTimePendingQueue, orderTimePendingQueue } = useDtOrderStore()

  const toggleOrderTime = (orderId: string, time: number) => {
    setOrderTimePendingQueue((prevQueue) => {
      const isAlreadyQueued = prevQueue.some(
        (entry) => entry.orderId === orderId && entry.orderTime === time,
      )
      if (isAlreadyQueued) {
        return prevQueue.filter(
          (entry) => !(entry.orderId === orderId && entry.orderTime === time),
        )
      }
      return [...prevQueue, { orderId, orderTime: time }]
    })
  }

  return (
    <>
      {TIMES.map((time) => {
        const isGuidelineTime = timeGuidelineData.includes(time)
        const isInOrderTimePendingQueue = orderTimePendingQueue.some(
          (t) => t.orderId === order.order_id && t.orderTime === time,
        )
        const hasOrder = order_times[time] !== '0'
        const orderer = order_times[time]
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
