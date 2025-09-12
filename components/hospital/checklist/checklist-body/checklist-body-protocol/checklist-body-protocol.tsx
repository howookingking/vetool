'use client'
import { ChecklistData } from '@/types/checklist/checklist-type'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { minToLocalTime } from '@/constants/checklist/checklist'
import { updateEachChecklist } from '@/lib/services/checklist/get-checklist-data-client'
import LocalTime from '@/components/hospital/checklist/common/localtime'
import { useEffect, useState } from 'react'
import { LoaderCircle } from 'lucide-react'
import { cn } from '@/lib/utils/utils'
type Props = {
  checklistData: ChecklistData
}
export default function ChecklistBodyProtocol({ checklistData }: Props) {
  const [isCheckLoad, setIsCheckLoad] = useState<boolean>(false)
  useEffect(() => {
    setIsCheckLoad(false)
  }, [checklistData])
  const changeCheckbox = (checked: boolean, index: number) => {
    setIsCheckLoad(true)
    const newProtocol = checklistData.checklist_protocol && [
      ...checklistData.checklist_protocol,
    ]
    if (checked && newProtocol && newProtocol.length > 0) {
      newProtocol[index].txEnd = new Date().getTime()
      const predata = { ...checklistData } as ChecklistData
      predata.checklist_protocol = newProtocol
      !predata.checklist_timetable && (predata.checklist_timetable = [])
      predata.checklist_timetable = makeTimetableTx(
        newProtocol[index].title + '',
        newProtocol[index].type + '-' + index,
      )
      updateEachChecklist(predata)
    } else if (!checked && newProtocol && newProtocol.length > 0) {
      newProtocol[index].txEnd = null
      const predata = { ...checklistData } as ChecklistData
      predata.checklist_protocol = newProtocol
      !predata.checklist_timetable && (predata.checklist_timetable = [])
      predata.checklist_timetable =
        cancelTimetableTx(
          newProtocol[index].title + '',
          newProtocol[index].type + '-' + index,
        ) ?? []
      updateEachChecklist(predata)
    }
  }
  const makeTimetableTx = (pretxt: string, type: string) => {
    const txt = pretxt
    if (checklistData.checklist_timetable) {
      const newTimetable = [...checklistData.checklist_timetable]
      newTimetable.push({
        time: new Date().getTime(),
        txt: txt,
        type: type,
        imgurl: null,
      })
      return newTimetable
    } else {
      const newTimetable = []
      newTimetable.push({
        time: new Date().getTime(),
        txt: txt,
        type: type,
        imgurl: null,
      })
      return newTimetable
    }
  }
  const cancelTimetableTx = (pretxt: string, type: string) => {
    const txt = pretxt
    if (checklistData.checklist_timetable) {
      const newTimetable = [...checklistData.checklist_timetable]
      const index = newTimetable.findIndex((item) => item.type === type)
      if (index !== -1) {
        newTimetable.splice(index, 1)
        return newTimetable
      }
    }
  }
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>체크</TableHead>
            <TableHead>구분</TableHead>
            <TableHead>내용</TableHead>
            <TableHead>추가정보</TableHead>
            <TableHead>예정시간</TableHead>
            <TableHead>완료시간</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {checklistData?.checklist_protocol?.map((protocol, index) => (
            <TableRow key={index}>
              <TableCell>
                <Checkbox
                  className={cn(
                    isCheckLoad
                      ? 'hidden'
                      : protocol?.type === 'check'
                        ? 'border-red-600 data-[state=checked]:bg-white data-[state=checked]:text-red-600'
                        : 'border-green-600 data-[state=checked]:bg-white data-[state=checked]:text-green-600',
                  )}
                  checked={
                    protocol?.txEnd && Number(protocol?.txEnd) > 0
                      ? true
                      : false
                  }
                  //   onCheckedChange={changeCheckbox}
                  onCheckedChange={(checked: boolean) =>
                    changeCheckbox(checked, index)
                  }
                />{' '}
                <LoaderCircle
                  className={cn(isCheckLoad ? 'ml-2 animate-spin' : 'hidden')}
                />
              </TableCell>
              <TableCell>
                {protocol?.type === 'protocol' ? '과정' : '주의/확인'}
              </TableCell>
              <TableCell>{protocol?.title}</TableCell>
              <TableCell className="whitespace-pre">
                {protocol?.addinfo}
              </TableCell>
              <TableCell>
                <div className="flex items-center text-sm">
                  <div>
                    {' '}
                    {protocol?.dueStart && protocol.mode === 'afterstart'
                      ? '치료시작'
                      : protocol.mode && '이전과정'}{' '}
                    {protocol?.dueStart && protocol.dueStart + '분후'}
                  </div>

                  {checklistData.starttime &&
                  protocol?.mode === 'afterstart' &&
                  protocol?.dueStart ? (
                    <div>
                      (예정시간{' '}
                      {
                        minToLocalTime(
                          String(checklistData.starttime),
                          String(protocol.dueStart),
                        )[1]
                      }
                      )
                    </div>
                  ) : (
                    index > 0 &&
                    checklistData.starttime &&
                    checklistData.checklist_protocol &&
                    checklistData.checklist_protocol[index - 1].txEnd &&
                    protocol?.dueStart && (
                      <div>
                        (예정시간{' '}
                        <LocalTime
                          time={
                            Number(
                              checklistData.checklist_protocol[index - 1].txEnd,
                            ) +
                            Number(protocol?.dueStart) * 60000
                          }
                        />
                        )
                      </div>
                    )
                  )}
                </div>
              </TableCell>
              <TableCell>
                {protocol?.txEnd && Number(protocol?.txEnd) > 0 ? (
                  <LocalTime time={protocol?.txEnd} />
                ) : (
                  '-'
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
