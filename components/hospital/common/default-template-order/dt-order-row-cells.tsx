import { TIMES } from '@/constants/hospital/icu/chart/time'
import { useDtOrderTimePendingQueueStore } from '@/lib/store/icu/dt-order'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import DtCell from './dt-cell'

export default function DtOrderRowCells({
  order,
}: {
  order: SelectedIcuOrder
}) {
  const { icu_chart_order_time, icu_chart_order_id } = order

  const {
    basicHosData: { timeGuidelineData },
  } = useBasicHosDataContext()
  const { setOrderTimePendingQueue, orderTimePendingQueue } =
    useDtOrderTimePendingQueueStore()

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
          (t) => t.orderId === order.icu_chart_order_id && t.orderTime === time,
        )
        // const hasOrder = icu_chart_order_time[time] !== '0'
        // const orderer = icu_chart_order_time[time]
        return (
          <DtCell
            hasOrder={false}
            isGuidelineTime={isGuidelineTime}
            isInOrderTimePendingQueue={isInOrderTimePendingQueue}
            toggleOrderTime={toggleOrderTime}
            icuChartOrderId={icu_chart_order_id}
            key={time}
            time={time}
            orderer={''}
          />
        )
      })}
    </>
  )
}
