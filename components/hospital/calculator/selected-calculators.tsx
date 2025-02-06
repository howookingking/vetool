import Cri from '@/components/hospital/calculator/cri/cri'
import FluidRateCalculator from '@/components/hospital/calculator/fluid-rate/fluid-rate-calculator'
import RerMerCalculator from '@/components/hospital/calculator/rer-mer/rer-mer-calculator'
import VitalCounter from '@/components/hospital/calculator/vital-counter/vital-counter'
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
    <div className="flex-1">
      {selectedCalculator === 'fluid-rate' && (
        <FluidRateCalculator patientData={patientData} />
      )}
      {selectedCalculator === 'rer-mer' && (
        <RerMerCalculator patientData={patientData} />
      )}
      {selectedCalculator === 'counter' && <VitalCounter />}

      {/* {selectedCalculator === 'cri' && <Cri />} */}
    </div>
  )
}
