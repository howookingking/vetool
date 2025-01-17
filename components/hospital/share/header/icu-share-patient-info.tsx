'use client'

import { calculateAge, convertPascalCased } from '@/lib/utils/utils'
import { SelectedChartPatient } from '@/types/icu/chart'
import { Cat, Dog } from 'lucide-react'

export default function IcuSharePatientInfo({
  patientData,
  weight,
  weightMeasuredDate,
}: {
  patientData: SelectedChartPatient
  weight: string
  weightMeasuredDate: string
}) {
  const { name, breed, gender, species, birth } = patientData

  return (
    <div
      className="mx-auto inline-flex w-fit items-center justify-center gap-2 px-2 font-semibold md:text-sm 2xl:text-base"
      data-helper="patient-info"
    >
      {species === 'canine' ? <Dog size={20} /> : <Cat size={20} />}
      <span>{name}</span>·
      <span className="truncate sm:w-auto">{convertPascalCased(breed)}</span>·
      <span className="uppercase">{gender}</span>·
      <span>{calculateAge(birth)} </span>
      <span>·</span>
      <span>
        {weight === '' ? '체중 미입력' : `${weight}kg`}
        <span className="hidden md:inline">
          {weightMeasuredDate ? `(${weightMeasuredDate})` : ''}
        </span>
      </span>
    </div>
  )
}
