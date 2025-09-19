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
import {
  type ChecklistWithPatientWithWeight,
  updateEachChecklist,
} from '@/lib/services/checklist/get-checklist-data-client'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
type Props = {
  checklistData: ChecklistWithPatientWithWeight
}
export default function ChecklistBodyInformation({ checklistData }: Props) {
  const [comment, setComment] = useState<string>('')
  const [isSaving, setIsSaving] = useState(false)
  useEffect(() => {
    checklistData?.comment && setComment(checklistData.comment)
    // const timer = setTimeout(() => {
    //   if (checklistData?.comment !== comment) {
    //     const predata = { ...checklistData } as ChecklistData
    //     predata.comment = comment
    //     updateEachChecklist(predata)
    //   }
    // }, 2000)
    setIsSaving(false)
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
          {checklistData?.pre_info?.pre &&
            checklistData?.pre_info?.pre !== '' && (
              <TableRow>
                <TableCell>전처치</TableCell>
                <TableCell className="whitespace-pre-wrap">
                  {checklistData?.pre_info?.pre}
                </TableCell>
              </TableRow>
            )}
          {checklistData?.pre_info?.induce &&
            checklistData?.pre_info?.induce !== '' && (
              <TableRow>
                <TableCell>유도마취</TableCell>
                <TableCell className="whitespace-pre-wrap">
                  {checklistData?.pre_info?.induce}
                </TableCell>
              </TableRow>
            )}
          {checklistData?.pre_info?.main &&
            checklistData?.pre_info?.main !== '' && (
              <TableRow>
                <TableCell>주요처치</TableCell>
                <TableCell className="whitespace-pre-wrap">
                  {checklistData?.pre_info?.main}
                </TableCell>
              </TableRow>
            )}
          {checklistData?.pre_info?.post &&
            checklistData?.pre_info?.post !== '' && (
              <TableRow>
                <TableCell>후처치</TableCell>
                <TableCell className="whitespace-pre-wrap">
                  {checklistData?.pre_info?.post}
                </TableCell>
              </TableRow>
            )}

          {/* {checklistData?.pre_info?.other && checklistData?.pre_info?.other !== ''&& <TableRow><TableCell>기타처치</TableCell><TableCell>{checklistData?.pre_info?.other}</TableCell></TableRow>}  */}
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
      {checklistData?.comment !== comment && (
        <div className="m-3 w-[100px]">
          {isSaving ? (
            <LoaderCircle className="ml-2 animate-spin" />
          ) : (
            <Button
              variant="default"
              size="sm"
              onClick={() => {
                setIsSaving(true)
                const predata: ChecklistWithPatientWithWeight = {
                  ...checklistData,
                }
                predata.comment = comment
                updateEachChecklist(predata)
                setIsSaving(true)
              }}
            >
              저장
            </Button>
          )}{' '}
        </div>
      )}
    </div>
  )
}
