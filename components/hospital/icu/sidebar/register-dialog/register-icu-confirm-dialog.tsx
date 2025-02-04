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
import { registerIcuPatient } from '@/lib/services/icu/register-icu-patient'
import { changeTargetDateInUrl, cn } from '@/lib/utils/utils'
import { LoaderCircle } from 'lucide-react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { type RegisteringPatient } from './register-dialog'

type RegisterIcuConfirmDialogProps = {
  hosId: string
  isConfirmDialogOpen: boolean
  setIsConfirmDialogOpen: Dispatch<SetStateAction<boolean>>
  defaultVetId: string
  defaultGroup: string
  setIsRegisterDialogOpen: Dispatch<SetStateAction<boolean>>
  registeringPatient: RegisteringPatient
}

export default function RegisterIcuConfirmDialog({
  hosId,
  isConfirmDialogOpen,
  setIsConfirmDialogOpen,
  defaultGroup,
  defaultVetId,
  setIsRegisterDialogOpen,
  registeringPatient,
}: RegisterIcuConfirmDialogProps) {
  const path = usePathname()
  const { target_date } = useParams()
  const { push } = useRouter()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleConfirm = async () => {
    setIsSubmitting(true)

    await registerIcuPatient(
      hosId,
      registeringPatient?.patientId!,
      registeringPatient?.birth!,
      target_date as string,
      '',
      [defaultGroup as string],
      defaultVetId as string,
    )

    const splittedPathArr = path.split('/')
    const currentPatientId = splittedPathArr[6]
    if (currentPatientId) {
      // 입원차트에서 환자를 선택한 경우 : 등록중인 환자의 id로 변경
      // 예) /hospital/병원아이디/icu/2025-01-31/chart/환자아이디
      splittedPathArr[6] = registeringPatient?.patientId!
    } else {
      // 처치표, 종합현황 등에서 입원시키는 경우 : chart라우트로 변경하고 환자아이디 추가
      splittedPathArr[5] = 'chart'
      splittedPathArr.push(registeringPatient?.patientId!)
    }

    const newPatientPath = splittedPathArr.join('/')
    const newPath = changeTargetDateInUrl(newPatientPath, target_date as string)

    push(newPath)

    toast({
      title: '입원 등록 완료',
      description: '입원 등록을 완료했습니다. 차트를 생성하세요',
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
          <AlertDialogTitle>환자 입원</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          {`${registeringPatient?.patientName}를(을) ${target_date}에 입원하시겠습니까?`}
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
