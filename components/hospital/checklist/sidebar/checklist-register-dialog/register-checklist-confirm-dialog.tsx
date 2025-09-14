import type { RegisteringPatient } from '@/components/hospital/icu/sidebar/register-dialog/register-dialog'
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
import { cn } from '@/lib/utils/utils'
import { LoaderCircle } from 'lucide-react'
import { useParams } from 'next/navigation'
import { type Dispatch, type SetStateAction, useState } from 'react'

type RegisterIcuConfirmDialogProps = {
  hosId: string
  isConfirmDialogOpen: boolean
  setIsConfirmDialogOpen: Dispatch<SetStateAction<boolean>>
  setIsRegisterDialogOpen: Dispatch<SetStateAction<boolean>>
  registeringPatient: RegisteringPatient
  isEmergency: boolean
  setIsEmergency: Dispatch<SetStateAction<boolean>>
}

export default function RegisterChecklistConfirmDialog({
  hosId,
  isConfirmDialogOpen,
  setIsConfirmDialogOpen,
  setIsRegisterDialogOpen,
  registeringPatient,
  isEmergency,
  setIsEmergency,
}: RegisterIcuConfirmDialogProps) {
  const { target_date } = useParams()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleConfirm = async () => {
    setIsSubmitting(true)

    if (isEmergency) {
      await registerChecklist(
        hosId,
        null,
        null,
        target_date as string,
        true as boolean,
        '',
        '',
        '',
        '',
        '',
      ).then(() => {
        setIsEmergency(false)
      })
    } else {
      // 체크리스트가 최초 등록시
      // registeriingPatient정보가 있다면(환자가 선택됬다면), 선택된 환자로 ID로 등록, 정보가 없다면 null로 등록
      registerChecklist(
        hosId,
        registeringPatient ? registeringPatient.patientId : null,
        registeringPatient ? registeringPatient.birth : null,
        target_date as string,
        false,
        registeringPatient?.species ?? '',
        registeringPatient?.breed ?? '',
        registeringPatient?.gender ?? '',
        registeringPatient?.patientName ?? '',
        registeringPatient?.hosPatientId ?? '',
      )
    }

    toast({
      title: '체크리스트 등록 완료',
      description: '체크리스트 등록을 완료했습니다',
    })

    setIsSubmitting(false)
    setIsConfirmDialogOpen(false)
    setIsRegisterDialogOpen(false)
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
          {registeringPatient
            ? ` ${target_date}에 ${registeringPatient?.patientName}(이)의 체크리스트를 등록 하시겠습니까 ?`
            : ` ${target_date}에 체크리스트를 등록 하시겠습니까 ?`}
        </AlertDialogDescription>

        <AlertDialogFooter className="pt-8">
          <AlertDialogCancel>닫기</AlertDialogCancel>

          <Button onClick={handleConfirm} disabled={isSubmitting}>
            확인
            <LoaderCircle
              className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
            />
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
