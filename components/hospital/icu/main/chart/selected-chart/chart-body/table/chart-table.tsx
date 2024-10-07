'use client'

import LargeLoaderCircle from '@/components/common/large-loader-circle'
import OrderDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/order/order-dialog'
import TxUpsertDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/tx-upsert-dialog'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DEFAULT_ICU_ORDER_TYPE } from '@/constants/hospital/icu/chart/order'
import { TIMES } from '@/constants/hospital/icu/chart/time'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import type { SelectedChart, SelectedIcuOrder } from '@/types/icu/chart'
import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import CellsRow from './cells-row'
import CellsRowTitle from './cells-row-title'

export default function ChartTable({
  chartData,
  preview,
}: {
  chartData: SelectedChart
  preview?: boolean
}) {
  const { icu_chart_id, orders } = chartData
  const { setStep } = useIcuOrderStore()
  const [isSorting, setIsSorting] = useState(true)
  const [sortedOrders, setSortedOrders] = useState<SelectedIcuOrder[]>([])

  useEffect(() => {
    const sorted = [...orders]
      .sort((prev, next) => prev.order_name.localeCompare(next.order_name))
      .sort(
        (prev, next) =>
          DEFAULT_ICU_ORDER_TYPE.map((order) => order.value).findIndex(
            (order) => order === prev.order_type,
          ) -
          DEFAULT_ICU_ORDER_TYPE.map((order) => order.value).findIndex(
            (order) => order === next.order_type,
          ),
      )
    setSortedOrders(sorted)
    setIsSorting(false)
  }, [orders])

  const debouncedSetOrdererSelectStep = useDebouncedCallback(
    () => setStep('selectOrderer'),
    1000,
  )

  if (isSorting) {
    return <LargeLoaderCircle className="h-icu-chart" />
  }

  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          <TableHead className="relative flex w-[320px] items-center justify-center gap-2 text-center">
            <span>오더 목록</span>
            {!preview && (
              <OrderDialog icuChartId={icu_chart_id} orders={orders} />
            )}
          </TableHead>

          {TIMES.map((time) => (
            <TableHead className="border text-center" key={time}>
              {time.toString().padStart(2, '0')}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {!preview && <TxUpsertDialog />}

        {sortedOrders.map((order) => (
          <TableRow className="divide-x" key={order.order_id}>
            <CellsRowTitle order={order} preview={preview} />
            <CellsRow
              preview={preview}
              order={order}
              debouncedSetOrdererSelectStep={debouncedSetOrdererSelectStep}
            />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
