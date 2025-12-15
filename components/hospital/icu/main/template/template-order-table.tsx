import DtNoOrder from '@/components/hospital/common/default-template-order/dt-no-order'
import DtOrderCreator from '@/components/hospital/common/default-template-order/dt-order-creator'
import DtOrderRows from '@/components/hospital/common/default-template-order/dt-order-rows'
import DtSortingOrderRows from '@/components/hospital/common/default-template-order/dt-sorting-order-rows'
import DtTableHeader from '@/components/hospital/common/default-template-order/dt-table-header'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import useLocalStorage from '@/hooks/use-local-storage'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import type { Dispatch, SetStateAction } from 'react'
import { Sortable } from 'react-sortablejs'
import UserKeyGuideMessage from '../chart/selected-chart/chart-body/table/chart-table-body/order-creator/user-key-guide-message'
import type { OrderWidth } from '../chart/selected-chart/chart-body/table/chart-table-header/order-width-button'

type Props = {
  isSorting: boolean
  handleSortToggle: () => void
  handleOrderMove: (event: Sortable.SortableEvent) => void
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
  sortedOrders: SelectedIcuOrder[]
  hosId: string
}

export default function TemplateOrderTable({
  sortedOrders,
  isSorting,
  handleSortToggle,
  handleOrderMove,
  setSortedOrders,
  hosId,
}: Props) {
  const [orderWidth, setOrderWidth] = useLocalStorage<OrderWidth>(
    'orderWidth',
    400,
  )

  return (
    <Table className="border">
      <DtTableHeader
        isSorting={isSorting}
        orderWidth={orderWidth}
        setOrderWidth={setOrderWidth}
        onSortToggle={handleSortToggle}
        orderCount={sortedOrders.length}
      />

      {isSorting ? (
        <DtSortingOrderRows
          onOrderMove={handleOrderMove}
          setSortedOrders={setSortedOrders}
          isSorting={isSorting}
          sortedOrders={sortedOrders}
          orderWidth={orderWidth}
          hosId={hosId}
        />
      ) : (
        <TableBody>
          {sortedOrders.length === 0 ? (
            <DtNoOrder orderWidth={orderWidth} />
          ) : (
            <DtOrderRows
              sortedOrders={sortedOrders}
              isSorting={isSorting}
              orderWidth={orderWidth}
              setSortedOrders={setSortedOrders}
              hosId={hosId}
              isTemplate
            />
          )}

          <TableRow>
            <TableCell className="p-0">
              <DtOrderCreator
                hosId={hosId}
                sortedOrders={sortedOrders}
                setSortedOrders={setSortedOrders}
                isTemplate
              />
            </TableCell>

            <UserKeyGuideMessage isDT />
          </TableRow>
        </TableBody>
      )}
    </Table>
  )
}
