import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { toast } from '@/components/ui/use-toast'
import { TemplateChecklist } from '@/types/checklist/checklist-type'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils/utils'
import { LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { templateToChecklist } from '@/lib/services/checklist/checklist-template'
export default function RegistChecklistByTemplateDialog({
  templatechecklistchart,
}: {
  templatechecklistchart: TemplateChecklist
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { target_date } = useParams()
  const { push } = useRouter()
  const [open, setOpen] = useState(false)
  const handleConfirm = async () => {
    setIsSubmitting(true)
    templateToChecklist(templatechecklistchart, target_date as string)
    toast({
      title: '체크리스트 등록 완료',
      description:
        '체크리스트 등록을 완료했습니다. 환자정보 및 추가정보를 입력해 주세요',
    })
    setIsSubmitting(false)
    setOpen(false)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'ghost'}>
          <Check />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mr-2">
            {` 선택한 템플릿을 이용해 ${target_date}에 새로운 체크리스트를 만들겠습니까?`}
          </DialogTitle>
          <DialogDescription>
            체크리스트 생성 후 환자 및 추가 정보를 기록해 주세요.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="destructive" type="button">
              취소
            </Button>
          </DialogClose>
          <Button disabled={isSubmitting} onClick={handleConfirm}>
            확인
            <LoaderCircle
              className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
            />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
