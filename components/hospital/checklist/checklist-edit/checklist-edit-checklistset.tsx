'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Checklistset } from '@/types/checklist/checklist-type'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { checkListSetArray } from '@/constants/checklist/checklist'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type Props = {
  checklistSet: Checklistset | null
  setSetInfo: (checklistset: Checklistset) => void
}
export default function ChecklistEditChecklistSet({
  checklistSet,
  setSetInfo,
}: Props) {
  const [checklistset, setChecklistSet] = useState<Checklistset>()
  const [checklistTitles, setCheckListTitles] = useState<string[] | null>()
  const checkingTime = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (checklistSet) {
      setChecklistSet(checklistSet)
      !checklistTitles &&
        setCheckListTitles(
          (checklistSet.preSet && checklistSet.preSet[0]?.setname) || [
            '체온(°C)',
            '심박수',
            '호흡수',
            '혈압(mmHg)',
            '비고',
          ],
        )
    } else {
      setChecklistSet({
        interval: '1',
        preSet: [
          {
            setname: ['체온(°C)', '심박수', '호흡수', '혈압(mmHg)', '비고'],
            settime: '0',
          },
        ],
      })
      !checklistTitles &&
        setCheckListTitles([
          '체온(°C)',
          '심박수',
          '호흡수',
          '혈압(mmHg)',
          '비고',
        ])
    }
  }, [checklistSet])

  const addChecklistRow = () => {
    if (checkingTime.current?.value && checklistTitles) {
      const pretime = checkingTime.current ? checkingTime.current.value : '0'
      const prenames = [...checklistTitles]
      const predata = { ...checklistset }
      const presetItem = { settime: String(pretime), setname: [...prenames] }
      const isTime =
        predata &&
        predata.preSet &&
        predata.preSet.find((x) => x.settime === String(pretime))
      if (!isTime) {
        predata.preSet?.push(presetItem)
        setSetInfo(predata)
        checkingTime.current.value = ''
      }
    }
  }
  const delChecklistRow = (e: React.MouseEvent<HTMLButtonElement>) => {
    const predata = { ...checklistset }
    const index = Number(e.currentTarget.name)
    if (predata.preSet && predata.preSet.length > 0) {
      predata.preSet.splice(index, 1)
      //   setChecklistSet(predata)
      setSetInfo(predata)
    }
  }
  const changeInterval = (e: React.ChangeEvent<HTMLInputElement>) => {
    const predata = { ...checklistset }
    if (predata) {
      predata.interval = String(e.target.value)
      setChecklistSet(predata)
      setSetInfo(predata)
    }
  }
  return (
    <div className="flex flex-col gap-4 border border-gray-300 p-2">
      {/* <h2 className="text-lg font-semibold">체크리스트 설정</h2> */}
      <p className="text-sm text-gray-500">측정 시간 항목 등을 설정합니다.</p>
      {checklistset && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <label className="ml-3 text-sm font-medium">측정 간격 (분):</label>
            <input
              type="number"
              value={Number(checklistset.interval)}
              step={1}
              onChange={changeInterval}
              className="w-20 rounded border px-2 py-1"
            />
          </div>
          <div className="flex flex-wrap items-center justify-start gap-2 px-3">
            <div className="mr-2 text-sm">측정항목</div>
            <ToggleGroup
              defaultValue={checklistTitles || []}
              onValueChange={(value) => {
                if (value) {
                  setCheckListTitles(value)
                }
              }}
              type="multiple"
              variant="outline"
              size="sm"
            >
              {checkListSetArray.map((check, i) => (
                <ToggleGroupItem
                  key={check.name}
                  value={check.name}
                  aria-label="Toggle bold"
                  className="data-[state=on]:bg-gray-300"
                >
                  <div className="minw-4 h-4">{check.displayName}</div>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            <div className="ml-3 mr-2 text-sm">측정시간</div>
            <Input
              placeholder="min"
              type="number"
              step={1}
              ref={checkingTime}
              className="w-[80px]"
            />

            <Button
              type="button"
              onClick={addChecklistRow}
              // variant="outline"
              size="sm"
            >
              +
            </Button>
          </div>
        </div>
      )}
      {checklistset &&
        checklistset.preSet &&
        checklistset.preSet.length > 0 && (
          <div className="flex flex-col gap-2 rounded border bg-white p-4">
            <h3 className="text-sm font-semibold">설정된 체크리스트</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">
                    시작후 측정시간(분)
                  </TableHead>
                  <TableHead>측정항목</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {checklistset.preSet.map((set, i) => (
                  <TableRow key={set.settime}>
                    <TableCell>{set.settime}</TableCell>
                    <TableCell>
                      <div>
                        {' '}
                        {set.setname?.map((name) => name + ' ')}
                        <Button
                          type="button"
                          name={String(i)}
                          onClick={delChecklistRow}
                          variant="outline"
                          size="sm"
                        >
                          X
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
    </div>
  )
}
