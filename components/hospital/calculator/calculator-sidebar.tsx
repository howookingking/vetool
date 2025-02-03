import React, { Dispatch, SetStateAction } from 'react'
import {
  CALCULATORS,
  type SelectedCalculator,
} from './calculator-sheet-content'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/utils'

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
