import { Button } from '@/components/ui/button'
import { cn, convertPascalCased } from '@/lib/utils/utils'
import type { IcuSidebarIoData, Vet } from '@/types/icu/chart'
import { Cat, Dog, Stethoscope, User } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useCallback } from 'react'

export default function PatientButton({
  icuIoData,
  vetsListData,
}: {
  icuIoData: IcuSidebarIoData
  vetsListData: Vet[]
}) {
  const { push } = useRouter()
  const { hos_id, target_date, patient_id } = useParams()

  const SpeciesIcon = icuIoData.patient.species === 'canine' ? Dog : Cat
  const vetName = vetsListData.find(
    (vet) => vet.user_id === icuIoData.vets?.main_vet,
  )?.name

  const handlePatientButtonClick = useCallback(() => {
    push(
      `/hospital/${hos_id}/icu/${target_date}/chart/${icuIoData.patient.patient_id}`,
    )
  }, [hos_id, target_date, icuIoData.patient.patient_id, push])
  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(
        'w-full py-7',
        patient_id === icuIoData.patient.patient_id && 'bg-muted',
      )}
      onClick={handlePatientButtonClick}
    >
      <div
        className={cn(
          'flex w-full flex-col justify-between gap-1',
          icuIoData.out_date && 'text-muted-foreground line-through',
        )}
      >
        <div className="flex justify-between gap-2">
          {/* 환자명 */}
          <span className="flex items-center gap-1 text-sm">
            <SpeciesIcon />
            {icuIoData.patient.name}
          </span>

          {/* 품종 */}
          <span className="max-w-[96px] truncate text-xs leading-5">
            {convertPascalCased(icuIoData.patient.breed)}
          </span>
        </div>

        <div className="flex justify-between gap-2">
          {/* 주치의명 */}
          <span className="text- ml-[2px] flex items-center gap-1 text-xs">
            <Stethoscope style={{ width: 12, height: 12 }} />
            {vetName ?? '미지정'}
          </span>

          {/* 보호자명 */}
          <span className="flex items-center gap-1 truncate text-xs">
            <User style={{ width: 12, height: 12 }} />
            <span className="truncate">
              {icuIoData.patient.owner_name || '미지정'}
            </span>
          </span>
        </div>
      </div>
    </Button>
  )
}
