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
import { useIcuRegisterStore } from '@/lib/store/icu/icu-register'
import { changeTargetDateInUrl, cn } from '@/lib/utils/utils'
import { LoaderCircle } from 'lucide-react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

export default function RegisterIcuConfirmDialog({
  hosId,
  isConfirmDialogOpen,
  setIsConfirmDialogOpen,
  handleCloseDialog,
  defaultMainVetId,
  defaultMainGroup,
}: {
  hosId: string
  isConfirmDialogOpen: boolean
  setIsConfirmDialogOpen: (open: boolean) => void
  handleCloseDialog: () => void
  defaultMainVetId: string
  defaultMainGroup: string
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { registeringPatient } = useIcuRegisterStore()
  const { target_date } = useParams()
  const { push } = useRouter()

  const path = usePathname()

  const handleConfirm = async () => {
    setIsSubmitting(true)

    await registerIcuPatient(
      hosId,
      registeringPatient?.patientId!,
      registeringPatient?.birth!,
      target_date as string,
      '',
      [defaultMainGroup as string],
      defaultMainVetId as string,
    )

    const splittedPath = path.split('/')
    if (splittedPath[6]) {
      splittedPath[splittedPath.length - 1] = registeringPatient?.patientId!
    } else {
      splittedPath[5] = 'chart'
      splittedPath.push(registeringPatient?.patientId!)
    }

    const newPatientPath = splittedPath.join('/')
    const newPath = changeTargetDateInUrl(newPatientPath, target_date as string)

    push(newPath)

    toast({
      title: '입원 등록 완료',
      description: '입원 등록을 완료했습니다. 차트를 생성하세요',
    })

    handleCloseDialog?.()
    setIsSubmitting(false)
  }

  const handleCloseConfirmDialog = () => {
    setIsConfirmDialogOpen(false)
    handleCloseDialog?.()
    setIsSubmitting(false)
  }

  return (
    <AlertDialog
      open={isConfirmDialogOpen}
      onOpenChange={setIsConfirmDialogOpen}
    >
      <AlertDialogContent className="gap-0">
        <AlertDialogHeader>
          <AlertDialogTitle>등록 환자 입원</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          {`${registeringPatient?.patientName} 환자를 ${target_date}에 입원하시겠습니까?`}
        </AlertDialogDescription>

        <AlertDialogFooter className="pt-8">
          <AlertDialogCancel onClick={handleCloseConfirmDialog}>
            닫기
          </AlertDialogCancel>

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
