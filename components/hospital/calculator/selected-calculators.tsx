import Bsa from '@/components/hospital/calculator/bsa/bsa'
import Cri from '@/components/hospital/calculator/cri/cri'
import FluidRateCalculator from '@/components/hospital/calculator/fluid-rate/fluid-rate-calculator'
import RerMerCalculator from '@/components/hospital/calculator/rer-mer/rer-mer-calculator'
import VitalCounter from '@/components/hospital/calculator/vital-counter/vital-counter'
import type { SelectedCalculator } from '@/constants/hospital/icu/calculator/calculator'
import type { PatientWithWeight } from '@/lib/services/patient/patient'
import Kcl from './kcl/kcl'

type Props = {
  selectedCalculator: SelectedCalculator
  patientData: PatientWithWeight | null
  setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SelectedCalculators({
  selectedCalculator,
  patientData,
  setIsSheetOpen,
}: Props) {
  return (
    <div className="h-full">
      {selectedCalculator === 'counter' && <VitalCounter />}

      {selectedCalculator === 'fluid-rate' && (
        <FluidRateCalculator patientData={patientData} />
      )}

      {selectedCalculator === 'kcl' && (
        <Kcl
          weight={patientData?.vital?.body_weight ?? ''}
          setIsSheetOpen={setIsSheetOpen}
        />
      )}

      {selectedCalculator === 'rer-mer' && (
        <RerMerCalculator
          weight={patientData?.vital?.body_weight ?? ''}
          setIsSheetOpen={setIsSheetOpen}
        />
      )}

      {selectedCalculator === 'cri' && (
        <Cri
          weight={patientData?.vital?.body_weight ?? ''}
          setIsSheetOpen={setIsSheetOpen}
        />
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
