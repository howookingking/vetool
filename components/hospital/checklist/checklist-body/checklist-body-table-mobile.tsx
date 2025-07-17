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
  PreSetItem,
} from '@/types/checklist/checklist-type'
import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

import {
  checkListSetArray,
  minToLocalTime,
  timeInterval,
} from '@/constants/checklist/checklist'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { redirect } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'
import { Camera } from 'lucide-react'
import { Image } from 'lucide-react'
import { updateEachChecklist } from '@/lib/services/checklist/get-checklist-data-client'
import { ChecklistData } from '@/types/checklist/checklist-type'
import ChecklistTimetableAdd from './checklist-timetable-add'

type Props = {
  checklistData: ChecklistData
  timeMin: number
}
export default function ChecklistBodyTableMobile({
  checklistData,
  timeMin,
}: Props) {
  const [checktime, setCheckTime] = useState<string>('0')
  const [interval, setInterval] = useState<string>('1')
  const [checklistTitles, setCheckListTitles] = useState<string[]>([]) //체크리스트 종류
  const [results, setResults] = useState<ChecklistResults>({})
  const [preset, setPreSet] = useState<PreSetItem[]>([])

  useEffect(() => {
    if (
      timeMin &&
      interval &&
      Number(interval) >= 1
      //   &&
      //   (!checklistData?.checklist_set?.preSet ||
      //     checklistData?.checklist_set?.preSet.length === 0)
    ) {
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
    checklistData &&
      checklistData.checklist_set?.interval &&
      setInterval(String(checklistData.checklist_set.interval))
    const pretitle: string[] = []
    checkListSetArray.map((list) => {
      pretitle.push(list && list.name)
    })
    checklistData &&
      checklistData.checklist_set?.preSet &&
      checklistData.checklist_set?.preSet.length > 0 &&
      setPreSet(checklistData.checklist_set.preSet)
  }, [checklistData, timeMin])
  const inputTxt = useRef<HTMLInputElement>(null)
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
    e.target.value && setCheckTime(String(Number(e.target.value)))
  }
  const changeresult = (e: React.ChangeEvent<HTMLInputElement>) => {
    const predata = { ...results }
    predata[e.target.name] = e.target.value

    setResults(predata)
  }
  const savetxdata = () => {
    const predata: ChecklistData = JSON.parse(
      JSON.stringify({ ...checklistData }),
    ) as ChecklistData

    if (predata?.checklist_set?.result) {
      predata.checklist_set.result[checktime] = { ...results }

      updateEachChecklist(predata)
      setResults({})
    } else {
      if (predata?.checklist_set) {
        predata.checklist_set.result = {}
        predata.checklist_set.result[checktime] = { ...results }

        updateEachChecklist(predata)
        setResults({})
      } else {
        predata.checklist_set = {}
        predata.checklist_set.result = {}
        predata.checklist_set.result[checktime] = { ...results }

        updateEachChecklist(predata)
        setResults({})
      }
    }
  }
  const addtimetableTx = () => {
    if (inputTxt.current && inputTxt.current.value) {
      const txt = inputTxt.current.value
      const predata = { ...checklistData } as any
      if (!predata.checklist_timetable) {
        predata.checklist_timetable = []
        predata.checklist_timetable.push({
          time: new Date().getTime(),
          txt: txt,
          type: 'txt',
          imgurl: null,
        })
        updateEachChecklist(predata)
          .then(() => {
            if (inputTxt.current) {
              inputTxt.current.value = ''
            }
          })
          .catch((error) => {
            console.error('Error saving checklistChart:', error)
            toast({
              title: '오류',
              description: '저장에 실패했습니다.',
            })
          })
      } else {
        predata.checklist_timetable = [...predata.checklist_timetable]
        predata.checklist_timetable.push({
          time: new Date().getTime(),
          txt: txt,
          type: 'txt',
          imgurl: null,
        })
        updateEachChecklist(predata)
          .then(() => {
            if (inputTxt.current) {
              inputTxt.current.value = ''
            }
          })
          .catch((error) => {
            console.error('Error saving checklistChart:', error)
            toast({
              title: '오류',
              description: '저장에 실패했습니다.',
            })
          })
      }
    }
  }
  return (
    <div>
      <ChecklistTimetableAdd checklistData={checklistData} />
      <div className="flex items-center">
        {checklistData?.checklist_set?.preSet &&
        checklistData.checklist_set.preSet.length > 0 ? (
          <div>
            <Select
              onValueChange={(value: string) => {
                const predata: any =
                  preset && preset.find((x) => x.settime === String(value))

                setCheckTime(predata?.settime ?? '0')
                setCheckListTitles(
                  predata?.setname ? [...predata.setname, '비고'] : [],
                )
              }}
            >
              <SelectTrigger className="w-auto">
                <SelectValue placeholder="측정시간선택" />
              </SelectTrigger>
              <SelectContent className="w-auto">
                {preset &&
                  preset.map((set) => {
                    let names = ''
                    set.setname &&
                      set.setname.map((name) => {
                        names = names + name + ' '
                      })
                    return (
                      <SelectItem
                        key={set.settime}
                        value={set?.settime ? set.settime : ''}
                      >
                        {set.settime + '분후' + '(' + names + ')'}
                      </SelectItem>
                    )
                  })}
              </SelectContent>
            </Select>
          </div>
        ) : (
          <div className="flex items-center">
            {' '}
            <div>측정간격 :</div>
            <Input
              type="number"
              className="m-3 w-[60px]"
              defaultValue={interval && Number(interval)}
              onChange={changeinterval}
            ></Input>
            <div>분</div>
          </div>
        )}

        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button type="button" variant="outline" className="ml-2">
                항목선택
              </Button>
            </PopoverTrigger>
            <PopoverContent className="min-w-[300px]">
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
                className="flex flex-wrap"
              >
                {checkListSetArray.map((check, i) => (
                  <ToggleGroupItem
                    key={check.name}
                    value={check.name}
                    aria-label="Toggle bold"
                  >
                    {check.displayName}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div>
        <Table className="m-3 mb-7 max-w-[400px]">
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
                {checklistData?.starttime && (
                  <div className="flex items-center">
                    시작후
                    <Input
                      className="w-[60px]"
                      value={checktime ? checktime : ''}
                      onChange={changeInputTime}
                    ></Input>
                    분(
                    {checktime &&
                      minToLocalTime(checklistData.starttime, checktime)[1]}
                    )
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
                        className="w-auto"
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
                {checklistData && results && (
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
