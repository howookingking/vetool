import {
  CheckItem,
  ChecklistData,
  ChecklistResults,
  CheckNameArray,
} from '@/types/checklist/checklist-type'
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
import { minToLocalTime } from '@/constants/checklist/checklist'
import { Button } from '@/components/ui/button'
import { updateEachChecklist } from '@/lib/services/checklist/get-checklist-data-client'
import { toast } from '@/components/ui/use-toast'
type Props = {
  checklistData: ChecklistData
  checklistname: CheckNameArray
  pretime: string
  setIsSaving: React.Dispatch<React.SetStateAction<boolean>> | null
  setIseditTableRowOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export default function ChecklistEditTableRow({
  checklistData,
  checklistname,
  pretime,
  setIsSaving,
  setIseditTableRowOpen,
}: Props) {
  const [newresult, setNewResult] = useState<{
    time: string
    newresult: ChecklistResults
  }>({ time: '', newresult: {} })
  useEffect(() => {
    const preResult = { time: '', newresult: {} as ChecklistResults }
    pretime && (preResult.time = pretime)
    checklistname.map((list: CheckItem) => {
      checklistData.checklist_set &&
      checklistData.checklist_set?.result &&
      checklistData.checklist_set?.result[pretime] &&
      checklistData.checklist_set.result[pretime][list.name]
        ? (preResult.newresult[list.name] =
            checklistData.checklist_set.result[pretime][list.name])
        : (preResult.newresult[list.name] = '')
    })
    setNewResult(preResult)
  }, [pretime, checklistData])

  const changeTableCellResult = (e: React.ChangeEvent<HTMLInputElement>) => {
    const predata = { ...newresult }
    predata.newresult[e.target.name] = e.target.value
    setNewResult(predata)
  }
  const savenewChecklistChart = () => {
    setIsSaving && setIsSaving(true)
    if (checklistData && newresult.time && newresult.newresult) {
      const predata = { ...checklistData }
      predata.checklist_set ??= { result: {}, preSet: [] }
      predata.checklist_set.result ??= {}

      predata.checklist_set.result[newresult.time] = newresult.newresult
      updateEachChecklist(predata)
        .then(() => {
          setNewResult({ time: '', newresult: {} })
        })
        .catch((error) => {
          console.error('Error saving txChart:', error)
        })
    } else {
      toast({
        title: '오류',
        description: '시간과 결과를 입력해주세요.',
      })
    }
    setIseditTableRowOpen(false)
  }
  return (
    <Table className="mt-3">
      <TableHeader>
        <TableRow className="bg-gray-100">
          <TableHead className="border border-gray-300 px-4 py-2 font-semibold">
            +min(시간)
          </TableHead>
          {checklistname &&
            checklistname.map((list, i) => (
              <TableHead
                className="border border-gray-300 px-4 py-2"
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
        <TableRow className="even:bg-gray-100">
          <TableCell className="flex flex-wrap items-center justify-center border border-gray-300 px-1 py-2 font-semibold">
            <div className="flex items-center">
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
                  checklistData?.starttime ?? '0',
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
                  className="min-w-[80px]"
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
  )
}
