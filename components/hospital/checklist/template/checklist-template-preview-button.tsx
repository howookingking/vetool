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

export default function ChecklistTemplatePreviewButton({
  chart,
  isTemplate,
}: {
  chart: TemplateChecklist
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
        <DialogContent className="sm:min-w-[1600px]">
          <DialogHeader>
            <DialogTitle>
              {isTemplate ? '템플릿 미리보기' : '차트 챠트 미리보기'}
            </DialogTitle>
            <DialogDescription />
          </DialogHeader>

          <ChecklistPreview templateChecklist={chart} />
        </DialogContent>
      </Dialog>
    </>
  )
}
