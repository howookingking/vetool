import Bsa from '@/components/hospital/calculator/bsa/bsa'
import Cri from '@/components/hospital/calculator/cri/cri'
import FluidRateCalculator from '@/components/hospital/calculator/fluid-rate/fluid-rate-calculator'
import RerMerCalculator from '@/components/hospital/calculator/rer-mer/rer-mer-calculator'
import VitalCounter from '@/components/hospital/calculator/vital-counter/vital-counter'
import { type SelectedCalculator } from '@/types/hospital/calculator'
import { type PatientWithWeight } from '@/types/patients'

type Props = {
  selectedCalculator: SelectedCalculator
  patientData: PatientWithWeight | null
}

export default function SelectedCalculators({
  selectedCalculator,
  patientData,
}: Props) {
  return (
    <div className="h-full">
      {selectedCalculator === 'counter' && <VitalCounter />}

      {selectedCalculator === 'fluid-rate' && (
        <FluidRateCalculator patientData={patientData} />
      )}

      {selectedCalculator === 'rer-mer' && (
        <RerMerCalculator patientData={patientData} />
      )}

      {selectedCalculator === 'cri' && (
        <Cri weight={patientData?.vital?.body_weight ?? ''} />
      )}
      {selectedCalculator === 'bsa' && (
        <Bsa weight={patientData?.vital?.body_weight ?? ''} />
      )}

      {/* {selectedCalculator === 'chocolate' && (
        <Chocolate weight={patientData?.vital?.body_weight ?? ''} />
      )} */}
    </div>
  )
}
