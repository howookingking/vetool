import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { TemplateChecklist } from '@/types/checklist/checklist-type'
import { Copy, Eye, LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import ChecklistPreview from '../preview/checklist-preview'
import { Checklist } from '@/types'
import { Separator } from '@/components/ui/separator'
import { useParams } from 'next/navigation'
import useIsMobile from '@/hooks/use-is-mobile'
export default function ChecklistSearchCopyButton({
  chart,
  isTemplate,
}: {
  chart: TemplateChecklist | Checklist
  isTemplate: boolean
}) {
  const [isPreviewing, setIsPreviewing] = useState(false)
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false)
  const { target_date } = useParams()
  const isMobile = useIsMobile()
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
        <DialogContent className={isMobile ? '' : 'sm:min-w-[1000px]'}>
          <DialogHeader>
            <DialogTitle>{`선택한 차트를 복사 해서 ${target_date}에 새로운 체크리스트를 만들겠습니까?`}</DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <span></span>
          <span>
            <Button variant={'default'} className="max-w-[150px]">
              동일 환자로 복사
            </Button>{' '}
            : 동일 환자로 복사된 체크리스트 차트를 생성
          </span>
          <span>
            <Button variant={'outline'} className="max-w-[150px]">
              환자 미등록 복사
            </Button>{' '}
            : 복사된 체크리스트를 생성 후 새로운 환자 등록
          </span>
          <Separator />

          {!isMobile && (
            <div className="border-grey-400 rounded-md border p-3">
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
