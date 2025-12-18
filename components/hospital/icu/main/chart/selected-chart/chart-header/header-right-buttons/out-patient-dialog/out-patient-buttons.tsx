import SubmitButton from '@/components/common/submit-button'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { Spinner } from '@/components/ui/spinner'
import { useSafeRefresh } from '@/hooks/use-safe-refresh'
import { toggleOutPatient } from '@/lib/services/icu/chart/update-icu-chart-infos'
import { hashtagKeyword } from '@/lib/utils/utils'
import type { SelectedIcuChart } from '@/types/icu/chart'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { toast } from 'sonner'

type Props = {
  isPatientOut: boolean
  icuIo: SelectedIcuChart['icu_io']
  patient: SelectedIcuChart['patient']
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}

export default function OutPatientButtons({
  isPatientOut,
  icuIo,
  patient,
  setIsDialogOpen,
}: Props) {
  const safeRefresh = useSafeRefresh()

  const [isOutSubmitting, setIsOutSubmitting] = useState(false)
  const [isAliveSubmitting, setIsAliveSubmitting] = useState(false)

  const handleOutPatient = async (isAlive: boolean) => {
    isAlive ? setIsOutSubmitting(true) : setIsAliveSubmitting(true)
    const hashtaggedDxCc = hashtagKeyword(
      `${icuIo.icu_io_dx}, ${icuIo.icu_io_cc}`,
    )

    await toggleOutPatient(
      icuIo.icu_io_id,
      patient.patient_id,
      isPatientOut,
      hashtaggedDxCc,
      patient.breed ?? 'OTHER BREED',
      patient.name,
      patient.species,
      patient.owner_name ?? '',
      patient.gender,
      icuIo.age_in_days,
      isAlive,
    )

    toast.success(
      isPatientOut
        ? `${patient.name}의 퇴원을 취소하였습니다`
        : `${patient.name}을(를) 퇴원처리 하였습니다`,
    )

    isAlive ? setIsOutSubmitting(false) : setIsAliveSubmitting(false)
    setIsDialogOpen(false)
    safeRefresh()
  }

  return (
    <>
      {!isPatientOut ? (
        <Button
          variant="outline"
          className="mr-auto"
          onClick={() => handleOutPatient(false)}
          disabled={isAliveSubmitting}
        >
          🌈 사망
          {isAliveSubmitting ? <Spinner /> : null}
        </Button>
      ) : null}

      <DialogClose asChild>
        <Button type="button" variant="outline">
          닫기
        </Button>
      </DialogClose>

      <SubmitButton
        isPending={isOutSubmitting}
        buttonText={isPatientOut ? '퇴원취소' : '퇴원'}
        onClick={() => handleOutPatient(true)}
      />
    </>
  )
}
