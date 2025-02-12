import BsaToolTip from '@/components/hospital/calculator/bsa/bsa-tool-tip'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { calculateBsa } from '@/lib/calculators/bsa'
import { type PatientFormData, type Species } from '@/types/hospital/calculator'
import { type PatientWithWeight } from '@/types/patients'
import { useEffect, useState } from 'react'
import CalculatorResult from '../calculator-result'

export default function Bsa({
  patientData,
}: {
  patientData: PatientWithWeight | null
}) {
  const [result, setResult] = useState<number | null>(null)
  const [formData, setFormData] = useState<PatientFormData>({
    species: (patientData?.patient.species as Species) ?? 'canine',
    weight: patientData?.vital?.body_weight ?? '',
  })

  useEffect(() => {
    if (patientData) {
      setFormData({
        species: patientData.patient.species as Species,
        weight: patientData.vital?.body_weight ?? '0',
      })
    }
  }, [patientData])

  useEffect(() => {
    if (formData.weight) {
      setResult(calculateBsa(formData.species, Number(formData.weight)))
    }
  }, [formData.weight, formData.species])

  const handleCopyButtonClick = () => {
    if (result) {
      navigator.clipboard.writeText(result.toString())
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          BSA 계산
          <BsaToolTip />
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-2">
        <div className="space-y-4">
          <Label>종 선택</Label>
          <RadioGroup
            defaultValue={formData.species}
            orientation="horizontal"
            className="flex"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="canine" id="canine" />
              <Label htmlFor="canine">Canine</Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="feline" id="feline" />
              <Label htmlFor="feline">Feline</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>체중 (kg)</Label>
          <Input
            type="number"
            placeholder="체중을 입력하세요"
            value={formData.weight}
            onChange={(e) =>
              setFormData({ ...formData, weight: e.target.value })
            }
          />
        </div>
      </CardContent>

      <CardContent className="pt-4">
        {result !== null && result >= 0 && (
          <CalculatorResult
            result={result.toString()}
            unit="m²"
            onClick={handleCopyButtonClick}
          />
        )}
      </CardContent>
    </Card>
  )
}
