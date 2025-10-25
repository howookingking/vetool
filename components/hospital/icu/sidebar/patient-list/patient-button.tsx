import SpeciesToIcon from '@/components/common/species-to-icon'
import { Button } from '@/components/ui/button'
import type { IcuSidebarPatient } from '@/lib/services/icu/icu-layout'
import { cn, convertPascalCased } from '@/lib/utils/utils'
import type { Vet } from '@/types'
import type { Species } from '@/types/hospital/calculator'
import { StethoscopeIcon, UserIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import UrgencyStarts from './urgency-stars'

type Props = {
  icuIoData: IcuSidebarPatient
  vetList: Vet[]
  hosId: string
  targetDate: string
}

export default function PatientButton({
  icuIoData,
  vetList,
  hosId,
  targetDate,
}: Props) {
  const { vets, patient, urgency } = icuIoData

  const { push } = useRouter()
  const { patient_id } = useParams()

  const vetName = vetList.find((vet) => vet.user_id === vets?.main_vet)?.name

  const selectedPatient = patient.patient_id === patient_id

  const handlePatientButtonClick = () =>
    push(`/hospital/${hosId}/icu/${targetDate}/chart/${patient.patient_id}`)

  const isPatientNew = icuIoData.in_date === targetDate

  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(
        'relative w-full px-2 py-6 text-xs',
        selectedPatient && 'border border-black bg-muted shadow-md',
      )}
      onClick={handlePatientButtonClick}
    >
      {isPatientNew && (
        <span className="pointer-events-none absolute -top-1.5 left-0 -rotate-12 select-none text-[10px] font-semibold tracking-tight text-primary">
          new
        </span>
      )}
      <UrgencyStarts urgency={urgency} />

      <div
        className={cn(
          'flex w-full flex-col justify-between gap-1',
          icuIoData.out_date && 'text-muted-foreground',
        )}
      >
        <div className="flex items-end justify-between gap-2">
          <div className="flex items-center gap-1 text-sm">
            <SpeciesToIcon species={patient.species as Species} size={16} />
            {patient.name}
          </div>
          <div className="max-w-[96px] truncate">
            {convertPascalCased(patient.breed)}
          </div>
        </div>

        <div className="flex justify-between gap-2">
          <div className="ml-0.5 flex items-center gap-0.5">
            <StethoscopeIcon style={{ width: 12, height: 12 }} />
            {vetName ?? '미지정'}
          </div>
          <div className="flex items-center gap-0.5 truncate">
            <UserIcon style={{ width: 12, height: 12 }} />
            <div className="truncate">{patient.owner_name || '미지정'}</div>
          </div>
        </div>
      </div>
    </Button>
  )
}
