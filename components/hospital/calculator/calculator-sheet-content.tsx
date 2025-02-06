import CalculatorSheetSkeleton from '@/components/hospital/calculator/calculator-sheet-skeleton'
import CalculatorSidebar from '@/components/hospital/calculator/calculator-sidebar'
import SelectedCalculators from '@/components/hospital/calculator/selected-calculators'
import PatientDetailInfo from '@/components/hospital/common/patient/patient-detail-info'
import { Card } from '@/components/ui/card'
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { getPatientData } from '@/lib/services/patient/patient'
import { formatDate } from '@/lib/utils/utils'
import { type SelectedCalculator } from '@/types/hospital/calculator'
import { type PatientWithWeight } from '@/types/patients'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type CalculatorSheetContentProps = {
  isSheetOpen: boolean
  isMobile: boolean
}

export default function CalculatorSheetContent({
  isSheetOpen,
  isMobile,
}: CalculatorSheetContentProps) {
  const { patient_id } = useParams()

  const [isLoading, setIsLoading] = useState(true)
  const [patientData, setPatientData] = useState<PatientWithWeight | null>(null)
  const [selectedCalculator, setSelectedCalculator] =
    useState<SelectedCalculator>('counter')

  useEffect(() => {
    const fetchPatientData = async () => {
      setIsLoading(true)
      try {
        if (patient_id) {
          const patientData = await getPatientData(patient_id as string)
          setPatientData(patientData)
        }
      } finally {
        setIsLoading(false)
      }
    }

    if (isSheetOpen) {
      fetchPatientData()
    }
    if (!isSheetOpen) {
      setPatientData(null)
      setIsLoading(true)
    }
  }, [patient_id, isSheetOpen])

  return (
    <SheetContent
      className="flex w-full flex-col gap-0 overflow-auto p-0 sm:flex-row 2xl:w-1/2"
      noCloseButton={!isMobile}
    >
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

      {isLoading ? (
        <CalculatorSheetSkeleton />
      ) : (
        <div className="flex h-full w-full flex-col justify-between p-2">
          <SelectedCalculators
            selectedCalculator={selectedCalculator}
            patientData={patientData}
          />

          {patientData && (
            <Card className="my-1 flex items-end justify-center rounded-md border-2 border-primary py-2">
              <PatientDetailInfo
                {...patientData.patient}
                weight={patientData.vital?.body_weight ?? ''}
                weightMeasuredDate={
                  patientData.vital?.created_at &&
                  formatDate(new Date(patientData.vital.created_at))
                }
              />
            </Card>
          )}
        </div>
      )}
    </SheetContent>
  )
}
