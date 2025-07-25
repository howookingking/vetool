import { ChecklistData } from '@/types/checklist/checklist-type'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import LocalTime from '@/components/hospital/checklist/common/localtime'
import { timeInterval } from '@/constants/checklist/checklist'
type Props = {
  checklistData: ChecklistData
}
export default function ChecklistReportTimetable({ checklistData }: Props) {
  return (
    <div>
      {' '}
      <div className="mb-3 ml-5 text-base">4.과정 및 시간</div>
      <Table className="m-5 w-[95%] min-w-[600px] border border-gray-300 text-center text-sm">
        <TableHeader>
          <TableRow className="bg-gray-200">
            <TableHead className="max-w-[40px] border border-gray-300 px-1 py-1 text-center font-semibold">
              +min(시간)
            </TableHead>
            <TableHead className="border border-gray-300 px-1 py-1 text-center">
              기록사항
            </TableHead>
            {/* <TableHead className="w-[50px] border border-gray-300 px-1 py-1 text-center font-semibold">
                    추가정보
                  </TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {checklistData?.starttime && (
            <TableRow className="even:bg-gray-100">
              <TableCell className="max-w-[40px] border border-gray-300 px-1 py-1">
                +0(
                <LocalTime time={checklistData.starttime} />)
              </TableCell>
              <TableCell className="border border-gray-300 px-1 py-1">
                {checklistData?.checklist_title
                  ? checklistData?.checklist_title + ' 시작 '
                  : ''}
              </TableCell>
            </TableRow>
          )}
          {checklistData?.checklist_timetable &&
            checklistData.checklist_timetable.map((list, i) => (
              <TableRow
                key={list.txt && list.txt + i}
                className="even:bg-gray-100"
              >
                <TableCell className="max-w-[40px] border border-gray-300 px-1 py-1">
                  +
                  {checklistData?.starttime &&
                    list.time &&
                    list.time !== 0 &&
                    Math.floor(
                      (list.time -
                        new Date(checklistData?.starttime).getTime()) /
                        (60 * 1000),
                    )}
                  (
                  {checklistData?.starttime && list.time && list.time !== 0 ? (
                    <LocalTime time={list.time} />
                  ) : (
                    '0'
                  )}
                  )
                </TableCell>
                <TableCell className="border border-gray-300 px-1 py-1">
                  {list.txt}
                </TableCell>
              </TableRow>
            ))}
          {checklistData?.endtime && checklistData?.starttime && (
            <TableRow className="even:bg-gray-100">
              <TableCell className="max-w-[40px] border border-gray-300 px-1 py-1">
                +
                {Math.floor(
                  (new Date(checklistData?.endtime).getTime() -
                    new Date(checklistData?.starttime).getTime()) /
                    (60 * 1000),
                )}
                (<LocalTime time={checklistData?.endtime} />)
              </TableCell>
              <TableCell className="border border-gray-300 px-1 py-1">
                {checklistData?.checklist_title + ' '} 종료
              </TableCell>
            </TableRow>
          )}
          <TableRow className="even:bg-gray-100">
            <TableCell className="max-w-[40px] border border-gray-300 px-1 py-1">
              요약
            </TableCell>
            <TableCell className="border border-gray-300 px-1 py-1">
              시작 :{' '}
              {checklistData?.starttime &&
                new Date(checklistData?.starttime).toLocaleTimeString('ko-KR', {
                  hour12: false,
                })}
              <br />
              종료 :{' '}
              {checklistData?.endtime &&
                new Date(checklistData?.endtime).toLocaleTimeString('ko-KR', {
                  hour12: false,
                })}
              <br />
              소요시간 :{' '}
              {checklistData?.starttime &&
              checklistData?.endtime &&
              timeInterval(checklistData.starttime, checklistData.endtime)[1]
                ? timeInterval(
                    checklistData.starttime,
                    checklistData.endtime,
                  )[1] + '시간 '
                : ''}
              {checklistData?.starttime &&
              checklistData?.endtime &&
              timeInterval(checklistData.starttime, checklistData.endtime)[2]
                ? timeInterval(
                    checklistData.starttime,
                    checklistData.endtime,
                  )[2] + '분'
                : '0분'}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
