'use client'
import type {
  ChecklistData,
  ChecklistResults,
  CheckNameArray,
} from '@/types/checklist/checklist-type'
import {
  checkListSetArray,
  defaultChecklistSet,
  minToLocalTime,
} from '@/constants/checklist/checklist'
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
// import TxchartChecklistTabecell from './txchart-checklist-tabecell'
import { updateEachChecklist } from '@/lib/services/checklist/get-checklist-data-client'
import { toast } from '@/components/ui/use-toast'
import ChecklistBodyTableCell from '@/components/hospital/checklist/checklist-body/checklist-body-checklist/checklist-body-tablecell'
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import ChecklistTimetableAdd from './checklist-timetable-add'
import { LoaderCircle, Pencil } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import ChecklistTimetableRecord from '@/components/hospital/checklist/checklist-body/checklist-body-checklist/checklist-timetable-record'
export default function ChecklistBodyTable({
  checklistData,
  timeMin,
}: {
  checklistData: ChecklistData
  timeMin: number
}) {
  const [result, setResult] = useState<Record<string, ChecklistResults>>({})
  const [checktime, setCheckTime] = useState<string>('0')
  const [interval, setInterval] = useState<string>('1') //측정간격
  const [checklistname, setCheckListNames] = useState<CheckNameArray>([]) //체크리스트 종류
  const [tabletimes, setTableTimes] = useState<number[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [newresult, setNewResult] = useState<{
    time: string
    newresult: ChecklistResults
  }>({ time: '', newresult: {} })

  useEffect(() => {
    checklistData &&
      checklistData?.checklist_set?.result &&
      setResult({ ...checklistData.checklist_set.result })
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
      const _checktime = Number(timeMin)
      const _interval = Number(interval)
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
  }, [checklistData, timeMin])

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
      <div className="flex">
        <div className="width=[30%] flex-col border-r p-2">
          {
            <div className="mb-2">
              <Button
                size="sm"
                className="w-[100px]"
                variant={checktime === 'new' ? 'default' : 'destructive'}
                onClick={() => setCheckTime('new')}
              >
                +{newresult.time}
              </Button>
            </div>
          }
          {tabletimes &&
            tabletimes.map((time, i) => (
              <div key={'time' + i} className="mb-2">
                <Button
                  size="sm"
                  className="w-[100px]"
                  variant={Number(checktime) === time ? 'default' : 'outline'}
                  onClick={() => setCheckTime(String(time))}
                >{`+${time}분`}</Button>
              </div>
            ))}
        </div>
        <div className="p-2">
          <Table className="border border-gray-300 text-center text-sm">
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="border border-gray-300 px-4 py-2 text-center font-semibold">
                  항목
                </TableHead>
                <TableHead className="border border-gray-300 px-4 py-2 text-center font-semibold">
                  결과
                </TableHead>
              </TableRow>
              {checklistname &&
                checklistname.map((list, i) => (
                  <TableRow key={'list' + i} className="even:bg-gray-100">
                    <TableCell className="border border-gray-300 px-4 py-2">
                      {list.name}
                    </TableCell>
                    <TableCell className="border border-gray-300 px-4 py-2">
                      {checktime === 'new' ? (
                        <Input
                          key={'input' + i}
                          name={list.name}
                          value={newresult.newresult[list.name] ?? ''}
                          onChange={changeTableCellResult}
                        />
                      ) : isSaving ? (
                        <LoaderCircle className="ml-2 animate-spin" />
                      ) : (
                        <ChecklistBodyTableCell
                          time={String(checktime)}
                          name={list.name}
                          checklistData={checklistData}
                          setIsSaving={setIsSaving}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              {checktime === 'new' && (
                <TableRow className="even:bg-gray-100">
                  <TableCell className="border border-gray-300 px-4 py-2">
                    {' '}
                  </TableCell>
                  <TableCell className="border border-gray-300 px-4 py-2">
                    <Button
                      size="sm"
                      className="w-[100px]"
                      onClick={savenewChecklistChart}
                    >
                      추가
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableHeader>
          </Table>
        </div>
      </div>
      <Separator className="m-2" />
      <div className="m-2 max-w-[600px]">
        <ChecklistTimetableRecord checklistData={checklistData} />
      </div>
    </div>
  )
}
