'use client'

import {
  ChecklistProtocol,
  TimeTable,
  TxChart,
} from '@/types/checklist/checklistchart'
import React, { useState, useEffect, useRef } from 'react'
import { Switch } from '@/components/ui/switch'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { saveTxChart } from '@/lib/services/checklist/get-checklist-data'
import { string } from 'zod'
import { minToLocalTime, timeInterval } from '@/constants/checklist/checklist'
import { add } from 'date-fns'
import { Camera } from 'lucide-react'
import { Image } from 'lucide-react'
type Props = {
  txChart: TxChart | null
  timeMin: number
}

const TxchartProtocol = ({ txChart, timeMin }: Props) => {
  const [checktime, setCheckTime] = useState<string>('0')
  const [protocol, setProtocol] = useState<ChecklistProtocol | null>([])
  const [timetable, setTimetable] = useState<TimeTable>([])

  useEffect(() => {
    txChart &&
      txChart?.checklist_protocol &&
      setProtocol(JSON.parse(JSON.stringify(txChart.checklist_protocol)))
    timeMin && setCheckTime(String(timeMin))
    txChart?.checklist_timetable &&
      setTimetable(JSON.parse(JSON.stringify(txChart.checklist_timetable)))
    timeMin && setCheckTime(String(timeMin))
  }, [txChart, timeMin])
  const inputTxt = useRef<HTMLInputElement>(null)

  const makeTimetableTx = (pretxt: string) => {
    const txt = pretxt
    const newTimetable = [...timetable]
    newTimetable.push({
      time: checktime,
      txt: txt,
      type: 'protocol',
      imgurl: null,
    })
    return newTimetable
  }
  const cancelTimetableTx = (pretxt: string) => {
    const txt = pretxt
    const newTimetable = [...timetable]
    const index = newTimetable.findIndex((item) => item.txt === txt)
    if (index !== -1) {
      newTimetable.splice(index, 1)
      return newTimetable
    }
  }

  // time?: null | number
  // txt?: null | string
  // type?: null | string
  // imgurl?: null | string
  const startProtocol = (e: React.MouseEvent<HTMLButtonElement>) => {
    const predata = { ...txChart } as any

    const index = e.currentTarget.name
    if (txChart?.starttime && protocol && protocol.length > 0 && index) {
      const mainProtocol = protocol[Number(index)]
      if (mainProtocol.type === 'main') {
        mainProtocol.txStart = timeInterval(
          txChart?.starttime,
          new Date().toISOString(),
        )[0]
        predata.checklist_protocol[Number(index)] = mainProtocol
        predata.checklist_timetable = makeTimetableTx(
          mainProtocol.title + ' 시작',
        )
        saveTxChart(predata)
      } else {
        mainProtocol.txEnd = timeInterval(
          txChart?.starttime,
          new Date().toISOString(),
        )[0]
        predata.checklist_protocol[Number(index)] = mainProtocol
        predata.checklist_timetable = makeTimetableTx(
          mainProtocol.title + ' 완료',
        )
        saveTxChart(predata)
      }
    }
  }
  const endProtocol = (e: React.MouseEvent<HTMLButtonElement>) => {
    const predata = { ...txChart } as any

    const index = e.currentTarget.name
    if (txChart?.starttime && protocol && protocol.length > 0 && index) {
      const mainProtocol = protocol[Number(index)]
      mainProtocol.txEnd = timeInterval(
        txChart?.starttime,
        new Date().toISOString(),
      )[0]
      predata.checklist_protocol[Number(index)] = mainProtocol
      predata.checklist_timetable = makeTimetableTx(
        mainProtocol.title + ' 종료',
      )
      saveTxChart(predata)
    }
  }
  const cancelStart = (e: React.MouseEvent<HTMLButtonElement>) => {
    const predata = { ...txChart } as any

    const index = e.currentTarget.name
    if (protocol && protocol.length > 0 && index) {
      const mainProtocol = protocol[Number(index)]
      mainProtocol.txStart = null
      mainProtocol.txEnd = null
      predata.checklist_protocol[Number(index)] = mainProtocol
      predata.checklist_timetable = cancelTimetableTx(
        mainProtocol.title + ' 시작',
      )
      saveTxChart(predata)
    }
  }

  const cancelEnd = (e: React.MouseEvent<HTMLButtonElement>) => {
    const predata = { ...txChart } as any

    const index = e.currentTarget.name
    if (protocol && protocol.length > 0 && index) {
      const mainProtocol = protocol[Number(index)]
      mainProtocol.txEnd = null
      predata.checklist_protocol[Number(index)] = mainProtocol
      predata.checklist_timetable =
        mainProtocol.type === 'main'
          ? cancelTimetableTx(mainProtocol.title + ' 종료')
          : cancelTimetableTx(mainProtocol.title + ' 완료')

      saveTxChart(predata)
    }
  }
  const deleteTimetableTx = (e: React.MouseEvent<HTMLButtonElement>) => {
    const index = e.currentTarget.name
    if (timetable && timetable.length > 0 && index) {
      const newTimetable = [...timetable]
      newTimetable.splice(Number(index), 1)
      const predata = { ...txChart } as any
      predata.checklist_timetable = newTimetable
      saveTxChart(predata)
    }
  }
  const addtimetableTx = () => {
    if (inputTxt.current && inputTxt.current.value) {
      const txt = inputTxt.current.value
      if (txt && txt.length > 0) {
        const newTimetable = makeTimetableTx(txt)
        const predata = { ...txChart } as any
        predata.checklist_timetable = newTimetable
        saveTxChart(predata)
        inputTxt.current.value = ''
      }
    }
  }
  return (
    <div>
      {/* <div className="flex items-center">
        <div className="ml-3">팝업</div>
        <Switch className="ml-3" />

        <div className="ml-3">자동</div>
        <Switch className="ml-3" />
      </div> */}
      <div className="m-3 flex items-center">
        <div>기록 추가</div>
        <Input className="ml-3 w-[250px]" ref={inputTxt}></Input>
        <Button variant="outline" className="ml-1" onClick={addtimetableTx}>
          +
        </Button>
        <Button variant="outline" className="ml-3">
          {' '}
          <Camera />
        </Button>
        <Button variant="outline" className="ml-3">
          <Image />
        </Button>
      </div>
      <div className="m-3 overflow-y-auto whitespace-pre-wrap rounded-md border border-gray-300 p-2 text-sm text-gray-800">
        <div className="flex-col">
          <div className="text-bold text-lg">치료 프로토콜</div>
          <div className="text-sm text-gray-500">치료 과정을 기록합니다.</div>
          {protocol &&
            protocol.length > 0 &&
            protocol.map((list, i) => {
              if (list.type === 'main') {
                return (
                  <div
                    className="mb-2 flex flex-wrap items-center"
                    key={list.title && list.title + i}
                  >
                    <Button className="mb-3 mr-2">
                      {list.title}
                      {txChart &&
                      txChart.starttime &&
                      list.mode &&
                      list.mode === 'afterStart'
                        ? '(예정시간' +
                          minToLocalTime(
                            String(txChart.starttime),
                            String(list.dueStart),
                          )[1] +
                          ')'
                        : i > 0 &&
                          txChart?.starttime &&
                          protocol[i - 1].txStart &&
                          '(예정시간' +
                            minToLocalTime(
                              String(txChart.starttime),
                              String(
                                Number(protocol[i - 1].txStart) +
                                  Number(list.dueStart),
                              ),
                            )[1] +
                            ')'}
                    </Button>
                    {list.txStart && !list.txEnd ? (
                      <div>
                        {' '}
                        <Button
                          className="mb-3 mr-2"
                          variant="outline"
                          name={String(i)}
                          onClick={cancelStart}
                        >
                          시작취소
                        </Button>
                        <Button
                          className="mb-3 mr-2"
                          variant="outline"
                          name={String(i)}
                          onClick={endProtocol}
                        >
                          종료
                        </Button>
                      </div>
                    ) : !list.txStart ? (
                      <Button
                        className="mb-3 mr-2"
                        variant="outline"
                        name={String(i)}
                        onClick={startProtocol}
                      >
                        시작
                      </Button>
                    ) : (
                      <Button
                        className="mb-3 mr-2"
                        variant="outline"
                        name={String(i)}
                        onClick={cancelEnd}
                      >
                        종료취소
                      </Button>
                    )}
                    {list.txStart && (
                      <div className="text-sm text-gray-500">
                        시작 시간:{' '}
                        {
                          minToLocalTime(
                            String(txChart?.starttime),
                            String(list.txStart),
                          )[1]
                        }
                      </div>
                    )}
                    {list.txEnd && (
                      <div className="ml-3 text-sm text-gray-500">
                        종료 시간:{' '}
                        {
                          minToLocalTime(
                            String(txChart?.starttime),
                            String(list.txEnd),
                          )[1]
                        }{' '}
                      </div>
                    )}
                    {list.txStart && list.txEnd && (
                      <div className="ml-3 text-sm text-gray-500">
                        경과 시간: {Number(list.txEnd) - Number(list.txStart)}분
                      </div>
                    )}
                  </div>
                )
              } else {
                return (
                  <div
                    key={list.title && list.title + i}
                    className="ml-6 flex items-center"
                  >
                    {list.txEnd && (
                      <div className="text-sm text-gray-500">
                        {list.title}완료
                      </div>
                    )}
                    {list.txEnd && (
                      <div className="ml-3 text-sm text-gray-500">
                        (완료시간: {new Date(list.txEnd).toLocaleTimeString()})
                      </div>
                    )}
                    {!list.txEnd && (
                      <Button
                        variant="outline"
                        className="mb-1 mr-2"
                        name={String(i)}
                        onClick={startProtocol}
                      >
                        {list.title}
                        {txChart &&
                        txChart.starttime &&
                        list.mode &&
                        list.mode === 'afterStart'
                          ? '(예정시간' +
                            minToLocalTime(
                              String(txChart.starttime),
                              String(list.dueStart),
                            )[1] +
                            ')'
                          : i > 0 &&
                              protocol[i - 1].type === 'main' &&
                              protocol[i - 1].txStart
                            ? '(예정시간' +
                              minToLocalTime(
                                String(txChart?.starttime),
                                String(
                                  Number(protocol[i - 1].txStart) +
                                    Number(list.dueStart),
                                ),
                              )[1] +
                              ')'
                            : i > 0 &&
                              protocol[i - 1].type === 'sub' &&
                              protocol[i - 1].txEnd &&
                              '(예정시간' +
                                minToLocalTime(
                                  String(txChart?.starttime),
                                  String(
                                    Number(protocol[i - 1].txEnd) +
                                      Number(list.dueStart),
                                  ),
                                )[1] +
                                ')'}
                      </Button>
                    )}
                    {list.txEnd && (
                      <Button
                        variant="outline"
                        className="mb-1 ml-2"
                        size="sm"
                        name={String(i)}
                        onClick={cancelEnd}
                      >
                        완료취소
                      </Button>
                    )}
                  </div>
                )
              }
            })}
        </div>
      </div>
      <div className="flex-col">
        <div>과정중 기록사항</div>
        <div className="overflow-x-auto">
          <table className="mb-12 mr-10 w-full min-w-[350px] border border-gray-300 text-center text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="w-[100px] border border-gray-300 px-4 py-2 font-semibold">
                  +min(시간)
                </th>
                <th className="border border-gray-300 px-4 py-2">기록사항</th>
                <th className="w-[50px] border border-gray-300 px-4 py-2">
                  삭제
                </th>
              </tr>
            </thead>
            <tbody>
              {timetable &&
                timetable.map((list, i) => (
                  <tr
                    key={list.txt && list.txt + i}
                    className="even:bg-gray-100"
                  >
                    <td className="w-[100px] border border-gray-300 px-4 py-2">
                      +{String(list.time)}(
                      {txChart?.starttime && list.time && list.time !== '0'
                        ? minToLocalTime(txChart?.starttime, list.time)[1]
                        : '0'}
                      )
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {list.txt}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {list.type === 'protocol' && (
                        <Button
                          variant="outline"
                          name={String(i)}
                          onClick={deleteTimetableTx}
                          className="w-[50px]"
                          title="삭제"
                        >
                          -
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TxchartProtocol
