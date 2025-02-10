'use client'

import DtNoOrder from '@/components/hospital/common/default-template-order/dt-no-order'
import DtOrderCreator from '@/components/hospital/common/default-template-order/dt-order-creator'
import DtOrderDialog from '@/components/hospital/common/default-template-order/dt-order-dialog'
import DtOrderRows from '@/components/hospital/common/default-template-order/dt-order-rows'
import DtSortingOrderRows from '@/components/hospital/common/default-template-order/dt-sorting-order-rows'
import DtTableHeader from '@/components/hospital/common/default-template-order/dt-table-header'
import { OrderWidth } from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-header/order-width-button'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import useLocalStorage from '@/hooks/use-local-storage'
import { type SelectedIcuOrder } from '@/types/icu/chart'
import { useEffect, useState } from 'react'

export default function DefaultOrdersTable({
  defaultChartOrders,
}: {
  defaultChartOrders: SelectedIcuOrder[]
}) {
  const [orderWidth, setOrderWidth] = useLocalStorage<OrderWidth>(
    'orderWidth',
    400,
  )

  const [isSorting, setIsSorting] = useState(false)
  const [sortedOrders, setSortedOrders] =
    useState<SelectedIcuOrder[]>(defaultChartOrders)

  useEffect(() => {
    setSortedOrders(defaultChartOrders)
  }, [defaultChartOrders])

  return (
    <Table className="border">
      <DtTableHeader
        isSorting={isSorting}
        orderWidth={orderWidth}
        setOrderWidth={setOrderWidth}
        sortedOrders={sortedOrders}
        setIsSorting={setIsSorting}
        defaultChartOrders={defaultChartOrders}
      />

      {isSorting ? (
        <DtSortingOrderRows
          isSorting={isSorting}
          sortedOrders={sortedOrders}
          setSortedOrders={setSortedOrders}
          orderWidth={orderWidth}
        />
      ) : (
        <TableBody>
          {sortedOrders.length === 0 ? (
            <DtNoOrder orderWidth={orderWidth} />
          ) : (
            <DtOrderRows
              sortedOrders={sortedOrders}
              isSorting={isSorting}
              orderwidth={orderWidth}
            />
          )}

          <TableRow className="hover:bg-transparent">
            <TableCell className="p-0">
              <DtOrderCreator sortedOrders={sortedOrders} />
            </TableCell>
          </TableRow>
        </TableBody>
      )}

      <DtOrderDialog setSortedOrders={setSortedOrders} />
    </Table>
  )
}
