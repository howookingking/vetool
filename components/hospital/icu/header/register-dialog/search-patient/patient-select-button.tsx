import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { getLatestIoByPatientId } from '@/lib/services/icu/chart/get-icu-io-by-patient-id'
import { useIcuRegisterStore } from '@/lib/store/icu/icu-register'
import { getDaysSince } from '@/lib/utils/utils'
import { Check, LoaderCircle } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function PatientSelectButton({
  patientId,

  birth,
  patientName,
}: {
  patientId: string
  birth: string
  patientName: string
}) {
  const { setStep, setRegisteringPatient } = useIcuRegisterStore()
  const [isLoading, setIsLoading] = useState(false)
  const { target_date } = useParams()

  const handlePatientClick = async () => {
    setIsLoading(true)
    const icuIoData = await getLatestIoByPatientId(patientId)
    setIsLoading(false)

    // 입원일이 있고 퇴원일이 없음 === 입원중
    if (icuIoData?.in_date && !icuIoData.out_date) {
      toast({
        variant: 'destructive',
        title: '입원중인 환자',
        description: '이미 입원중인 환자입니다',
      })
      return
    }

    // 입원일이 있고 퇴원일이 있으며 퇴원일이 선택일보다 같거나 이후 === 퇴원완료함, 같은날 동일 환자 차트가 2개 있으면 안되기 때문에 입원 방지
    if (
      icuIoData?.in_date &&
      icuIoData.out_date &&
      icuIoData.out_date >= (target_date as string)
    ) {
      toast({
        variant: 'destructive',
        title: '선택일에 이미 퇴원한 환자입니다.',
        description: '퇴원을 취소해주세요',
      })
      return
    }

    setStep('icuRegister')
    setRegisteringPatient({
      patientId,
      birth,
      patientName,
      ageInDays: getDaysSince(birth),
    })
  }

  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      onClick={handlePatientClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <LoaderCircle size={16} className="animate-spin" />
      ) : (
        <Check size={16} />
      )}
    </Button>
  )
}
