import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import CalculatorResult from '../../result/calculator-result'

type Props = {
  weight: string
  setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function BicarbonateCri({ weight, setIsSheetOpen }: Props) {
  const { patient_id } = useParams()
  const hasSelectedPatient = Boolean(patient_id)

  const [baseExcess, setBaseExcess] = useState('10')
  const [localWeight, setLocalWeight] = useState(weight)

  const result = 0.3 * Number(localWeight) * Number(baseExcess)

  return (
    <AccordionItem value="bicarbonate">
      <AccordionTrigger>Sodium Bicarbonate (HCO3 = 1 mEq/ml)</AccordionTrigger>

      <AccordionContent className="space-y-4 px-1">
        <div className="grid grid-cols-2 gap-2">
          <div className="relative">
            <Label htmlFor="weight">체중 </Label>
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

          <div className="relative">
            <Label htmlFor="baseExcess">Base Excess(Base Deficit) 절대값</Label>
            <Input
              type="number"
              id="baseExcess"
              className="mt-1"
              value={baseExcess}
              onChange={(e) => setBaseExcess(e.target.value)}
              placeholder="BE"
            />
            <span className="absolute bottom-2 right-2 text-sm text-muted-foreground">
              mEq/L
            </span>
          </div>
        </div>

        {Number(result) > 0 && (
          <CalculatorResult
            displayResult={
              <div>
                Sodium Bicarbonate{' '}
                <span className="font-bold text-primary">{result}ml</span> 의
                1/3~1/2{' '}
                <span className="font-bold text-primary">
                  ({result / 3}~{result / 2}ml)
                </span>
                을 <span className="font-bold text-primary">2~6시간</span> 동안
                공급
              </div>
            }
            copyResult={`Sodium Bicarbonate ${result}ml 의 1/3~1/2(${result / 3}~${result / 2}ml)을 2~6시간동안 공급 `}
            hasInsertOrderButton={hasSelectedPatient}
            setIsSheetOpen={setIsSheetOpen}
          />
        )}
      </AccordionContent>
    </AccordionItem>
  )
}
