'use client'

import DtOrderCreator from '@/components/hospital/common/default-template-order/dt-order-creator'
import DtOrderDialog from '@/components/hospital/common/default-template-order/dt-order-dialog'
import DtOrderRows from '@/components/hospital/common/default-template-order/dt-order-rows'
import DtSortingOrderRows from '@/components/hospital/common/default-template-order/dt-sorting-order-rows'
import DtTableHeader from '@/components/hospital/common/default-template-order/dt-table-header'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import useLocalStorage from '@/hooks/use-local-storage'
import { cn } from '@/lib/utils/utils'
import { type IcuOrderColors } from '@/types/adimin'
import { type OrderWidth } from '@/types/hospital/order'
import { type SelectedIcuOrder } from '@/types/icu/chart'
import { useEffect, useState } from 'react'

type Props = {
  defaultChartOrders: SelectedIcuOrder[]
  isSetting?: boolean
  localColorState?: IcuOrderColors
  localColorDisplayMethod?: 'dot' | 'full'
}

export default function DefaultOrdersTable({
  defaultChartOrders,
  isSetting,
  localColorState,
  localColorDisplayMethod,
}: Props) {
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
        isSetting={isSetting}
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
          <DtOrderRows
            sortedOrders={sortedOrders}
            isSorting={isSorting}
            orderwidth={orderWidth}
            isSetting={isSetting}
            localColorState={localColorState}
            localColorDisplayMethod={localColorDisplayMethod}
          />

          <TableRow
            className={cn('hover:bg-transparent', isSetting && 'hidden')}
          >
            <TableCell className="p-0">
              <DtOrderCreator sortedOrders={sortedOrders} />
            </TableCell>
          </TableRow>
        </TableBody>
      )}

      <DtOrderDialog
        setSortedOrders={setSortedOrders}
        isTemplate={false}
        isLastDefaultOrder={sortedOrders.length === 1}
      />
    </Table>
  )
}
