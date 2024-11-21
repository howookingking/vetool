import SummaryTableRow from '@/components/hospital/icu/main/summary/table/summary-table-row'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TIMES } from '@/constants/hospital/icu/chart/time'
import { cn } from '@/lib/utils/utils'
import type { SummaryData } from '@/types/icu/summary'

export default function SummaryTable({
  summaryData,
}: {
  summaryData: SummaryData[]
}) {
  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px] text-center">환자목록</TableHead>

          {TIMES.map((time) => (
            <TableHead className={cn('border text-center')} key={time}>
              {time.toString().padStart(2, '0')}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {summaryData.map((summary) => (
          <SummaryTableRow key={summary.icu_chart_id} summary={summary} />
        ))}
      </TableBody>
    </Table>
  )
}
