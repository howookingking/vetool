import { Button } from '@/components/ui/button'
import type { IcuSidebarPatient } from '@/lib/services/icu/icu-layout'
import { cn, convertPascalCased } from '@/lib/utils/utils'
import type { Vet } from '@/types'
import { CatIcon, DogIcon, StethoscopeIcon, UserIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import UrgencyStarts from './urgency-stars'

type Props = {
  icuIoData: IcuSidebarPatient
  vetList: Vet[]
}

export default function PatientButton({ icuIoData, vetList }: Props) {
  const { vets, patient, urgency } = icuIoData

  const { push } = useRouter()
  const { hos_id, target_date, patient_id } = useParams()

  const SpeciesIcon = patient.species === 'canine' ? DogIcon : CatIcon
  const vetName = vetList.find((vet) => vet.user_id === vets?.main_vet)?.name

  const handlePatientButtonClick = () => {
    push(`/hospital/${hos_id}/icu/${target_date}/chart/${patient.patient_id}`)
  }

  const selectedPatient = patient.patient_id === patient_id

  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(
        'relative w-full py-7',
        selectedPatient && 'border border-black bg-muted shadow-md',
      )}
      onClick={handlePatientButtonClick}
    >
      <UrgencyStarts urgency={urgency} />

      <div
        className={cn(
          'flex w-full flex-col justify-between',
          icuIoData.out_date && 'text-muted-foreground line-through',
        )}
      >
        <div className="mb-1 flex justify-between gap-2">
          <span className="flex items-center gap-1 text-sm">
            <SpeciesIcon />
            {patient.name}
          </span>

          <span className="max-w-[96px] truncate text-xs leading-5">
            {convertPascalCased(patient.breed)}
          </span>
        </div>

        <div className="flex justify-between gap-2">
          <span className="text- ml-[2px] flex items-center gap-1 text-xs">
            <StethoscopeIcon style={{ width: 12, height: 12 }} />
            {vetName ?? '미지정'}
          </span>

          <span className="flex items-center gap-1 truncate text-xs">
            <UserIcon style={{ width: 12, height: 12 }} />
            <span className="truncate">{patient.owner_name || '미지정'}</span>
          </span>
        </div>
      </div>
    </Button>
  )
}
