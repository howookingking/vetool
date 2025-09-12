import DtNoOrder from '@/components/hospital/common/default-template-order/dt-no-order'
import DtOrderCreator from '@/components/hospital/common/default-template-order/dt-order-creator'
import DtOrderDialog from '@/components/hospital/common/default-template-order/dt-order-dialog'
import DtOrderRows from '@/components/hospital/common/default-template-order/dt-order-rows'
import DtSortingOrderRows from '@/components/hospital/common/default-template-order/dt-sorting-order-rows'
import DtTableHeader from '@/components/hospital/common/default-template-order/dt-table-header'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import useLocalStorage from '@/hooks/use-local-storage'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import type { OrderWidth } from '@/types/hospital/order'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { type Dispatch, type SetStateAction, useState } from 'react'
import UserKeyGuideMessage from '../chart/selected-chart/chart-body/table/chart-table-body/order-creator/user-key-guide-message'

type Props = {
  sortedOrders: SelectedIcuOrder[]
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
}

export default function TemplateOrderTable({
  sortedOrders,
  setSortedOrders,
}: Props) {
  const [orderWidth, setOrderWidth] = useLocalStorage<OrderWidth>(
    'orderWidth',
    400,
  )

  const [isSorting, setIsSorting] = useState(false)

  return (
    <Table className="border">
      <DtTableHeader
        isSorting={isSorting}
        setIsSorting={setIsSorting}
        orderWidth={orderWidth}
        setOrderWidth={setOrderWidth}
        sortedOrders={sortedOrders}
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

            <UserKeyGuideMessage isDT />
          </TableRow>
        </TableBody>
      )}

      <DtOrderDialog setSortedOrders={setSortedOrders} isTemplate />
    </Table>
  )
}
