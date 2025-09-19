'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { toast } from '@/components/ui/use-toast'
import {
  checkListSetArray,
  defaultChecklistSet,
  minToLocalTime,
} from '@/constants/checklist/checklist'
import useMinutesPassed from '@/hooks/use-minute-passed'
import {
  type ChecklistWithPatientWithWeight,
  updateEachChecklist,
} from '@/lib/services/checklist/get-checklist-data-client'
import type {
  ChecklistResults,
  CheckNameArray,
} from '@/types/checklist/checklist-type'
import { LoaderCircle, Pencil } from 'lucide-react'
import { useEffect, useState } from 'react'
import ChecklistBodyTableCell from './checklist-body-tablecell'
import ChecklistEditTableRow from './checklist-edit-table-row'
import ChecklistTimetableAdd from './checklist-timetable-add'

type Props = {
  checklistData: ChecklistWithPatientWithWeight
}

export default function ChecklistBodyTable({ checklistData }: Props) {
  const timeMin = useMinutesPassed(checklistData.start_time)

  const [checktime, setCheckTime] = useState<string>('0')
  const [interval, setInterval] = useState<string>('1')
  const [checklistname, setCheckListNames] = useState<CheckNameArray>([])
  const [tabletimes, setTableTimes] = useState<number[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [newresult, setNewResult] = useState<{
    time: string
    newresult: ChecklistResults
  }>({ time: '', newresult: {} })
  const [isEditOpen, setIseditTableRowOpen] = useState(false)

  useEffect(() => {
    const prenames: string[] = []
    const pretimes: number[] = []
    checklistData?.checklist_set?.result &&
      Object.keys(checklistData.checklist_set.result).map((key) => {
        Number(key) && Number(key) >= 0 && pretimes.push(Number(key))
        checklistData?.checklist_set?.result &&
          prenames.push(...Object.keys(checklistData.checklist_set.result[key]))
      })

    prenames.push('비고')

    checklistData &&
    checklistData.checklist_set?.preSet &&
    checklistData.checklist_set.preSet.length > 0
      ? checklistData?.checklist_set?.preSet.map((set) => {
          if (
            set.settime &&
            set.settime !== '' &&
            Number(set.settime) >= 0 &&
            pretimes.indexOf(Number(set.settime)) === -1
          ) {
            pretimes.push(Number(set.settime))
            set.setname &&
              set.setname.length > 0 &&
              prenames.push(...set.setname)
          }
        })
      : prenames.push(...defaultChecklistSet.preSet[0].setname)

    if (timeMin && interval && Number(interval) >= 1) {
      const _checktime = Number(timeMin) // 시작후
      const _interval = Number(interval) // 세팅된 측정간격
      const cal1 = Math.floor(_checktime / _interval)
      const cal2 = _checktime & _interval
      if (_checktime >= _interval) {
        const preNewResult = { ...newresult }
        preNewResult.time = String(_interval * cal1)
        setNewResult(preNewResult)
      } else if (_checktime < _interval) {
        const preNewResult = { ...newresult }
        preNewResult.time = '0'
        setNewResult(preNewResult)
      }
    } else {
      setCheckTime(String(timeMin))
      const preNewResult = { ...newresult }
      preNewResult.time = String(timeMin)
      timeMin && setNewResult(preNewResult)
    }
    checklistData &&
      checklistData.checklist_set?.interval &&
      setInterval(String(checklistData.checklist_set.interval))
    const prenames2: CheckNameArray = []
    checkListSetArray.map((set) => {
      if (set.name && prenames.indexOf(set.name) !== -1) {
        prenames2.push(set)
      }
    })
    pretimes.sort((a, b) => a - b)
    checklistData && setIsSaving(false)
    setTableTimes(pretimes)
    setCheckListNames([...prenames2])
  }, []) //체크리스트 종류

  const savenewChecklistChart = () => {
    setIsSaving(true)
    if (checklistData && newresult.time && newresult.newresult) {
      const predata = { ...checklistData }
      predata.checklist_set ??= { result: {}, preSet: [] }
      predata.checklist_set.result ??= {}
      if (predata.checklist_set.result[newresult.time]) {
        const confirmed = window.confirm(
          '이미 해당 시간에 결과가 있습니다. 덮어쓰시겠습니까?',
        )
        if (confirmed) {
          predata.checklist_set.result[newresult.time] = newresult.newresult
          updateEachChecklist(predata)
            .then(() => {
              setNewResult({ time: '', newresult: {} })
            })
            .catch((error) => {
              console.error('Error saving txChart:', error)
            })
        }
      } else {
        predata.checklist_set.result[newresult.time] = newresult.newresult
        updateEachChecklist(predata)
          .then(() => {
            setNewResult({ time: '', newresult: {} })
          })
          .catch((error) => {
            console.error('Error saving txChart:', error)
          })
      }
    } else {
      toast({
        title: '오류',
        description: '시간과 결과를 입력해주세요.',
      })
    }
  }

  const delTableRow = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (window.confirm('해당 행을 삭제하시겠습니까?')) {
      const time = e.currentTarget.name
      if (checklistData && time) {
        const predata = { ...checklistData }
        if (
          predata.checklist_set?.result &&
          predata.checklist_set.result[time]
        ) {
          delete predata.checklist_set.result[time]
          updateEachChecklist(predata)
            .then(() => {
              toast({
                title: '성공',
                description: '해당 행이 삭제되었습니다.',
              })
            })
            .catch((error) => {
              console.error('Error deleting row:', error)
            })
        } else {
          toast({
            title: '오류',
            description: '해당 행이 존재하지 않습니다.',
          })
        }
      }
    }
  }
  const changeTableCellResult = (e: React.ChangeEvent<HTMLInputElement>) => {
    const predata = { ...newresult }
    predata.newresult[e.target.name] = e.target.value
    setNewResult(predata)
  }
  return (
    <div className="overflow-x-auto">
      <ChecklistTimetableAdd checklistData={checklistData} />
      <Table className="m-1 mr-3 w-[97%] min-w-[600px] border border-gray-300 text-center text-sm">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="border border-gray-300 px-4 py-2 text-center font-semibold">
              +min(시간)
            </TableHead>
            {checklistname &&
              checklistname.map((list, i) => (
                <TableHead
                  className="border border-gray-300 px-4 py-2 text-center"
                  key={'name' + i}
                >
                  {window.innerWidth > 800
                    ? list.name + '(' + list.displayName + ')'
                    : window.innerWidth > 600
                      ? list.name
                      : list.displayName}
                </TableHead>
              ))}
            <TableHead className="w-[90px] border border-gray-300 px-4 py-2">
              삭제/수정
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {checklistData &&
            checklistData.start_time &&
            tabletimes &&
            tabletimes.map((time, i) => (
              <TableRow key={time + i} className="even:bg-gray-100">
                <TableCell className="border border-gray-300 px-4 py-2">
                  +{String(time)}(
                  {
                    minToLocalTime(
                      checklistData?.start_time
                        ? checklistData.start_time
                        : '0',
                      String(time),
                    )[1]
                  }
                  )
                </TableCell>
                {checklistname &&
                  checklistname.map((list, j) => (
                    <TableCell
                      className="border border-gray-300 px-4 py-2"
                      key={'list' + j}
                    >
                      {isSaving ? (
                        <LoaderCircle className="ml-2 animate-spin" />
                      ) : (
                        <ChecklistBodyTableCell
                          time={String(time)}
                          name={list.name}
                          checklistData={checklistData}
                          setIsSaving={setIsSaving}
                        />
                      )}
                    </TableCell>
                  ))}
                <TableCell className="flex items-center justify-center px-1 py-3">
                  <Button
                    variant="outline"
                    onClick={delTableRow}
                    size="sm"
                    name={String(time)}
                  >
                    -
                  </Button>
                  <Dialog key={'dialog' + i}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" className="ml-2">
                        <Pencil size={14} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="h-auto w-auto max-w-full pt-6">
                      <DialogHeader>
                        <DialogTitle>수정</DialogTitle>
                      </DialogHeader>
                      <ChecklistEditTableRow
                        pretime={String(time)}
                        checklistData={checklistData}
                        checklistname={checklistname}
                        setIsSaving={setIsSaving}
                        setIseditTableRowOpen={setIseditTableRowOpen}
                      ></ChecklistEditTableRow>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          <TableRow className="even:bg-gray-100">
            <TableCell className="flex flex-wrap justify-center px-1 font-semibold">
              <div className="flex">
                <div>+</div>
                <Input
                  className="h-[20px] w-[50px]"
                  value={newresult.time}
                  placeholder="시간"
                  // type="number"
                  onChange={(e) =>
                    setNewResult({ ...newresult, time: e.target.value })
                  }
                ></Input>
              </div>
              <div className="text-xs">
                (
                {
                  minToLocalTime(
                    checklistData?.start_time ?? '0',
                    String(newresult.time),
                  )[1]
                }
                )
              </div>
            </TableCell>
            {checklistname &&
              checklistname.map((list, j) => (
                <TableCell
                  className="border border-gray-300 px-4 py-2"
                  key={'list' + j}
                >
                  <Input
                    value={newresult.newresult[list.name] ?? ''}
                    name={list.name}
                    onChange={changeTableCellResult}
                  ></Input>
                </TableCell>
              ))}
            <TableCell className="border border-gray-300 px-4 py-2">
              <Button variant="outline" onClick={savenewChecklistChart}>
                +
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
