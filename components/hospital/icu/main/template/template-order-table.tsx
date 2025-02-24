import DtNoOrder from '@/unused/dt-no-order'
import DtOrderCreator from '@/components/hospital/common/default-template-order/dt-order-creator'
import DtOrderDialog from '@/components/hospital/common/default-template-order/dt-order-dialog'
import DtOrderRows from '@/components/hospital/common/default-template-order/dt-order-rows'
import DtSortingOrderRows from '@/components/hospital/common/default-template-order/dt-sorting-order-rows'
import DtTableHeader from '@/components/hospital/common/default-template-order/dt-table-header'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import useLocalStorage from '@/hooks/use-local-storage'
import { type SelectedIcuOrder } from '@/types/icu/chart'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { type OrderWidth } from '@/types/hospital/order'

type TemplateOrderTableProps = {
  sortedOrders: SelectedIcuOrder[]
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
}

export default function TemplateOrderTable({
  sortedOrders,
  setSortedOrders,
}: TemplateOrderTableProps) {
  const [orderWidth, setOrderWidth] = useLocalStorage<OrderWidth>(
    'orderWidth',
    400,
  )

  const [isSorting, setIsSorting] = useState(false)

  return (
    <Table className="border">
      <DtTableHeader
        isSorting={isSorting}
        orderWidth={orderWidth}
        setOrderWidth={setOrderWidth}
        sortedOrders={sortedOrders}
        setIsSorting={setIsSorting}
        defaultChartOrders={[]}
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
              <DtOrderCreator
                sortedOrders={sortedOrders}
                setSortedOrders={setSortedOrders}
                isTemplate
              />
            </TableCell>
          </TableRow>
        </TableBody>
      )}

      <DtOrderDialog setSortedOrders={setSortedOrders} isTemplate />
    </Table>
  )
}
