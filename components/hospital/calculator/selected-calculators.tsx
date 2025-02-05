import FluidRateCalculator from '@/components/hospital/calculator/fluid-rate/fluid-rate-calculator'
import { type SelectedCalculator } from '@/types/hospital/calculator'
import { type PatientWithWeight } from '@/types/patients'

type SelectedCalculatorsProps = {
  selectedCalculator: SelectedCalculator
  patientData: PatientWithWeight | null
}

export default function SelectedCalculators({
  selectedCalculator,
  patientData,
}: SelectedCalculatorsProps) {
  return (
    <div className="flex-1 p-2">
      {selectedCalculator === 'fluid-rate' && (
        <FluidRateCalculator patientData={patientData} />
      )}
    </div>
  )
}
