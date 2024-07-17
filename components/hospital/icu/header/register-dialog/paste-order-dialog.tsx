import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { toast } from '@/components/ui/use-toast'
import { pasteChartOrderWithRegisterPatient } from '@/lib/services/icu/paste-order'
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { useIcuRegisteringPatient } from '@/lib/store/icu/icu-register'
import { useIcuSelectedPatientStore } from '@/lib/store/icu/icu-selected-patient'
import { useSelectedMainViewStore } from '@/lib/store/icu/selected-main-view'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useState } from 'react'

export default function PasteOrderDialog({
  isCopyDialogOpen,
  setIsCopyDialogOpen,
  setIsRegisterDialogOpen,
}: {
  isCopyDialogOpen: boolean
  setIsCopyDialogOpen: (isCopyDialogOpen: boolean) => void
  setIsRegisterDialogOpen?: Dispatch<SetStateAction<boolean>>
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { push, refresh } = useRouter()
  const { setSelectedPatient } = useIcuSelectedPatientStore()
  const { copiedChartId } = useCopiedChartStore()
  const { setSelectedIcuMainView } = useSelectedMainViewStore()
  const { registeringPatient } = useIcuRegisteringPatient() as {
    registeringPatient: {
      patientId: string
      birth: string
      patientName: string
    }
  }
  const handleOkButtonClick = async () => {
    setIsSubmitting(true)
    setSelectedPatient({
      patientId: registeringPatient.patientId,
      patientName: registeringPatient.patientName,
    })

    await pasteChartOrderWithRegisterPatient(
      copiedChartId,
      registeringPatient.patientId,
      format(new Date(), 'yyyy-MM-dd'),
      0,
    )

    push(`${format(new Date(), 'yyyy-MM-dd')}`)

    toast({
      title: '선택하신 입원 차트를 생성하였습니다',
      description: '입원일과 퇴원 예정일을 선택해주세요',
    })

    // Alert Dialog Close
    setIsCopyDialogOpen

    // isSubmitting false
    setIsSubmitting(false)

    // Set MainView
    setSelectedIcuMainView('chart')

    // Register Dialog Close
    if (setIsRegisterDialogOpen) setIsRegisterDialogOpen(false)

    refresh()
  }

  return (
    <AlertDialog open={isCopyDialogOpen} onOpenChange={setIsCopyDialogOpen}>
      <AlertDialogTrigger asChild></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>선택한 차트 생성</AlertDialogTitle>
          <AlertDialogDescription>
            선택한 차트로 환자를 입원하시겠습니까?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>닫기</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleOkButtonClick}
            disabled={isSubmitting}
          >
            확인
            <LoaderCircle
              className={cn(isSubmitting ? 'ml-2 animate-spin' : 'hidden')}
            />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
