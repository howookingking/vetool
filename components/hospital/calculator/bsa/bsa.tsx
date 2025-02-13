import BsaToolTip from '@/components/hospital/calculator/bsa/bsa-tool-tip'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { calculateBsa } from '@/lib/calculators/bsa'
import { type PatientFormData } from '@/types/hospital/calculator'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { useEffect, useState } from 'react'
import CalculatorResult from '../calculator-result'

export default function Bsa({ weight }: { weight: string }) {
  const [result, setResult] = useState<number | null>(null)
  const [formData, setFormData] = useState<PatientFormData>({
    weight: weight,
  })

  useEffect(() => {
    if (weight) {
      setFormData({
        weight: weight ?? '0',
      })
    }
  }, [weight])

  useEffect(() => {
    if (formData.weight) {
      setResult(calculateBsa(Number(formData.weight)))
    }
  }, [formData.weight, formData.species])

  const handleCopyButtonClick = () => {
    if (result) {
      navigator.clipboard.writeText(result.toString())
    }
  }

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

      <div className="space-y-2">
        <Label>체중 (kg)</Label>
        <Input
          type="number"
          placeholder="체중을 입력하세요"
          value={formData.weight}
          className="w-1/2"
          onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
        />
      </div>

      {result !== null && result >= 0 && (
        <CalculatorResult
          result={result.toString()}
          unit="m²"
          onClick={handleCopyButtonClick}
        />
      )}
    </div>
  )
}
