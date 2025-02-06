import { Button } from '@/components/ui/button'
import { CALCULATORS } from '@/constants/hospital/icu/calculator/calcularor'
import { cn } from '@/lib/utils/utils'
import { type SelectedCalculator } from '@/types/hospital/calculator'
import { Dispatch, SetStateAction } from 'react'

type CalculatorSidebarProps = {
  selectedCalculator: SelectedCalculator
  setSelectedCalculator: Dispatch<SetStateAction<SelectedCalculator>>
}

export default function CalculatorSidebar({
  selectedCalculator,
  setSelectedCalculator,
}: CalculatorSidebarProps) {
  return (
    <ul className="mx-2 mb-2 mt-12 flex flex-row justify-between rounded-lg border sm:m-0 sm:w-[240px] sm:flex-col sm:justify-start">
      {CALCULATORS.map((calculator) => (
        <li key={calculator.value}>
          <Button
            className={cn(
              selectedCalculator === calculator.value && 'bg-muted',
              'text-md w-full rounded-none py-6',
            )}
            variant="ghost"
            onClick={() => setSelectedCalculator(calculator.value)}
          >
            {calculator.label}
          </Button>
        </li>
      ))}
    </ul>
  )
}
