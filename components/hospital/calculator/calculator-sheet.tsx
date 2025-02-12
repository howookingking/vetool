'use client'

import { Button } from '@/components/ui/button'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import { getPatientData } from '@/lib/services/patient/patient'
import { type PatientWithWeight } from '@/types/patients'
import { Calculator, LoaderCircle } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'
import { useState } from 'react'

const LazyCalculatorSheetContent = dynamic(
  () => import('@/components/hospital/calculator/calculator-sheet-content'),
  {
    ssr: false,
  },
)

export default function CalculatorSheet() {
  const { patient_id } = useParams()

  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [patientData, setPatientData] = useState<PatientWithWeight | null>(null)

  const fetchPatientData = async () => {
    setIsFetching(true)

    if (patient_id) {
      const patientData = await getPatientData(patient_id as string)
      setPatientData(patientData)
    }

    setIsFetching(false)
    setIsSheetOpen(true)
  }

  const handleOpenChange = (open: boolean) => {
    if (open) {
      fetchPatientData()
    } else {
      setIsSheetOpen(false)
      setPatientData(null)
    }
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button size="icon" className="mr-1 h-10 w-10 rounded-full 2xl:mr-0">
          {isFetching ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <Calculator />
          )}
        </Button>
      </SheetTrigger>

      <LazyCalculatorSheetContent patientData={patientData} />
    </Sheet>
  )
}
