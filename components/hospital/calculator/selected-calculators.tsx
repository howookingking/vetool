import React from 'react'
import { type SelectedCalculator } from './calculator-sheet-content'
import FluidRateCalculator from './fluid-rate/fluid-rate-calculator'

export default function SelectedCalculators({
  selectedCalculator,
}: {
  selectedCalculator: SelectedCalculator
}) {
  return (
    <div className="flex-1 p-2">
      {selectedCalculator === 'fluid-rate' && <FluidRateCalculator />}
    </div>
  )
}
