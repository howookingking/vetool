import OrderTypeColorDot from '@/components/hospital/common/order/order-type-color-dot'
import { CurrentTimeIndicator } from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table-header/current-time-indicator'
import { VitalResultIndication } from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/vital-result-indication'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { OrderType } from '@/constants/hospital/icu/chart/order'
import { TIMES } from '@/constants/hospital/icu/chart/time'
import { cn } from '@/lib/utils/utils'

export default function DesktopMockupTable() {
  return (
    <Table className="rounded-lg border">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[280px] min-w-[120px] border border-r border-input text-center">
            오더 목록
          </TableHead>
          {TIMES.map((time) => {
            return (
              <TableHead
                key={time}
                className="text-bold relative w-10 border border-r border-input text-center"
              >
                {time.toString().padStart(2, '0')}
                {time === 11 && <CurrentTimeIndicator minutes={20} />}
              </TableHead>
            )
          })}
        </TableRow>
      </TableHeader>

      <TableBody>
        {MOCKUP_ORDERS.map((order) => (
          <TableRow key={order.orderName}>
            <TableCell className="flex items-center justify-between gap-2 border-input font-semibold">
              <div className="flex items-center gap-2">
                <OrderTypeColorDot
                  orderType={order.orderType}
                  orderColorsData={{
                    po: '#a3e635',
                    feed: '#a78bfa',
                    test: '#4ade80',
                    fluid: '#fb923c',
                    manual: '#38bdf8',
                    checklist: '#f87171',
                    injection: '#facc15',
                  }}
                />
                <span className="whitespace-nowrap">{order.orderName}</span>
                {order.vitalRefRange && (
                  <span className="text-xs text-muted-foreground">
                    ({order.vitalRefRange.min}~{order.vitalRefRange.max})
                  </span>
                )}
              </div>
              <span className="min-w-16 truncate text-right text-xs font-semibold text-muted-foreground">
                {order.orderComment}
              </span>
            </TableCell>

            {TIMES.map((time) => {
              const orderTime = order.orderTime
              const hasOrder = orderTime.includes(time)
              const value = order.value[orderTime.indexOf(time)]
              return (
                <TableCell
                  key={time}
                  className={cn(
                    'relative w-10 border border-input text-center',
                    hasOrder && 'bg-rose-400/10',
                    value && 'bg-emerald-400/10',
                  )}
                >
                  {value}
                  {order.orderName === '체온' && value === '37.2' && (
                    <VitalResultIndication result="below" />
                  )}
                  {order.orderName === '호흡수' &&
                    (value === '42' || value === '40' || value === '36') && (
                      <VitalResultIndication result="above" />
                    )}
                  {order.orderName === '혈압' && value === '170' && (
                    <VitalResultIndication result="above" />
                  )}
                </TableCell>
              )
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

const MOCKUP_ORDERS: {
  orderName: string
  orderType: OrderType
  orderTime: number[]
  orderComment?: string
  value: (string | undefined)[]
  vitalRefRange?: {
    min: number
    max: number
  }
}[] = [
  {
    orderName: '체온',
    orderType: 'checklist',
    orderTime: [3, 9, 15, 21],
    value: ['37.2', '38.2'],
    vitalRefRange: {
      min: 38,
      max: 39.2,
    },
  },
  {
    orderName: '심박수',
    orderType: 'checklist',
    orderTime: [3, 9, 15, 21],
    value: ['190', '170'],
    vitalRefRange: {
      min: 140,
      max: 220,
    },
  },
  {
    orderName: '호흡수',
    orderType: 'checklist',
    orderTime: [0, 3, 6, 9, 12, 15, 18, 21],
    value: ['42', '40', '36', '30'],
    vitalRefRange: {
      min: 15,
      max: 30,
    },
  },
  {
    orderName: '혈압',
    orderType: 'checklist',
    orderComment: '자동#3LA',
    orderTime: [3, 9, 15, 21],
    value: ['170', '120'],
    vitalRefRange: {
      min: 110,
      max: 160,
    },
  },

  {
    orderName: 'AMC 12.5mg/kg IV',
    orderType: 'injection',
    orderComment: '0.5ml',
    orderTime: [6, 18],
    value: ['✓'],
  },
  {
    orderName: 'Esomeprazole 1mg/kg SC',
    orderType: 'injection',
    orderComment: '0.5ml',
    orderTime: [6, 18],
    value: ['✓'],
  },
  {
    orderName: 'Maropitant 1mg/kg SC',
    orderType: 'injection',
    orderComment: '0.5ml',
    orderTime: [6],
    value: ['✓'],
  },
  {
    orderName: 'mPCV',
    orderType: 'test',
    orderTime: [10],
    value: ['✓'],
  },
  {
    orderName: '복부초음파',
    orderType: 'test',
    orderTime: [10],
    value: ['✓'],
  },
  {
    orderName: 'A/D 100g',
    orderType: 'feed',
    orderComment: '핸드피딩',
    orderTime: [9, 21],
    value: ['✓'],
  },
]
