import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { type Dispatch, type SetStateAction } from 'react'
import CalculatorResult from '../../result/calculator-result'
import FactorToolTip from '../rer-mer-factor-tool-tip'

type Props = {
  localWeight: string
  setLocalWeight: Dispatch<SetStateAction<string>>
  factor: string
  setFactor: Dispatch<SetStateAction<string>>
  rer?: number
  result?: number
}

export default function MerForm({
  localWeight,
  setLocalWeight,
  factor,
  setFactor,
  rer,
  result,
}: Props) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <div className="relative">
          <Label htmlFor="weight">체중</Label>
          <Input
            autoComplete="off"
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
          <Label htmlFor="rer">RER</Label>
          <Input
            type="number"
            id="rer"
            className="mt-1"
            value={rer ?? ''}
            readOnly
            disabled
            placeholder="RER"
          />
          <span className="absolute bottom-2 right-2 text-sm text-muted-foreground">
            kcal/day
          </span>
        </div>

        <div>
          <Label htmlFor="factor" className="flex items-center gap-2">
            Life Stage Factor
            <FactorToolTip />
          </Label>
          <Input
            type="number"
            id="factor"
            className="mt-1"
            value={factor}
            onChange={(e) => setFactor(e.target.value)}
            placeholder="인자"
          />
        </div>
      </div>

      {result && (
        <CalculatorResult
          displayResult={
            <span className="font-bold text-primary">
              {result.toFixed(0).toString()} kcal/day
            </span>
          }
          copyResult={`${result.toFixed(0).toString()} kcal/day`}
        />
      )}
    </div>
  )
}
