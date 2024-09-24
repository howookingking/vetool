import { TIMES } from '@/constants/hospital/icu/chart/time'
import type { IcuChartTx } from '@/types'
import type { CopiedOrder, IcuChartOrderJoined } from '@/types/icu'
import { useCallback, useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import Cell from './cell'
import { updateOrderTime } from '@/lib/services/icu/order-mutation'
import { toast } from '@/components/ui/use-toast'
import { set } from 'zod'

export default function OrderCells({
  preview,
  order,
}: {
  preview?: boolean
  order: IcuChartOrderJoined | CopiedOrder
}) {
  const [orderTimeState, setOrderTimeState] = useState(
    order.icu_chart_order_time,
  )

  useEffect(() => {
    setOrderTimeState(order.icu_chart_order_time)
  }, [order.icu_chart_order_time])

  const toggleOrderTime = useCallback((time: number) => {
    setOrderTimeState((prevOrderTime) => {
      const newOrderTime = [...prevOrderTime]
      newOrderTime[time - 1] = newOrderTime[time - 1] === '1' ? '0' : '1'
      return newOrderTime
    })
  }, [])

  const handleUpdateOrderTime = useDebouncedCallback(() => {
    updateOrderTime(order.icu_chart_order_id, orderTimeState)
    toast({
      title: '오더 시간을 변경하였습니다.',
    })
  }, 1500)

  return (
    <>
      {TIMES.map((time, index) => {
        const isDone =
          !preview &&
          order.icu_chart_order_time[index] === '1' &&
          order[`icu_chart_order_tx_${time}`] !== null

        const hasOrder = orderTimeState[time - 1] === '1'
        return (
          <Cell
            preview={preview}
            key={time}
            time={time}
            txData={order[`icu_chart_order_tx_${time}`] as IcuChartTx}
            icuIoId={order.icu_io_id.icu_io_id}
            icuChartOrderId={order.icu_chart_order_id}
            isDone={isDone}
            hasOrder={hasOrder}
            icuChartOrderName={order.icu_chart_order_name}
            icuChartTxId={
              (order[`icu_chart_order_tx_${time}`] as IcuChartTx)
                ?.icu_chart_tx_id
            }
            toggleOrderTime={toggleOrderTime}
            handleUpdateOrderTime={handleUpdateOrderTime}
          />
        )
      })}
    </>
  )
}
