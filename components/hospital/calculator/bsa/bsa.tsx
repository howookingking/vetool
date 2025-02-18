import BsaToolTip from '@/components/hospital/calculator/bsa/bsa-tool-tip'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { useState } from 'react'
import CalculatorResult from '../result/calculator-result'

export default function Bsa({ weight }: { weight: string }) {
  const [localWeight, setLocalWeight] = useState(weight)

  const result =
    localWeight !== '' &&
    Number((0.1 * Math.pow(Number(localWeight), 2 / 3)).toFixed(2))

  return (
    <div className="flex flex-col gap-4">
      <SheetHeader>
        <SheetTitle className="flex items-center gap-2">
          BSA
          <BsaToolTip />
        </SheetTitle>
        <VisuallyHidden>
          <SheetDescription />
        </VisuallyHidden>
      </SheetHeader>

      <div className="relative w-1/2">
        <Label htmlFor="weight">체중</Label>
        <Input
          type="number"
          id="weight"
          className="mt-1"
          value={localWeight}
          onChange={(e) => setLocalWeight(e.target.value)}
          placeholder="체중"
        />
        <span className="absolute bottom-2 right-2 text-sm text-muted-foreground">
          kg
        </span>
      </div>

      {result && (
        <CalculatorResult
          displayResult={
            <span className="font-bold text-primary">
              {result} m<sup>2</sup>
            </span>
          }
          copyResult={`${result.toString()} m²`}
        />
      )}
    </div>
  )
}
