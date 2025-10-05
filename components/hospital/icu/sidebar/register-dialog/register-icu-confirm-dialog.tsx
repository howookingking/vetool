import ConfirmButton from '@/components/common/confirm-button'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { isPatientInIcu, registerIcu } from '@/lib/services/icu/register-icu'
import { CheckIcon, LoaderCircleIcon } from 'lucide-react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { toast } from 'sonner'

type Props = {
  hosId: string
  birth: string
  patientId: string
  patientName: string
  setIsIcuRegisterDialogOpen: Dispatch<SetStateAction<boolean>>
}

export default function RegisterIcuConfirmDialog({
  hosId,
  birth,
  patientId,
  patientName,
  setIsIcuRegisterDialogOpen,
}: Props) {
  const path = usePathname()
  const { target_date } = useParams()
  const { push } = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleDialogOpen = async (open: boolean) => {
    if (open) {
      setIsLoading(true)

      const result = await isPatientInIcu(patientId, target_date as string)

      if (result) {
        toast.warning(`${target_date}에 입원 중이거나 퇴원한 환자입니다`)

        setIsLoading(false)
        return
      }

      setIsLoading(false)

      setIsDialogOpen(true)
    } else {
      setIsDialogOpen(false)
    }
  }

  const handleConfirm = async () => {
    setIsSubmitting(true)

    await registerIcu(hosId, patientId, birth, target_date as string)

    push(`/hospital/${hosId}/icu/${target_date}/chart/${patientId}`)

    toast.success('입원 등록 완료', {
      description: '차트를 생성하세요',
    })

    setIsSubmitting(false)

    setIsIcuRegisterDialogOpen(false)
  }

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={handleDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon">
          {isLoading ? (
            <LoaderCircleIcon className="animate-spin" />
          ) : (
            <CheckIcon />
          )}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="gap-0">
        <AlertDialogHeader>
          <AlertDialogTitle>{`${patientName}`} 입원 등록</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>{`${target_date}에 입원합니다`}</AlertDialogDescription>

        <AlertDialogFooter className="pt-8">
          <AlertDialogCancel>닫기</AlertDialogCancel>

          <ConfirmButton isLoading={isSubmitting} onClick={handleConfirm} />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
