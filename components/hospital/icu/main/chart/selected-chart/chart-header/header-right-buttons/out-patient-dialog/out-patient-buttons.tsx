import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { useSafeRefresh } from '@/hooks/use-realtime-refresh'
import { toggleOutPatient } from '@/lib/services/icu/chart/update-icu-chart-infos'
import { cn, hashtagKeyword } from '@/lib/utils/utils'
import type { SelectedIcuChart } from '@/types/icu/chart'
import { LoaderCircleIcon } from 'lucide-react'
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
      {!isPatientOut && (
        <Button
          variant="outline"
          className="mr-auto"
          onClick={() => handleOutPatient(false)}
          disabled={isAliveSubmitting}
        >
          🌈 사망
          <LoaderCircleIcon
            className={cn(isAliveSubmitting ? 'ml-2 animate-spin' : 'hidden')}
          />
        </Button>
      )}

      <DialogClose asChild>
        <Button type="button" variant="outline">
          취소
        </Button>
      </DialogClose>
      <Button onClick={() => handleOutPatient(true)} disabled={isOutSubmitting}>
        {isPatientOut ? '퇴원취소' : '퇴원'}
        <LoaderCircleIcon
          className={cn(isOutSubmitting ? 'ml-2 animate-spin' : 'hidden')}
        />
      </Button>
    </>
  )
}
