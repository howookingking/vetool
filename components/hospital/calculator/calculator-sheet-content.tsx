import CalculatorSidebar from '@/components/hospital/calculator/calculator-sidebar'
import SelectedCalculators from '@/components/hospital/calculator/selected-calculators'
import SelectedPatient from '@/components/hospital/calculator/selected-patient'
import UpgragePromptModal from '@/components/hospital/common/upgrade-prompt-modal'
import { SheetContent } from '@/components/ui/sheet'
import useIsMobile from '@/hooks/use-is-mobile'
import { type SelectedCalculator } from '@/types/hospital/calculator'
import { type PatientWithWeight } from '@/types/patients'
import { useState } from 'react'

type Props = {
  patientData: PatientWithWeight | null
  setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>
  isCalculatorEnabled: boolean
}

export default function CalculatorSheetContent({
  patientData,
  setIsSheetOpen,
  isCalculatorEnabled,
}: Props) {
  const isMobile = useIsMobile()

  const [selectedCalculator, setSelectedCalculator] =
    useState<SelectedCalculator>('counter')

  return (
    <SheetContent
      className="flex w-full flex-col gap-0 overflow-auto p-0 md:w-2/3 md:flex-row xl:w-[820px]"
      noCloseButton={!isMobile}
    >
      <CalculatorSidebar
        selectedCalculator={selectedCalculator}
        setSelectedCalculator={setSelectedCalculator}
      />

      <div className="flex h-full w-full flex-col justify-between gap-2 p-3">
        <SelectedCalculators
          selectedCalculator={selectedCalculator}
          patientData={patientData}
          setIsSheetOpen={setIsSheetOpen}
        />

        {patientData && <SelectedPatient patientData={patientData} />}
      </div>

      {!isCalculatorEnabled && (
        <UpgragePromptModal onExit={() => setIsSheetOpen(false)} />
      )}
    </SheetContent>
  )
}
