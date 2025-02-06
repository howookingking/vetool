import MerTab from '@/components/hospital/calculator/rer-mer/mer/mer-tab'
import { type PatientFormData, type Species } from '@/types/hospital/calculator'
import { type PatientWithWeight } from '@/types/patients'
import { useEffect, useState } from 'react'

export default function RerMerCalculator({
  patientData,
}: {
  patientData: PatientWithWeight | null
}) {
  const [formData, setFormData] = useState<PatientFormData>({
    species: (patientData?.patient.species as Species) ?? 'canine',
    weight: patientData?.vital?.body_weight ?? '',
    factor: '1',
  })

  useEffect(() => {
    if (patientData) {
      setFormData({
        species: patientData.patient.species as Species,
        weight: patientData.vital?.body_weight ?? '0',
        factor: '1',
      })
    }
  }, [patientData])

  return <MerTab formData={formData} setFormData={setFormData} />
}
