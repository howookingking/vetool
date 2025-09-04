import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Eye, LoaderCircle } from 'lucide-react'
import { useState } from 'react'

export default function ChecklistTemplatePreviewButton({
  chartId,
  isTemplate,
}: {
  chartId: string
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isTemplate ? '템플릿 미리보기' : '차트 챠트 미리보기'}
            </DialogTitle>
            <DialogDescription />
          </DialogHeader>

          <div className="max-h-[800px] w-[auto] overflow-y-auto">
            {/* <ChartTable preview chartData={copiedChart!} /> */}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
