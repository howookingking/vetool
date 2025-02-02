import { Button } from '@/components/ui/button'
import { cn, convertPascalCased } from '@/lib/utils/utils'
import { type IcuSidebarIoData, type Vet } from '@/types/icu/chart'
import { Cat, Dog, Stethoscope, User, Star } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

type PatientButtonProps = {
  icuIoData: IcuSidebarIoData
  vetsListData: Vet[]
}

export default function PatientButton({
  icuIoData,
  vetsListData,
}: PatientButtonProps) {
  const { vets, patient } = icuIoData
  const hasUrgency = typeof vets?.urgency === 'number'

  const { push } = useRouter()
  const { hos_id, target_date, patient_id } = useParams()

  const SpeciesIcon = patient.species === 'canine' ? Dog : Cat
  const vetName = vetsListData.find(
    (vet) => vet.user_id === vets?.main_vet,
  )?.name

  const handlePatientButtonClick = () => {
    push(`/hospital/${hos_id}/icu/${target_date}/chart/${patient.patient_id}`)
  }

  const selectedPatient = patient.patient_id === patient_id

  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(
        'w-full',
        selectedPatient && 'border border-black bg-muted shadow-md',
        hasUrgency ? 'pb-8 pt-7' : 'py-7',
      )}
      onClick={handlePatientButtonClick}
    >
      <div
        className={cn(
          'flex w-full flex-col justify-between',
          icuIoData.out_date && 'text-muted-foreground line-through',
        )}
      >
        {hasUrgency && (
          <div className="flex justify-end">
            {[...Array(vets?.urgency)].map((_, index) => (
              <Star
                key={index}
                style={{ width: 8, height: 8 }}
                className="fill-yellow-500 text-yellow-500"
              />
            ))}
          </div>
        )}

        <div className="mb-1 flex justify-between gap-2">
          {/* 환자명 */}
          <span className="flex items-center gap-1 text-sm">
            <SpeciesIcon />
            {patient.name}
          </span>

          {/* 품종 */}
          <span className="max-w-[96px] truncate text-xs leading-5">
            {convertPascalCased(patient.breed)}
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
            <span className="truncate">{patient.owner_name || '미지정'}</span>
          </span>
        </div>
      </div>
    </Button>
  )
}
