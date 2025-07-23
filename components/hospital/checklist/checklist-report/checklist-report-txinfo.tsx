import { ChecklistData } from '@/types/checklist/checklist-type'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
type Props = {
  checklistData: ChecklistData
}
export default function ChecklistReportTxInfo({ checklistData }: Props) {
  return (
    <div>
      <div className="mb-3 ml-5 text-base">3.처치 정보</div>
      <Table className="m-5 w-[95%] min-w-[600px] border border-gray-300 text-center text-sm">
        <TableHeader>
          <TableRow className="bg-gray-200">
            <TableHead className="max-w-[40px] border border-gray-300 px-1 py-1 text-center font-semibold">
              구분
            </TableHead>
            <TableHead className="border border-gray-300 px-1 py-1 text-center">
              처치 정보
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="even:bg-gray-100">
            <TableCell className="max-w-[40px] border border-gray-300 px-1 py-1">
              전처치
            </TableCell>
            <TableCell className="whitespace-pre border border-gray-300 px-1 py-1 pl-3 text-left">
              {checklistData?.preinfo?.pre}
            </TableCell>
          </TableRow>
          {checklistData.checklist_type === '마취' &&
            checklistData?.preinfo?.induce && (
              <TableRow className="even:bg-gray-100">
                <TableCell className="max-w-[40px] border border-gray-300 px-1 py-1">
                  유도마취
                </TableCell>
                <TableCell className="whitespace-pre border border-gray-300 px-1 py-1 pl-3 text-left">
                  {checklistData?.preinfo?.induce}
                </TableCell>
              </TableRow>
            )}
          <TableRow className="even:bg-gray-100">
            <TableCell className="max-w-[40px] border border-gray-300 px-1 py-1">
              {checklistData.checklist_type === '마취'
                ? '유지마취'
                : '주요처치'}
            </TableCell>
            <TableCell className="whitespace-pre border border-gray-300 px-1 py-1 pl-3 text-left">
              {checklistData?.preinfo?.main}
            </TableCell>
          </TableRow>
          <TableRow className="even:bg-gray-100">
            <TableCell className="max-w-[40px] border border-gray-300 px-1 py-1">
              후처치
            </TableCell>
            <TableCell className="whitespace-pre border border-gray-300 px-1 py-1 pl-3 text-left">
              {checklistData?.preinfo?.post}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
