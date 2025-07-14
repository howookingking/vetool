import { getPatientById } from '@/lib/services/checklist/get-checklist-data-client'
import { useEffect, useState } from 'react'
import { Cat, Dog } from 'lucide-react'
import { calculateAge, convertPascalCased } from '@/lib/utils/utils'
type Props = {
  patientId: string | null
}
export default function ChecklistPatientInfo({ patientId }: Props) {
  const [patient, setPatient] = useState<any | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (patientId) {
        const pdata = await getPatientById(patientId)
        if (pdata) setPatient(pdata)
      }
    }
    fetchData()
  })
  return patient ? (
    <div className="flex items-center gap-1 sm:gap-2">
      {patient.species === 'canine' ? <Dog size={20} /> : <Cat size={20} />}
      <span>{patient.name}</span>·
      <span className="w-12 truncate sm:w-auto">
        {convertPascalCased(patient.breed)}
      </span>
      ·<span className="uppercase">{patient.gender}</span>·
      <span>{calculateAge(patient.birth)} </span>
    </div>
  ) : (
    <div className="flex items-center gap-1 sm:gap-2">
      {' '}
      환자가 등록되지 않았습니다.
    </div>
  )
}
