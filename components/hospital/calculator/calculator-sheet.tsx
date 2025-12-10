'use client'

import { Button } from '@/components/ui/button'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import { hasPermissions, type Plan } from '@/constants/company/plans'
import {
  getPatientData,
  type PatientWithWeight,
} from '@/lib/services/patient/patient'
import { CalculatorIcon, LoaderCircleIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import CalculatorSheetContentsDynamic from './calculator-sheet-contents-dynamic'
import { Spinner } from '@/components/ui/spinner'

export default function CalculatorSheet({ plan }: { plan: Plan }) {
  const { patient_id } = useParams()

  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [patientData, setPatientData] = useState<PatientWithWeight | null>(null)

  const isCalculatorEnabled = hasPermissions(plan, 'CALCULATOR')

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
        <Button size="icon" className="mr-1 h-8 w-8 rounded-full 2xl:mr-0">
          {isFetching ? <Spinner /> : <CalculatorIcon />}
        </Button>
      </SheetTrigger>

      <CalculatorSheetContentsDynamic
        patientData={patientData}
        setIsSheetOpen={setIsSheetOpen}
        isCalculatorEnabled={isCalculatorEnabled}
      />
    </Sheet>
  )
}
