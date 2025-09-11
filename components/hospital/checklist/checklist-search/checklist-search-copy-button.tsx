import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  ChecklistData,
  TemplateChecklist,
} from '@/types/checklist/checklist-type'
import { Bookmark, Copy, Eye, LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import ChecklistPreview from '../preview/checklist-preview'
import { Checklist } from '@/types'
import { Separator } from '@/components/ui/separator'
import { useParams } from 'next/navigation'
import useIsMobile from '@/hooks/use-is-mobile'
import { ChecklistCopy } from '@/lib/services/checklist/register-checklist-patient'
import { set } from 'date-fns'
import { checklistToTemplate } from '@/lib/services/checklist/checklist-template'
export default function ChecklistSearchCopyButton({
  chart,
  isTemplate,
}: {
  chart: Checklist
  isTemplate: boolean
}) {
  const [isPreviewing, setIsPreviewing] = useState(false)
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false)
  const { target_date } = useParams()
  const isMobile = useIsMobile()

  const handleConfirm = async (isSamePatient: boolean) => {
    const predata = JSON.parse(JSON.stringify(chart)) as ChecklistData
    !isSamePatient && (predata.patient_id = '')
    await ChecklistCopy(predata, target_date as string)
    setIsPreviewDialogOpen(false)
  }
  const registTemplate = async () => {
    const predata = JSON.parse(JSON.stringify(chart)) as ChecklistData
    await checklistToTemplate(predata)
    setIsPreviewDialogOpen(false)
  }
  return (
    <>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => setIsPreviewDialogOpen(true)}
        disabled={isPreviewing}
        className="mx-auto flex items-center justify-center"
      >
        {isPreviewing ? (
          <LoaderCircle size={18} className="animate-spin" />
        ) : (
          <Copy size={18} />
        )}
      </Button>
      <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
        <DialogContent
          className={
            isMobile ? '' : 'h-[80vh] w-[80vw] max-w-none overflow-hidden p-3'
          }
        >
          <DialogHeader>
            <DialogTitle className="justify-left m-3">{`선택한 차트를 복사 해서 ${target_date}에 새로운 체크리스트를 만들겠습니까?`}</DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <span></span>
          <span>
            <Button
              variant={'default'}
              className="max-w-[150px]"
              onClick={() => {
                handleConfirm(true)
              }}
            >
              동일 환자로 복사
            </Button>{' '}
            : 동일 환자로 복사된 체크리스트 차트를 생성
          </span>
          <span>
            <Button
              variant={'outline'}
              className="max-w-[150px]"
              onClick={() => {
                handleConfirm(false)
              }}
            >
              환자 미등록 복사
            </Button>{' '}
            : 복사된 체크리스트를 생성 후 새로운 환자 등록
          </span>
          <span>
            <Button
              variant={'outline'}
              className="max-w-[150px]"
              onClick={() => {
                registTemplate()
              }}
            >
              <Bookmark />
              템플릿으로 저장
            </Button>{' '}
            : 복사된 체크리스트를 템플릿으로 저장
          </span>
          <Separator />

          {!isMobile && (
            <div className="border-grey-400 overflow-y-auto rounded-md border p-3">
              <h2>복사할 체크리스트 미리보기</h2>
              <ChecklistPreview
                templateChecklist={chart}
                isTemplate={isTemplate}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
