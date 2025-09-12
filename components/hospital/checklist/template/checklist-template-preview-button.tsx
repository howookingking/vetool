import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { TemplateChecklist } from '@/types/checklist/checklist-type'
import { Eye, LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import ChecklistPreview from '../preview/checklist-preview'
import { Checklist } from '@/types'

export default function ChecklistTemplatePreviewButton({
  chart,
  isTemplate,
}: {
  chart: TemplateChecklist | Checklist
  isTemplate: boolean
}) {
  const [isPreviewing, setIsPreviewing] = useState(false)
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false)

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
          <Eye size={18} />
        )}
      </Button>
      <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
        <DialogContent className="h-[80vh] w-[80vw] max-w-none overflow-hidden p-0">
          <DialogHeader>
            <DialogTitle className="m-3">
              {isTemplate ? '템플릿 미리보기' : '차트 미리보기'}
            </DialogTitle>
            <DialogDescription />
          </DialogHeader>

          <ChecklistPreview templateChecklist={chart} isTemplate={isTemplate} />
        </DialogContent>
      </Dialog>
    </>
  )
}
