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
import { sendApprovalToHospital } from '@/lib/services/on-boarding/on-boarding'
import { cn } from '@/lib/utils/utils'
import { Check, LoaderCircle } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function ConfirmSelectHospitalDialog({
  hosId,
  name,
}: {
  hosId: string
  name: string
}) {
  const { push } = useRouter()
  const searchParams = useSearchParams()
  const isVet = searchParams.get('is_vet')
  const username = searchParams.get('name')

  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)

    await sendApprovalToHospital(hosId, isVet === 'true', username!)

    toast({
      title: '승인 요청을 보냈습니다',
      description: '승인 완료 후 로그인 해주세요',
    })
    setIsSubmitting(false)
    setIsOpen(false)
    push('/')
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <Check />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[300px] rounded-md sm:max-w-md">
        <DialogHeader>
          <DialogTitle>승인 요청하기</DialogTitle>
          <DialogDescription>{name}에 승인요청을 보냅니다</DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-2 sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              취소
            </Button>
          </DialogClose>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            확인
            <LoaderCircle
              className={cn(isSubmitting ? 'animate-spin' : 'hidden')}
            />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
