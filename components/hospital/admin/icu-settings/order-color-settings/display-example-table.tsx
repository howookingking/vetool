import DtOrderRows from '@/components/hospital/common/default-template-order/dt-order-rows'
import DtTableHeader from '@/components/hospital/common/default-template-order/dt-table-header'
import { Table, TableBody } from '@/components/ui/table'
import useLocalStorage from '@/hooks/use-local-storage'
import type { IcuOrderColors } from '@/types/adimin'
import type { OrderWidth } from '@/types/hospital/order'
import type { SelectedIcuOrder } from '@/types/icu/chart'

export default function DisplayExampleTable({
  localColorState,
}: {
  localColorState: IcuOrderColors
}) {
  const [orderWidth] = useLocalStorage<OrderWidth>('orderWidth', 400)

  return (
    <div className="relative">
      <Table className="border">
        <DtTableHeader
          isSorting={false}
          setIsSorting={() => {}}
          orderWidth={orderWidth}
          setOrderWidth={() => {}}
          sortedOrders={DUMMY_ORDERS}
          defaultChartOrders={[]}
        />

        <TableBody>
          <DtOrderRows
            sortedOrders={DUMMY_ORDERS}
            isSorting={false}
            orderwidth={orderWidth}
            localColorState={localColorState}
          />
        </TableBody>
      </Table>

      <div className="absolute inset-0 flex h-full cursor-not-allowed items-center justify-center">
        <div className="rounded-sm bg-black/30 px-10 py-5 text-center text-white">
          <span className="text-xl font-bold">적용 예시</span>
        </div>
      </div>
    </div>
  )
}

const DUMMY_ORDERS: SelectedIcuOrder[] = [
  {
    id: 0,
    order_type: 'checklist',
    is_bordered: false,
    order_comment: null,
    order_id: '0',
    order_name: '체크리스트',
    order_times: [
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
    ],
    treatments: [],
  },
  {
    id: 1,
    order_type: 'fluid',
    is_bordered: false,
    order_comment: null,
    order_id: '1',
    order_name: '수액',
    order_times: [
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
    ],
    treatments: [],
  },
  {
    id: 2,
    order_type: 'injection',
    is_bordered: false,
    order_comment: null,
    order_id: '2',
    order_name: '주사',
    order_times: [
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
    ],
    treatments: [],
  },
  {
    id: 3,
    order_type: 'po',
    is_bordered: false,
    order_comment: null,
    order_id: '3',
    order_name: '경구',
    order_times: [
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
    ],
    treatments: [],
  },

  {
    id: 4,
    order_type: 'test',
    is_bordered: false,
    order_comment: null,
    order_id: '4',
    order_name: '검사',
    order_times: [
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
    ],
    treatments: [],
  },

  {
    id: 5,
    order_type: 'feed',
    is_bordered: false,
    order_comment: null,
    order_id: '6',
    order_name: '식이',
    order_times: [
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
    ],
    treatments: [],
  },
  {
    id: 6,
    order_type: 'manual',
    is_bordered: false,
    order_comment: null,
    order_id: '5',
    order_name: '기타',
    order_times: [
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
    ],
    treatments: [],
  },
] as const
