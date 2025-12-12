import WarningMessage from '@/components/common/warning-message'
import MaintenanceToolTip from '@/components/hospital/calculator/fluid-rate/maintenance/maintenance-tool-tip'
import CalculatorResult from '@/components/hospital/calculator/result/calculator-result'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import type { Species } from '@/constants/hospital/register/signalments'
import { calculateMaintenanceRate } from '@/lib/calculators/fluid-rate'
import { getDaysSince } from '@/lib/utils/utils'
import type { CalcMethod, Fold } from '@/types/hospital/calculator'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { useState } from 'react'

type Props = {
  birth?: string
  species?: string
  weight: string
  handleLocalWeightChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export default function MaintenanceTab({
  birth,
  weight,
  species,
  handleLocalWeightChange,
}: Props) {
  const [localSpecies, setLocalSpecies] = useState(species ?? 'canine')
  const [calcMethod, setCalcMethod] = useState('a')
  const [fold, setFold] = useState<Fold>('1')

  const isPediatric = getDaysSince(birth ? birth : '1') <= 365

  const result = calculateMaintenanceRate(
    weight,
    localSpecies as Species,
    fold as Fold,
    calcMethod as CalcMethod,
  )

  return (
    <div className="flex flex-col gap-4">
      <SheetHeader>
        <SheetTitle className="flex items-center gap-2">
          <span>Maintenance</span>
          <MaintenanceToolTip />
        </SheetTitle>
        <VisuallyHidden>
          <SheetDescription />
        </VisuallyHidden>

        {isPediatric && (
          <WarningMessage
            className="text-sm"
            text="Pediatrics의 경우,  Adult Dog x 3, Adult Cat x 2.5"
          />
        )}
      </SheetHeader>

      <div className="grid grid-cols-2 gap-2">
        <div className="relative">
          <Label htmlFor="weight">체중</Label>
          <Input
            type="number"
            id="weight"
            className="mt-1"
            value={weight}
            onChange={handleLocalWeightChange}
            placeholder="체중"
          />
          <span className="absolute bottom-2 right-2 text-sm text-muted-foreground">
            kg
          </span>
        </div>

        <div>
          <Label htmlFor="species">종</Label>
          <Select onValueChange={setLocalSpecies} value={localSpecies}>
            <SelectTrigger className="mt-1" id="species">
              <SelectValue placeholder="종 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="canine">Canine</SelectItem>
              <SelectItem value="feline">Feline</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="calcMethod">계산법</Label>
          <Select onValueChange={setCalcMethod} value={calcMethod}>
            <SelectTrigger className="mt-1" id="calcMethod">
              <SelectValue placeholder="계산법" />
            </SelectTrigger>
            <SelectContent>
              {localSpecies === 'canine' ? (
                <>
                  <SelectItem value="a">
                    a. 132 x (몸무게)<sup>0.75</sup> mL/day
                  </SelectItem>
                  <SelectItem value="b">b. 60 mL/kg/day</SelectItem>
                  <SelectItem value="c">
                    c. 30 x (몸무게) + 70 mL/day
                  </SelectItem>
                </>
              ) : (
                <>
                  <SelectItem value="a">
                    a. 80 x (몸무게)<sup>0.75</sup> mL/day
                  </SelectItem>
                  <SelectItem value="b">b. 40 mL/kg/day</SelectItem>
                  <SelectItem value="c">
                    c. 30 x (몸무게) + 70 mL/day
                  </SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="fold">배수</Label>
          <Select
            value={fold}
            onValueChange={(value) => setFold(value as Fold)}
          >
            <SelectTrigger className="mt-1" id="fold">
              <SelectValue placeholder="배수" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1배수</SelectItem>
              <SelectItem value="1.5">1.5배수</SelectItem>
              <SelectItem value="2">2배수</SelectItem>
              <SelectItem value="2.5">2.5배수</SelectItem>
              <SelectItem value="3">3배수</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {result && (
        <CalculatorResult
          displayResult={
            <span className="font-bold text-primary">{result} mL/hr</span>
          }
          copyResult={`${result} mL/hr`}
        />
      )}
    </div>
  )
}
