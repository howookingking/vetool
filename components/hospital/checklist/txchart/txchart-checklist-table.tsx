import {
  checkListSetArray,
  minToLocalTime,
} from '@/constants/checklist/checklist'
import {
  ChecklistResults,
  CheckNameArray,
  TxChart,
} from '@/types/checklist/checklistchart'
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
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import TxchartChecklistTabecell from './txchart-checklist-tabecell'
import { saveTxChart } from '@/lib/services/checklist/get-checklist-data'
import { toast } from '@/components/ui/use-toast'

type Props = {
  txChart: TxChart | null
  timeMin: number
}
const TxchartChecklistTable = ({ txChart, timeMin }: Props) => {
  const [result, setResult] = useState<Record<string, ChecklistResults>>({})
  const [checklistname, setCheckListNames] = useState<CheckNameArray>([]) //체크리스트 종류
  const [tabletimes, setTableTimes] = useState<number[]>([])
  const [newresult, setNewResult] = useState<{
    time: string
    newresult: ChecklistResults
  }>({ time: '', newresult: {} })

  useEffect(() => {
    txChart &&
      txChart?.checklist_set?.result &&
      setResult({ ...txChart.checklist_set.result })
    const prenames: string[] = []
    const pretimes: number[] = []
    txChart?.checklist_set?.result &&
      Object.keys(txChart.checklist_set.result).map((key) => {
        Number(key) && Number(key) >= 0 && pretimes.push(Number(key))
        txChart?.checklist_set?.result &&
          prenames.push(...Object.keys(txChart.checklist_set.result[key]))
      })
    prenames.push('비고')
    txChart?.checklist_set?.preSet &&
      txChart?.checklist_set?.preSet.map((set) => {
        if (
          set.settime &&
          set.settime !== '' &&
          Number(set.settime) >= 0 &&
          pretimes.indexOf(Number(set.settime)) === -1
        ) {
          pretimes.push(Number(set.settime))
          set.setname && set.setname.length > 0 && prenames.push(...set.setname)
        }
      })
    const prenames2: CheckNameArray = []
    checkListSetArray.map((set) => {
      if (set.name && prenames.indexOf(set.name) !== -1) {
        prenames2.push(set)
      }
    })
    pretimes.sort((a, b) => a - b)

    setTableTimes(pretimes)
    setCheckListNames([...prenames2])
  }, [txChart, timeMin])

  const savenewTxChart = () => {
    if (txChart && newresult.time && newresult.newresult) {
      const predata = { ...txChart }
      predata.checklist_set ??= { result: {}, preSet: [] }
      predata.checklist_set.result ??= {}
      if (predata.checklist_set.result[newresult.time]) {
        const confirmed = window.confirm(
          '이미 해당 시간에 결과가 있습니다. 덮어쓰시겠습니까?',
        )
        if (confirmed) {
          predata.checklist_set.result[newresult.time] = newresult.newresult
          saveTxChart(predata)
            .then(() => {
              setNewResult({ time: '', newresult: {} })
            })
            .catch((error) => {
              console.error('Error saving txChart:', error)
            })
        }
      } else {
        predata.checklist_set.result[newresult.time] = newresult.newresult
        saveTxChart(predata)
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
      if (txChart && time) {
        const predata = { ...txChart }
        if (
          predata.checklist_set?.result &&
          predata.checklist_set.result[time]
        ) {
          delete predata.checklist_set.result[time]
          saveTxChart(predata)
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
  return (
    <div className="overflow-x-auto">
      <table className="mb-12 w-full min-w-[600px] border border-gray-300 text-center text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 font-semibold">
              +min(시간)
            </th>
            {checklistname &&
              checklistname.map((list, i) => (
                <th
                  className="border border-gray-300 px-4 py-2"
                  key={'name' + i}
                >
                  {window.innerWidth > 800
                    ? list.name + '(' + list.displayName + ')'
                    : window.innerWidth > 600
                      ? list.name
                      : list.displayName}
                </th>
              ))}
            <th className="border border-gray-300 px-4 py-2">+/-</th>
          </tr>
        </thead>
        <tbody>
          {txChart &&
            txChart.starttime &&
            tabletimes &&
            tabletimes.map((time, i) => (
              <tr key={time + i} className="even:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  +{String(time)}(
                  {
                    minToLocalTime(
                      txChart?.starttime ? txChart.starttime : '0',
                      String(time),
                    )[1]
                  }
                  )
                </td>
                {checklistname &&
                  checklistname.map((list, j) => (
                    <td
                      className="border border-gray-300 px-4 py-2"
                      key={'list' + j}
                    >
                      <TxchartChecklistTabecell
                        time={String(time)}
                        name={list.name}
                        txChart={txChart}
                      ></TxchartChecklistTabecell>
                    </td>
                  ))}
                <td className="border border-gray-300 px-4 py-2">
                  <Button
                    variant="outline"
                    onClick={delTableRow}
                    name={String(time)}
                  >
                    -
                  </Button>
                </td>
              </tr>
            ))}
          <tr className="even:bg-gray-100">
            <td className="flex flex-wrap items-center justify-center border border-gray-300 px-1 py-2 font-semibold">
              <div className="flex items-center">
                <div>+</div>
                <Input
                  className="w-[50px]"
                  value={newresult.time}
                  placeholder="시간"
                  // type="number"
                  onChange={(e) =>
                    setNewResult({ ...newresult, time: e.target.value })
                  }
                ></Input>
              </div>
              <div>
                (
                {
                  minToLocalTime(
                    txChart?.starttime ?? '0',
                    String(newresult.time),
                  )[1]
                }
                )
              </div>
            </td>
            {checklistname &&
              checklistname.map((list, j) => (
                <td
                  className="border border-gray-300 px-4 py-2"
                  key={'list' + j}
                >
                  <Input
                    onChange={(e) =>
                      setNewResult({
                        ...newresult,
                        newresult: {
                          ...newresult.newresult,
                          [list.name]: e.target.value,
                        },
                      })
                    }
                  ></Input>
                </td>
              ))}
            <td className="border border-gray-300 px-4 py-2">
              <Button variant="outline" onClick={savenewTxChart}>
                +
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default TxchartChecklistTable
