'use client'
import { getPatientById } from '@/lib/services/checklist/get-checklist-data-client'
import { useEffect, useState } from 'react'
import { Cat, Dog } from 'lucide-react'
import { calculateAge, convertPascalCased } from '@/lib/utils/utils'
import { kgToBsa } from '@/lib/calculators/checklist-calculators'
import { Checklist } from '@/types'
type Props = {
  patientId: string | null
  checklistdata?: Checklist
}
export default function ChecklistPatientInfo({
  patientId,
  checklistdata,
}: Props) {
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
    <div className="m-3 flex items-center gap-1 sm:gap-2">
      {patient.species === 'canine' ? <Dog size={20} /> : <Cat size={20} />}
      <span>{patient.name}</span>·
      <span className="w-12 truncate sm:w-auto">
        {convertPascalCased(patient.breed)}
      </span>
      ·<span className="uppercase">{patient.gender}</span>·
      <span>{calculateAge(patient.birth)} </span>
      {checklistdata && checklistdata.weight ? (
        <span className="text-xs sm:text-sm">
          {checklistdata.weight}kg(
          {kgToBsa(checklistdata.weight, patient.species)}m²)
        </span>
      ) : (
        <span className="text-xs sm:text-sm">등록된 몸무게가 없습니다.</span>
      )}
    </div>
  ) : (
    <div className="flex items-center gap-1 sm:gap-2">
      {' '}
      환자가 등록되지 않았습니다.
    </div>
  )
}
