'use client'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import {
  ChecklistResults,
  CheckNameArray,
  TxChart,
} from '@/types/checklist/checklistchart'
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
type Props = {
  txChart: TxChart | null
  timeMin: number
}
import {
  checkListSetArray,
  timeInterval,
} from '@/constants/checklist/checklist'
import { saveTxChart } from '@/lib/services/checklist/get-checklist-data'
import { redirect } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'
const TxchartChecklistBasic = ({ txChart, timeMin }: Props) => {
  const [checktime, setCheckTime] = useState<string>('0')
  const [interval, setInterval] = useState<string>('1')
  const [checklistTitles, setCheckListTitles] = useState<string[]>([]) //체크리스트 종류
  const [results, setResults] = useState<ChecklistResults>({})

  useEffect(() => {
    if (timeMin && interval && Number(interval) >= 1) {
      const _checktime = Number(timeMin)
      const _interval = Number(interval)
      const cal1 = Math.floor(_checktime / _interval)
      const cal2 = _checktime & _interval
      if (_checktime >= _interval) {
        setCheckTime(String(_interval * cal1))
      } else if (_checktime < _interval) {
        setCheckTime('0')
      }
    } else {
      timeMin && setCheckTime(String(timeMin))
    }
    txChart &&
      txChart.checklist_set?.interval &&
      setInterval(String(txChart.checklist_set.interval))
    const pretitle: string[] = []
    checkListSetArray.map((list) => {
      pretitle.push(list && list.name)
    })

    pretitle && pretitle.length > 0 && setCheckListTitles(pretitle)
  }, [txChart, timeMin])

  const changeinterval = (e: React.ChangeEvent<HTMLInputElement>) => {
    const _checktime = Number(timeMin)
    const _interval = Number(e.target.value)
    const cal1 = Math.floor(_checktime / _interval)
    const cal2 = _checktime & _interval
    if (_checktime >= _interval) {
      setCheckTime(String(_interval * cal1))
      setInterval(String(e.target.value))
    } else if (_checktime < _interval) {
      setCheckTime('0')
      setInterval(String(e.target.value))
    }
  }
  const changeInputTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value &&
      Number(e.target.value) > 0 &&
      setCheckTime(String(e.target.value))
  }
  const changeresult = (e: React.ChangeEvent<HTMLInputElement>) => {
    const predata = { ...results }
    predata[e.target.name] = e.target.value
    console.log(predata)
    setResults(predata)
  }
  const savetxdata = () => {
    const predata: TxChart = JSON.parse(JSON.stringify({ ...txChart }))

    if (predata?.checklist_set?.result) {
      predata.checklist_set.result[checktime] = { ...results }
      console.log(predata)
      saveTxChart(predata)
      setResults({})
    } else {
      if (predata?.checklist_set) {
        predata.checklist_set.result = {}
        predata.checklist_set.result[checktime] = { ...results }

        console.log(predata)
        saveTxChart(predata)
        setResults({})
      } else {
        predata.checklist_set = {}
        predata.checklist_set.result = {}
        predata.checklist_set.result[checktime] = { ...results }
        console.log(predata)
        saveTxChart(predata)
        setResults({})
      }
    }
  }
  return (
    <div>
      <div className="flex items-center">
        <div>측정간격 :</div>
        <Input
          type="number"
          className="m-3 w-[60px]"
          defaultValue={interval && Number(interval)}
          onChange={changeinterval}
        ></Input>
        <div>분</div>
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button type="button" variant="outline" className="ml-2">
                항목선택
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="m-3">
                <ToggleGroup
                  onValueChange={(value) => {
                    if (value) {
                      setCheckListTitles(value)
                    }
                  }}
                  type="multiple"
                  variant="outline"
                  defaultValue={checklistTitles ? [...checklistTitles] : []}
                  size="sm"
                >
                  {checkListSetArray.map((check, i) => (
                    <ToggleGroupItem
                      key={check.name}
                      value={check.name}
                      aria-label="Toggle bold"
                    >
                      <div className="minw-5 h-4">{check.displayName}</div>
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div>
        <Table className="m-3 mb-7">
          <TableHeader>
            <TableRow className="text-bold bg-gray-100 text-lg">
              <TableHead>항목</TableHead>
              <TableHead>입력값</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="bg-gray-100">입력시간</TableCell>
              <TableCell className="bg-gray-100">
                {txChart?.starttime && (
                  <div className="flex items-center">
                    시작후
                    <Input
                      className="w-[60px]"
                      value={checktime ? checktime : ''}
                      onChange={changeInputTime}
                    ></Input>
                    분
                  </div>
                )}
              </TableCell>
            </TableRow>
            {checkListSetArray.map((list, i) => {
              if (checklistTitles?.indexOf(list.name) !== -1) {
                return (
                  <TableRow key={list.name}>
                    <TableCell>{list.name}</TableCell>
                    <TableCell>
                      <Input
                        name={list.name}
                        className="w-auto border-none"
                        value={
                          results && results[list.name]
                            ? results[list.name]
                            : ''
                        }
                        onChange={changeresult}
                      ></Input>
                    </TableCell>
                  </TableRow>
                )
              }
            })}
            <TableRow>
              <TableCell className="bg-gray-100">입력</TableCell>
              <TableCell className="bg-gray-100">
                {txChart && results && (
                  <Button variant="outline" onClick={savetxdata}>
                    입력
                  </Button>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default TxchartChecklistBasic
