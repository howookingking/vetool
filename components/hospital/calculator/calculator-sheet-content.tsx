import CalculatorSidebar from '@/components/hospital/calculator/calculator-sidebar'
import SelectedCalculators from '@/components/hospital/calculator/selected-calculators'
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { getPatientData } from '@/lib/services/patient/patient'
import { type PatientWithWeight } from '@/types/patients'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import PatientDetailInfo from '../common/patient/patient-detail-info'
import { formatDate } from '@/lib/utils/utils'
import { Card } from '@/components/ui/card'

export const CALCULATORS = [
  {
    value: 'fluid-rate',
    label: '수액속도',
  },
  {
    value: 'rer-der',
    label: 'RER / MER',
  },
  {
    value: 'counter',
    label: '바이탈카운터',
  },
  {
    value: 'cri',
    label: 'CRI',
  },
] as const

export type SelectedCalculator = (typeof CALCULATORS)[number]['value']

export default function CalculatorSheetContent() {
  const { patient_id } = useParams()

  const [patientData, setPatientData] = useState<PatientWithWeight | null>(null)

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const patientData = await getPatientData(patient_id as string)
        setPatientData(patientData)
      } catch (error) {
        console.error('환자 데이터를 불러오는데 실패했습니다:', error)
      }
    }

    if (patient_id) {
      fetchPatientData()
    }
  }, [patient_id])

  const [selectedCalculator, setSelectedCalculator] =
    useState<(typeof CALCULATORS)[number]['value']>('fluid-rate')

  console.log(patientData)

  return (
    <SheetContent className="flex w-1/2 gap-0 p-0" noCloseButton>
      <VisuallyHidden>
        <SheetHeader>
          <SheetTitle />
          <SheetDescription />
        </SheetHeader>
      </VisuallyHidden>

      <CalculatorSidebar
        selectedCalculator={selectedCalculator}
        setSelectedCalculator={setSelectedCalculator}
      />

      <div className="flex w-full flex-col justify-between p-2">
        <SelectedCalculators selectedCalculator={selectedCalculator} />

        {patientData && (
          <Card className="mt-auto flex items-end justify-center gap-2 py-2">
            <PatientDetailInfo
              species={patientData.patient.species}
              name={patientData.patient.name}
              breed={patientData.patient.breed}
              gender={patientData.patient.gender}
              birth={patientData.patient.birth}
              weight={patientData.vital.body_weight ?? '0'}
              weightMeasuredDate={formatDate(
                new Date(patientData.vital.created_at),
              )}
            />
          </Card>
        )}
      </div>
    </SheetContent>
  )
}
