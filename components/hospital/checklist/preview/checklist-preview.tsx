'use client'
import { Separator } from '@/components/ui/separator'
import { TemplateChecklist } from '@/types/checklist/checklist-type'

import { useEffect, useState } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils/utils'

type Props = {
  templateChecklist: TemplateChecklist | null
}

export default function ChecklistPreview({ templateChecklist }: Props) {
  const [checklistdata, setChecklistData] = useState<TemplateChecklist>()

  useEffect(() => {
    const preTemplateData = JSON.parse(JSON.stringify(templateChecklist))

    setChecklistData(preTemplateData)
  }, [templateChecklist])

  let protocolNo = 0

  return (
    checklistdata && (
      <div className="flex-col">
        <Separator className="mb-3" />

        <div className="mb-3 flex items-center">
          <span className="mr-2 text-lg">1. 탬플릿 제목 : </span>
          <div>{checklistdata.checklist_title}</div>
        </div>
        <div className="flex-col">
          <span className="mr-2 text-lg">2. 처치 정보 </span>
          <div className="mb-3 flex-col border border-gray-300 p-3">
            <div className="flex-col items-center px-3">
              <span className="text-l m-2">전처치 </span>
              <div className="m-2 whitespace-pre border">
                {checklistdata.preinfo?.pre ?? ''}
              </div>
            </div>
            {checklistdata.checklist_type === '마취' && (
              <div className="flex-col items-center px-3">
                <span className="text-l m-2">유도마취 </span>
                <div className="m-2 whitespace-pre border">
                  {checklistdata.preinfo?.induce ?? ''}
                </div>
              </div>
            )}
            <div className="flex-col items-center px-3">
              <span className="text-l m-2">
                {checklistdata.checklist_type === '마취'
                  ? '유지마취'
                  : '주요처치'}{' '}
              </span>
              <div className="m-2 whitespace-pre border">
                {checklistdata.preinfo?.main ?? ''}
              </div>
            </div>
            <div className="flex-col items-center px-3">
              <span className="text-l m-2">후처치 </span>
              <div className="m-2 whitespace-pre border">
                {checklistdata.preinfo?.post ?? ''}
              </div>
            </div>
          </div>
          <span className="mr-2 text-lg">3. 체크리스트 설정 </span>
          {checklistdata.checklist_set?.preSet &&
            checklistdata.checklist_set?.preSet.length > 0 && (
              <div className="mb-3 flex flex-col gap-2 rounded border bg-white p-4">
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
                    {checklistdata.checklist_set.preSet.map((set, i) => (
                      <TableRow key={set.settime}>
                        <TableCell>{set.settime}</TableCell>
                        <TableCell>
                          <div> {set.setname?.map((name) => name + ' ')}</div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          <span className="mr-2 text-lg">4. 프로토콜 설정 </span>
          {checklistdata.checklist_protocol &&
            checklistdata.checklist_protocol.length > 0 &&
            checklistdata.checklist_protocol.map((protocol, i) => {
              protocol.type === 'protocol' && (protocolNo = protocolNo + 1)
              return (
                <div
                  key={i}
                  className={cn(
                    'm-2 mb-3 flex w-[95%] items-center justify-between rounded border bg-white p-1 shadow',
                    protocol.type === 'protocol' ? 'bg-green-50' : 'bg-red-50',
                  )}
                >
                  <div className="mr-2 w-[100px] text-center font-bold">
                    {protocol.type === 'protocol'
                      ? '주요과정' + protocolNo
                      : '주의/확인사항'}{' '}
                  </div>
                  <div>{protocol.title || '(제목 없음)'} </div>
                  <div className="whitespace-pre text-left">
                    {protocol.addinfo || ''}
                  </div>
                  <div className="w-[150px]">
                    {' '}
                    {protocol.mode === 'afterMain'
                      ? '<주요과정 시작 '
                      : protocol.mode === 'afterStart'
                        ? ' <치료 시작 '
                        : protocol.mode === 'afterSub'
                          ? '<이전과정 실행 '
                          : ''}
                    {protocol.dueStart ? protocol.dueStart + '분후>' : '-'}
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    )
  )
}
