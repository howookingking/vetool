import SpeciesToIcon from '@/components/common/species-to-icon'
import type { Species } from '@/constants/hospital/register/signalments'
import type { PatientWithWeight } from '@/lib/services/patient/patient'
import { calculateAge, convertPascalCased } from '@/lib/utils/utils'

export default function SelectedPatient({
  patientData,
}: {
  patientData: PatientWithWeight
}) {
  return (
    <div className="flex justify-center rounded-none border-2 border-primary py-2 animate-in">
      <div className="flex items-center gap-1 sm:gap-2">
        <SpeciesToIcon species={patientData.patient.species as Species} />
        <div>
          <span>{patientData.patient.name}</span>
        </div>
        ·
        <span className="w-12 truncate sm:w-auto">
          {convertPascalCased(patientData.patient.breed)}
        </span>
        ·<span className="uppercase">{patientData.patient.gender}</span>·
        <span>{calculateAge(patientData.patient.birth)} </span>
        <span>·</span>
        <span>
          {patientData.vital?.body_weight === ''
            ? '체중 입력'
            : `${patientData.vital?.body_weight}kg`}
        </span>
      </div>
    </div>
  )
}
