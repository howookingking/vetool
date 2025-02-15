import { CHECKLIST_ORDERS } from '@/constants/hospital/icu/chart/order'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const HOURS = Array.from({ length: 24 }, (_, i) =>
  String(i + 1).padStart(2, '0'),
)

export default function DesktopMockupTable() {
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
              className="text-bold border border-r border-input text-center"
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
            {HOURS.map((_, i) => (
              <TableCell key={i} className="border border-input text-center">
                {Math.random() > 0.9 ? '✓' : Math.random() > 0.95 ? 'O' : ''}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
