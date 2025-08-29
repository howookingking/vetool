import { ChecklistData } from '@/types/checklist/checklist-type'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { useEffect, useState } from 'react'
import { updateEachChecklist } from '@/lib/services/checklist/get-checklist-data-client'
type Props = {
  checklistData: ChecklistData
}
export default function ChecklistBodyInformation({ checklistData }: Props) {
  const [comment, setComment] = useState<string>(checklistData?.comment ?? '')
  useEffect(() => {
    const timer = setTimeout(() => {
      if (checklistData?.comment !== comment) {
        const predata = { ...checklistData } as ChecklistData
        predata.comment = comment
        updateEachChecklist(predata)
      }
    }, 2000)
  }, [checklistData])
  const type = checklistData?.checklist_type
  return (
    <div className="flex w-full flex-col">
      <h1 className="ml-3 text-xl font-bold tracking-tight text-foreground">
        수의사
      </h1>
      <Table className="m-3 max-w-2xl">
        <TableHeader className="text-bold bg-gray-100">
          <TableRow>
            <TableHead className="max-w-s">직책</TableHead>
            <TableHead>수의사</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>담당의(주치의)</TableCell>
            <TableCell>{checklistData?.checklist_vet?.attending}</TableCell>
          </TableRow>
          {checklistData?.checklist_vet?.primary &&
            checklistData?.checklist_vet?.primary !== '' && (
              <TableRow>
                <TableCell>{type === '사용자' ? '술자' : '술자'}</TableCell>
                <TableCell>{checklistData?.checklist_vet?.primary}</TableCell>
              </TableRow>
            )}
          {checklistData?.checklist_vet?.assistance &&
            checklistData?.checklist_vet?.assistance !== '' && (
              <TableRow>
                <TableCell>{type === '사용자' ? '보조자' : '술자'}</TableCell>
                <TableCell>
                  {checklistData?.checklist_vet?.assistance}
                </TableCell>
              </TableRow>
            )}
          {checklistData?.checklist_vet?.anesthesia &&
            checklistData?.checklist_vet?.anesthesia !== '' && (
              <TableRow>
                <TableCell>마취의</TableCell>
                <TableCell>
                  {checklistData?.checklist_vet?.anesthesia}
                </TableCell>
              </TableRow>
            )}
        </TableBody>
      </Table>
      <h1 className="ml-3 text-xl font-bold tracking-tight text-foreground">
        처치정보
      </h1>
      <Table className="m-3 max-w-2xl">
        <TableHeader className="text-bold bg-gray-100">
          <TableRow>
            <TableHead className="max-w-s">구분</TableHead>
            <TableHead>처치내용</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {checklistData?.preinfo?.pre &&
            checklistData?.preinfo?.pre !== '' && (
              <TableRow>
                <TableCell>전처치</TableCell>
                <TableCell className="whitespace-pre-wrap">
                  {checklistData?.preinfo?.pre}
                </TableCell>
              </TableRow>
            )}
          {checklistData?.preinfo?.induce &&
            checklistData?.preinfo?.induce !== '' && (
              <TableRow>
                <TableCell>유도마취</TableCell>
                <TableCell className="whitespace-pre-wrap">
                  {checklistData?.preinfo?.induce}
                </TableCell>
              </TableRow>
            )}
          {checklistData?.preinfo?.main &&
            checklistData?.preinfo?.main !== '' && (
              <TableRow>
                <TableCell>주요처치</TableCell>
                <TableCell className="whitespace-pre-wrap">
                  {checklistData?.preinfo?.main}
                </TableCell>
              </TableRow>
            )}
          {checklistData?.preinfo?.post &&
            checklistData?.preinfo?.post !== '' && (
              <TableRow>
                <TableCell>후처치</TableCell>
                <TableCell className="whitespace-pre-wrap">
                  {checklistData?.preinfo?.post}
                </TableCell>
              </TableRow>
            )}

          {/* {checklistData?.preinfo?.other && checklistData?.preinfo?.other !== ''&& <TableRow><TableCell>기타처치</TableCell><TableCell>{checklistData?.preinfo?.other}</TableCell></TableRow>}  */}
        </TableBody>
      </Table>
      <Separator className="m-3" />
      <h1 className="ml-3 text-xl font-bold tracking-tight text-foreground">
        소견
      </h1>
      <Textarea
        className="m-3 min-w-[400px] max-w-2xl"
        name="pre"
        rows={8}
        value={comment ?? ''}
        onChange={(e) => setComment(e.target.value)}
      ></Textarea>
    </div>
  )
}
