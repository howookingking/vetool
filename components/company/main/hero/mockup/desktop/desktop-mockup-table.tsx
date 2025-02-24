import { CHECKLIST_ORDERS } from '@/constants/hospital/icu/chart/order'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils/utils'
import { TxDetailHover } from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/tx/tx-detail-hover'

const HOURS = Array.from({ length: 24 }, (_, i) =>
  String(i + 1).padStart(2, '0'),
)

// 20% 확률로 값을 표시하는 함수
const shouldShowValue = () => Math.random() < 0.2

// 현실적인 목업 데이터 생성 함수들
const generateVitalSigns = (baseValue: number, variance: number) => {
  return HOURS.map(() => {
    if (!shouldShowValue()) return ''

    const randomVariance = (Math.random() - 0.5) * variance
    const result = baseValue + randomVariance

    return result.toFixed(0)
  })
}

export default function DesktopMockupTable() {
  const MOCK_DATA = {
    '체온(T)': generateVitalSigns(38.5, 0.6),
    '심박수(P)': generateVitalSigns(190, 30),
    '호흡수(R)': generateVitalSigns(25, 6),
    '혈압(BP)': generateVitalSigns(130, 20),
    SPO2: generateVitalSigns(97, 5),
    혈당: generateVitalSigns(110, 20),
    구토: HOURS.map(() => {
      if (!shouldShowValue()) return ''

      return Math.random() > 0.85 ? 'O' : ''
    }),
    배변: HOURS.map(() => {
      if (!shouldShowValue()) return ''
      const random = Math.random()
      if (random > 0.8) return 'O'
      if (random > 0.95) return 'X'
      return ''
    }),

    배뇨: HOURS.map(() => {
      if (!shouldShowValue()) return ''
      return Math.random() > 0.7 ? 'O' : 'X'
    }),
  }

  return (
    <Table className="rounded-lg border">
      <TableHeader>
        <TableRow>
          <TableHead className="min-w-[160px] border border-r border-input text-center">
            오더 목록
          </TableHead>
          {HOURS.map((hour) => (
            <TableHead
              key={hour}
              className="text-bold w-10 border border-r border-input text-center"
            >
              {hour}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {CHECKLIST_ORDERS.map((order) => (
          <TableRow key={order}>
            <TableCell className="flex items-center gap-2 border-r border-input font-semibold">
              <div className="h-3 w-3 shrink-0 rounded-full border bg-yellow-400" />
              {order}
            </TableCell>

            {HOURS.map((_, index) => {
              const value =
                MOCK_DATA[order as keyof typeof MOCK_DATA]?.[index] || ''
              const hasValue = value !== ''
              const showRoseBackground = !hasValue && Math.random() < 0.1

              return (
                <TableCell
                  key={index}
                  className={cn(
                    'relative w-10 border border-input text-center',
                    hasValue && 'bg-emerald-400/10',
                    showRoseBackground && 'bg-rose-400/10',
                  )}
                >
                  {value}
                  {hasValue && Math.random() < 0.1 && (
                    <TxDetailHover txComment={null} />
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
