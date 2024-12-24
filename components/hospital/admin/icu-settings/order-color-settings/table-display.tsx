import OrderTypeColorDot from '@/components/hospital/common/order-type-color-dot'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { IcuOrderColors } from '@/types/adimin'

const SAMPLE_ORDERS = [
  {
    orderTitle: '체크리스트 오더',
    orderType: 'checklist',
  },
  {
    orderTitle: '수액 오더',
    orderType: 'fluid',
  },
  {
    orderTitle: '주사 오더',
    orderType: 'injection',
  },
  {
    orderTitle: '경구 오더',
    orderType: 'po',
  },
  {
    orderTitle: '검사 오더',
    orderType: 'test',
  },
  {
    orderTitle: '기타 오더',
    orderType: 'manual',
  },
  {
    orderTitle: '식이 오더',
    orderType: 'feed',
  },
]

export default function TableDisplay({
  localColorState,
  localColorDisplayMethod,
}: {
  localColorState: IcuOrderColors
  localColorDisplayMethod: string
}) {
  return (
    <section className="space-y-2">
      <h3 className="text-center font-semibold">- 디스플레이 예시 -</h3>
      <Table className="border">
        <TableHeader className="bg-white shadow-sm">
          <TableRow>
            <TableHead className="w-[200px] text-center">오더목록</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {SAMPLE_ORDERS.map((order) => (
            <TableRow
              key={order.orderTitle}
              className="relative w-full divide-x"
            >
              <TableCell
                style={{
                  background:
                    localColorDisplayMethod === 'full'
                      ? localColorState[order.orderType as keyof IcuOrderColors]
                      : '',
                }}
              >
                <div className="flex items-center gap-2">
                  {localColorDisplayMethod === 'dot' && (
                    <OrderTypeColorDot
                      orderColorsData={localColorState}
                      orderType={order.orderType}
                    />
                  )}
                  <span>{order.orderTitle}</span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  )
}
