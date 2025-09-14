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
import { toast } from '@/components/ui/use-toast'
import { registerChecklist } from '@/lib/services/checklist/register-checklist-patient'
import { CheckIcon, LoaderCircleIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { type Dispatch, type SetStateAction, useState } from 'react'

type Props = {
  patientId: string
  name: string
  birth: string
  hosId: string
  targetDate: string
  setIsRegisterDialogOpen: Dispatch<SetStateAction<boolean>>
}

export default function SelectedPatientToClDialog({
  patientId,
  name,
  birth,
  hosId,
  targetDate,
  setIsRegisterDialogOpen,
}: Props) {
  const { push } = useRouter()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)

  const handleConfirm = async () => {
    setIsSubmitting(true)

    const returningChecklistId = await registerChecklist(
      hosId,
      targetDate,
      patientId,
      birth,
    )

    toast({
      title: `${name} 체크리스트 등록 완료`,
    })

    setIsSubmitting(false)
    setIsConfirmDialogOpen(false)
    setIsRegisterDialogOpen(false)

    push(
      `/hospital/${hosId}/checklist/${targetDate}/chart/${returningChecklistId}/checklist`,
    )
  }

  return (
    <AlertDialog
      open={isConfirmDialogOpen}
      onOpenChange={setIsConfirmDialogOpen}
    >
      <AlertDialogTrigger asChild>
        <Button type="button" size="icon" variant="ghost">
          <CheckIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="gap-0">
        <AlertDialogHeader>
          <AlertDialogTitle>채크리스트 등록</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          {targetDate}에 {name}(이)의 체크리스트를 등록 하시겠습니까 ?
        </AlertDialogDescription>

        <AlertDialogFooter className="pt-8">
          <AlertDialogCancel>닫기</AlertDialogCancel>

          <Button
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="w-14"
          >
            {isSubmitting ? (
              <LoaderCircleIcon className="animate-spin" />
            ) : (
              '확인'
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
