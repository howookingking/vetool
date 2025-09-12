import { useEffect, useState } from 'react'
import type {
  ChecklistData,
  ChecklistResults,
  CheckNameArray,
} from '@/types/checklist/checklist-type'
import {
  checkListSetArray,
  minToLocalTime,
} from '@/constants/checklist/checklist'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import LocalTime from '@/components/hospital/checklist/common/localtime'
type Props = {
  checklistData: ChecklistData
}
export default function ChecklistReportChecklist({ checklistData }: Props) {
  const [checklistname, setCheckListNames] = useState<CheckNameArray>([]) //체크리스트 종류
  const [tabletimes, setTableTimes] = useState<number[]>([])
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
    checklistData?.checklist_set?.preSet &&
      checklistData?.checklist_set?.preSet.length > 0 &&
      checklistData?.checklist_set?.preSet.map((set) => {
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

    setTableTimes(pretimes)
    setCheckListNames([...prenames2])
  }, [checklistData])
  return (
    <div>
      <div className="mb-3 ml-5 text-base">5.체크리스트</div>
      <Table className="m-5 w-[95%] min-w-[600px] border border-gray-300 text-center text-sm">
        <TableHeader>
          <TableRow className="bg-gray-200">
            <TableHead className="max-w-[40px] border border-gray-300 px-1 py-1 text-center font-semibold">
              +min(시간)
            </TableHead>
            {checklistname &&
              checklistname.map((list, i) => (
                <TableHead
                  className="max-w-[40px] border border-gray-300 px-1 py-1 text-center font-semibold"
                  key={'name' + i}
                >
                  {window.innerWidth > 800
                    ? list.name + '(' + list.displayName + ')'
                    : window.innerWidth > 600
                      ? list.name
                      : list.displayName}
                </TableHead>
              ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {checklistData &&
            checklistData.starttime &&
            tabletimes &&
            tabletimes.map((time, i) => (
              <TableRow key={time + i} className="even:bg-gray-100">
                <TableCell className="max-w-[40px] border border-gray-300 px-1 py-1">
                  +{String(time)}(
                  {
                    minToLocalTime(
                      checklistData?.starttime ? checklistData.starttime : '0',
                      String(time),
                    )[1]
                  }
                  )
                </TableCell>
                {checklistname &&
                  checklistname.length > 0 &&
                  checklistname.map((list, j) => {
                    return (
                      <TableCell
                        className="border border-gray-300 px-4 py-2"
                        key={'list' + j}
                      >
                        {checklistData.checklist_set?.result &&
                        checklistData.checklist_set.result[String(time)] &&
                        checklistData.checklist_set.result[String(time)][
                          list.name
                        ]
                          ? checklistData.checklist_set.result[String(time)][
                              list.name
                            ]
                          : ''}

                        {/* <ChecklistBodyTableCell
                                time={String(time)}
                                name={list.name}
                                checklistData={checklistData}
                              ></ChecklistBodyTableCell> */}
                      </TableCell>
                    )
                  })}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}
