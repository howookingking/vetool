import { checkListSetArray } from '@/constants/checklist/checklist'
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

type Props = {
  txChart: TxChart | null
}
const TxchartChecklistTable = ({ txChart }: Props) => {
  const [result, setResult] = useState<Record<string, ChecklistResults>>({})
  const [checklistname, setCheckListNames] = useState<CheckNameArray>([]) //체크리스트 종류
  const [tabletimes, setTableTimes] = useState<number[]>([])

  useEffect(() => {
    txChart &&
      txChart?.checklist_set?.result &&
      setResult({ ...txChart.checklist_set.result })
    const prenames: string | [] = []
    const pretimes: number | [] = []
    txChart?.checklist_set?.result &&
      Object.keys(txChart.checklist_set.result).map((key) => {
        Number(key) && Number(key) > 0 && pretimes.push(Number(key))
        txChart?.checklist_set?.result &&
          prenames.push(...Object.keys(txChart.checklist_set.result[key]))
      })
    const prenames2: CheckNameArray = []
    checkListSetArray.map((set) => {
      if (prenames.indexOf(set.name) !== -1) {
        prenames2.push(set)
      }
    })
    pretimes.sort((a, b) => a - b)
    console.log(pretimes)
    console.log(prenames2)
    setTableTimes(pretimes)
    setCheckListNames([...prenames2])
  }, [txChart])
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>시간</TableHead>
            {checklistname &&
              checklistname.map((list, i) => (
                <TableHead key={'name' + i}>{list.displayName}</TableHead>
              ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tabletimes &&
            tabletimes.map((time, i) => (
              <TableRow>
                <TableCell>
                  <Input className="w-[60px]" value={String(time)}></Input>
                </TableCell>
                {checklistname &&
                  checklistname.map((list, j) => (
                    <TableCell key={'list' + j}>
                      <Input
                        value={result && result[String(time)][list.name]}
                      ></Input>
                    </TableCell>
                  ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default TxchartChecklistTable
