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
    <ul className="flex h-screen w-[200px] flex-col border-r">
      {CALCULATORS.map((calculator) => (
        <li key={calculator.value}>
          <Button
            className={cn(
              selectedCalculator === calculator.value && 'bg-muted',
              'w-full rounded-none',
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
