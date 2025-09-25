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
import { checkPatientInIcu, registerIcu } from '@/lib/services/icu/register-icu'
import { changeTargetDateInUrl, cn } from '@/lib/utils/utils'
import { CheckIcon, LoaderCircleIcon } from 'lucide-react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { toast } from 'sonner'

type Props = {
  hosId: string
  birth: string
  patientId: string
  patientName: string
  setIsRegisterDialogOpen: Dispatch<SetStateAction<boolean>>
}

export default function RegisterIcuConfirmDialog({
  hosId,
  birth,
  patientId,
  patientName,
  setIsRegisterDialogOpen,
}: Props) {
  const path = usePathname()
  const { target_date } = useParams()
  const { push } = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleConfirm = async () => {
    setIsSubmitting(true)

    await registerIcu(hosId, patientId, birth, target_date as string)

    const splittedPathArr = path.split('/')
    const currentPatientId = splittedPathArr[6]
    if (currentPatientId) {
      // 환자 선택 상태에서 입원 → ID 교체
      splittedPathArr[6] = patientId
    } else {
      // 처치표/종합현황 등 → chart 라우트 + 환자 ID 추가
      splittedPathArr[5] = 'chart'
      splittedPathArr.push(patientId)
    }

    const newPatientPath = splittedPathArr.join('/')
    const newPath = changeTargetDateInUrl(newPatientPath, target_date as string)

    push(newPath)

    toast.success('입원 등록 완료', {
      description: '차트를 생성하세요',
    })

    setIsSubmitting(false)
    setIsRegisterDialogOpen(false)
  }

  const handleDialogOpen = async (open: boolean) => {
    if (open) {
      setIsLoading(true)

      const result = await checkPatientInIcu(patientId, target_date as string)

      if (result) {
        toast.warning('입원 중이거나 당일 퇴원한 환자입니다')
        setIsLoading(false)
        return
      }

      setIsLoading(false)
      setIsDialogOpen(true)
    } else {
      setIsDialogOpen(false)
    }
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
          <AlertDialogTitle>환자 입원</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          {`${patientName}를(을) ${target_date}에 입원하시겠습니까?`}
        </AlertDialogDescription>

        <AlertDialogFooter className="pt-8">
          <AlertDialogCancel>닫기</AlertDialogCancel>

          <Button onClick={handleConfirm} disabled={isSubmitting}>
            확인
            <LoaderCircleIcon
              className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
            />
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
