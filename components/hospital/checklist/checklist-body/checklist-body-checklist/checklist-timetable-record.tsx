'use client'
import { Button } from '@/components/ui/button'
import { updateEachChecklist } from '@/lib/services/checklist/get-checklist-data-client'
import { ChecklistData, TimeTable } from '@/types/checklist/checklist-type'
import { Pencil } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import ChecklistTimetableTimeEditor from '@/components/hospital/checklist/checklist-body/checklist-body-checklist/checklist-timetabletime-editor'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useEffect, useState } from 'react'
import LocalTime from '@/components/hospital/checklist/common/localtime'
import { LoaderCircle } from 'lucide-react'
import { cn } from '@/lib/utils/utils'
type Props = {
  checklistData: ChecklistData
}

export default function ChecklistTimetableRecord({ checklistData }: Props) {
  const [dialogecontent, setDialogcontent] = useState<{
    pretime: number
    index: number
    name: string
    txt: string
  }>({
    pretime: 0,
    index: 0,
    name: 'txStart',
    txt: '',
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isTableLoad, setIsTableLoad] = useState<boolean>(false)
  const [timetable, setTableTime] = useState<TimeTable | null>(null)
  useEffect(() => {
    checklistData?.checklist_timetable &&
      setTableTime(
        checklistData.checklist_timetable.sort((a, b) => {
          return a.time! - b.time!
        }),
      )
    setIsTableLoad(false)
  }, [checklistData])

  const deleteTimetableTx = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsTableLoad(true)
    const index = e.currentTarget.name
    if (timetable && timetable.length > 0 && index) {
      const newTimetable = [...timetable]
      const timetableType = newTimetable[Number(index)].type + ''
      newTimetable.splice(Number(index), 1)
      const predata = { ...checklistData } as ChecklistData
      predata.checklist_timetable = newTimetable
      if (
        timetableType.indexOf('protocol-') !== -1 ||
        timetableType.indexOf('check-') !== -1
      ) {
        const newProtocol = checklistData.checklist_protocol && [
          ...checklistData.checklist_protocol,
        ]
        const protocolIndex = Number(timetableType.split('-')[1])
        newProtocol && (newProtocol[protocolIndex].txEnd = null)
        predata.checklist_protocol = newProtocol
        updateEachChecklist(predata)
        setIsDialogOpen(false)
      } else {
        updateEachChecklist(predata)
        setIsDialogOpen(false)
      }
    }
  }
  const setTime = (time: number, index: number, name: string, txt: string) => {
    setIsTableLoad(true)
    if (txt !== '' && name === 'time') {
      //timetable 변경
      const predata = { ...checklistData } as ChecklistData
      predata.checklist_timetable &&
        (predata.checklist_timetable[index].time = time)
      predata.checklist_timetable &&
        (predata.checklist_timetable[index].txt = txt)
      updateEachChecklist(predata)
      setIsDialogOpen(false)
    } else {
      //protocol변경
      const predata = { ...checklistData } as any
      predata.checklist_protocol[index][name] = time
      if (predata.checklist_protocol[index].type === 'main') {
        const tableindex =
          name === 'txStart'
            ? predata.checklist_timetable.findIndex(
                (x: any) =>
                  x.txt === predata.checklist_protocol[index].title + ' 시작',
              )
            : predata.checklist_timetable.findIndex(
                (x: any) =>
                  x.txt === predata.checklist_protocol[index].title + ' 종료',
              )
        predata.checklist_timetable[tableindex].time = time
        updateEachChecklist(predata)
        setIsDialogOpen(false)
      } else {
        const tableindex = predata.checklist_timetable.findIndex(
          (x: any) =>
            x.txt === predata.checklist_protocol[index].title + ' 완료',
        )
        predata.checklist_timetable[tableindex].time = time
        updateEachChecklist(predata)
        setIsDialogOpen(false)
      }
    }
  }
  return (
    <div className="mb-20 flex-col">
      <div>과정중 기록사항</div>
      <div className="overflow-x-auto">
        <Table className="m-1 mr-3 w-[97%] min-w-[400px] border border-gray-300 text-center text-sm">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="max-w-[40px] border border-gray-300 px-1 py-1 text-center font-semibold">
                +min
              </TableHead>
              <TableHead className="border border-gray-300 px-1 py-1 text-center">
                기록사항
              </TableHead>
              <TableHead className="w-[100px] border border-gray-300 px-1 py-1 text-center font-semibold">
                삭제/수정
              </TableHead>
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
                    ? checklistData?.checklist_title + ' '
                    : ''}{' '}
                  시작
                </TableCell>
              </TableRow>
            )}
            {timetable &&
              timetable.map((list, i) => (
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
                    {checklistData?.starttime &&
                    list.time &&
                    list.time !== 0 ? (
                      <LocalTime time={list.time} />
                    ) : (
                      '0'
                    )}
                    )
                  </TableCell>
                  <TableCell className="border border-gray-300 px-1 py-1">
                    {list.txt}
                  </TableCell>
                  <TableCell className="border border-gray-300 px-1 py-1">
                    {isTableLoad ? (
                      <LoaderCircle
                        className={cn(
                          isTableLoad ? 'ml-2 animate-spin' : 'hidden',
                        )}
                      />
                    ) : (
                      <div className="flex">
                        <Button
                          variant="outline"
                          size="sm"
                          name={String(i)}
                          onClick={deleteTimetableTx}
                          className="w-[40px]"
                          title="삭제"
                        >
                          -
                        </Button>
                        {list.type === 'txt' && (
                          <Button
                            variant="outline"
                            size="sm"
                            name={String(i)}
                            onClick={() => {
                              setDialogcontent({
                                pretime: Number(list.time),
                                index: i,
                                name: 'time',
                                txt: String(list.txt),
                              })
                              setIsDialogOpen(true)
                            }}
                            className="w-[40px]"
                          >
                            <Pencil size={20}></Pencil>
                          </Button>
                        )}
                      </div>
                    )}
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
                  {checklistData?.checklist_title
                    ? checklistData?.checklist_title + ' '
                    : ''}{' '}
                  종료
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogTitle>시간변경</DialogTitle>
          <DialogContent>
            <ChecklistTimetableTimeEditor
              pretime={dialogecontent.pretime}
              index={dialogecontent.index}
              name={dialogecontent.name}
              txt={dialogecontent.txt}
              setTime={setTime}
            />
          </DialogContent>
        </DialogContent>
      </Dialog>
    </div>
  )
}
