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
import { type Dispatch, type SetStateAction, useState } from 'react'
import { type RegisteringPatient } from '@/components/hospital/icu/sidebar/register-dialog/register-dialog'
import { changeTargetDateInUrl, cn } from '@/lib/utils/utils'
import { LoaderCircle } from 'lucide-react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import {
  addPatientToChecklist,
  registerChecklist,
} from '@/lib/services/checklist/register-checklist-patient'
import { ChecklistData } from '@/types/checklist/checklist-type'

type RegisterIcuConfirmDialogProps = {
  hosId: string
  isConfirmDialogOpen: boolean
  setIsConfirmDialogOpen: Dispatch<SetStateAction<boolean>>
  setIsRegisterDialogOpen: Dispatch<SetStateAction<boolean>>
  registeringPatient: RegisteringPatient
  checklistData: ChecklistData | null
}

export default function RegisterChecklistConfirmDialog({
  hosId,
  isConfirmDialogOpen,
  setIsConfirmDialogOpen,
  setIsRegisterDialogOpen,
  registeringPatient,
  checklistData,
}: RegisterIcuConfirmDialogProps) {
  const { target_date } = useParams()
  const { push } = useRouter()
  const path = usePathname()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleConfirm = async () => {
    setIsSubmitting(true)
    if (!checklistData) {
      registerChecklist(
        hosId,
        registeringPatient ? registeringPatient.patientId : null,
        registeringPatient ? registeringPatient.birth : null,
        target_date as string,
      )
    } else {
      addPatientToChecklist(
        checklistData.checklist_id,
        registeringPatient?.patientId!,
        registeringPatient?.birth!,
      )
    }

    //   const splittedPathArr = path.split('/')

    //   if (currentPatientId) {
    //     // 입원차트에서 환자를 선택한 경우 : 등록중인 환자의 id로 변경
    //     // 예) /hospital/병원아이디/icu/2025-01-31/chart/환자아이디
    //     splittedPathArr[6] = registeringPatient?.patientId!
    //   } else {
    //     // 처치표, 종합현황 등에서 입원시키는 경우 : chart라우트로 변경하고 환자아이디 추가
    //     splittedPathArr[5] = 'chart'
    //     splittedPathArr.push(registeringPatient?.patientId!)
    //   }

    //   const newPatientPath = splittedPathArr.join('/')
    //   const newPath = changeTargetDateInUrl(newPatientPath, target_date as string)

    //   push(newPath)

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
