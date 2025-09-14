import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { registerChecklist } from '@/lib/services/checklist/register-checklist-patient'
import { LoaderCircleIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { type Dispatch, type SetStateAction, useState } from 'react'
import type { RegisteringPatient } from './checklist-register-dialog'

type Props = {
  hosId: string
  targetDate: string
  isConfirmDialogOpen: boolean
  setIsConfirmDialogOpen: Dispatch<SetStateAction<boolean>>
  setIsRegisterDialogOpen: Dispatch<SetStateAction<boolean>>
  registeringPatient: RegisteringPatient
}

export default function RegisterChecklistConfirmDialog({
  hosId,
  targetDate,
  isConfirmDialogOpen,
  setIsConfirmDialogOpen,
  setIsRegisterDialogOpen,
  registeringPatient,
}: Props) {
  const { push } = useRouter()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleConfirm = async () => {
    setIsSubmitting(true)

    const {
      patientId,
      birth,
      patientName,
      species,
      breed,
      gender,
      hosPatientId,
    } = registeringPatient!

    const returningChecklistId = await registerChecklist(
      hosId,
      patientId,
      birth,
      targetDate,
      species!,
      breed!,
      gender!,
      patientName,
      hosPatientId!,
    )

    toast({
      title: `${patientName} 체크리스트 등록 완료`,
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
      <AlertDialogContent className="gap-0">
        <AlertDialogHeader>
          <AlertDialogTitle>채크리스트 등록</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          {targetDate}에 {registeringPatient?.patientName}(이)의 체크리스트를
          등록 하시겠습니까 ?
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
