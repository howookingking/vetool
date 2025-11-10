import SubmitButton from '@/components/common/submit-button'
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
import { sendApprovalToHospital } from '@/lib/services/on-boarding/on-boarding'
import { CheckIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

type Props = {
  hosId: string
  name: string
}

export default function ConfirmSelectHospitalDialog({ hosId, name }: Props) {
  const { push } = useRouter()
  const searchParams = useSearchParams()
  const isVet = searchParams.get('is_vet')
  const username = searchParams.get('name')

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)

    await sendApprovalToHospital(hosId, isVet === 'true', username!)

    toast.success('승인 요청을 전송하였습니다', {
      description: '승인 완료 후 로그인 해주세요',
    })

    setIsSubmitting(false)
    setIsDialogOpen(false)
    push('/on-boarding/approval-waiting')
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <CheckIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[300px] rounded-md sm:max-w-md">
        <DialogHeader>
          <DialogTitle>승인 요청하기</DialogTitle>
          <DialogDescription>{name}에 승인요청을 보냅니다</DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-2 sm:gap-0">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              취소
            </Button>
          </DialogClose>

          <SubmitButton
            buttonText="확인"
            isPending={isSubmitting}
            onClick={handleSubmit}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
