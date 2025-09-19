import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import type { ChecklistWithPatientWithWeight } from '@/lib/services/checklist/checklist-data'

export default function ClTimeIndicatorTable({
  checklistData,
}: {
  checklistData: ChecklistWithPatientWithWeight
}) {
  return (
    <Table className="m-3 w-[400px] border text-left text-sm text-gray-700">
      <TableBody>
        <TableRow className="transition-colors hover:bg-muted/20">
          <TableCell>시작시간</TableCell>
          <TableCell>
            {checklistData.start_time &&
              new Date(checklistData.start_time).toLocaleTimeString('ko-KR', {
                hour12: false,
              })}
          </TableCell>
        </TableRow>
        <TableRow className="bg-muted/30 hover:bg-muted/40">
          <TableCell>종료시간</TableCell>
          <TableCell>
            {checklistData.end_time &&
              new Date(checklistData.end_time).toLocaleTimeString('ko-KR', {
                hour12: false,
              })}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
