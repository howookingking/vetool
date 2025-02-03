import { Button } from '@/components/ui/button'
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import CalculatorSidebar from './calculator-sidebar'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { useState } from 'react'
import FluidRateCalculator from './fluid-rate/fluid-rate-calculator'
import SelectedCalculators from './selected-calculators'

export const CALCULATORS = [
  {
    value: 'fluid-rate',
    label: '수액속도',
  },
  {
    value: 'rer-der',
    label: 'RER / MER',
  },
  {
    value: 'counter',
    label: '바이탈카운터',
  },
  {
    value: 'cri',
    label: 'CRI',
  },
] as const

export type SelectedCalculator = (typeof CALCULATORS)[number]['value']

export default function CalculatorSheetContent() {
  const [selectedCalculator, setSelectedCalculator] =
    useState<(typeof CALCULATORS)[number]['value']>('fluid-rate')
  return (
    <SheetContent className="flex w-1/2 gap-0 p-0" noCloseButton>
      <VisuallyHidden>
        <SheetHeader>
          <SheetTitle />
          <SheetDescription />
        </SheetHeader>
      </VisuallyHidden>

      <CalculatorSidebar
        selectedCalculator={selectedCalculator}
        setSelectedCalculator={setSelectedCalculator}
      />

      <SelectedCalculators selectedCalculator={selectedCalculator} />
    </SheetContent>
  )
}
