import ResuscitationToolTip from '@/components/hospital/calculator/fluid-rate/resuscitation/resuscitation-tool-tip'
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
import { calculateResuscitation } from '@/lib/calculators/fluid-rate'
import { type Species } from '@/types/hospital/calculator'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { useState } from 'react'

type Props = {
  weight: string
  species?: string
  handleLocalWeightChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export default function ResuscitationTab({
  species,
  weight,
  handleLocalWeightChange,
}: Props) {
  const [localSpecies, setLocalSpecies] = useState(species ?? 'canine')

  const result = calculateResuscitation(localSpecies as Species, weight)

  return (
    <div className="flex flex-col gap-4">
      <SheetHeader>
        <SheetTitle className="flex items-center gap-2">
          <span>Resuscitation</span>
          <ResuscitationToolTip />
        </SheetTitle>
        <VisuallyHidden>
          <SheetDescription />
        </VisuallyHidden>
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
      </div>

      {result && (
        <CalculatorResult
          displayResult={
            <span className="font-bold text-primary">
              {result.min} ~ {result.max}mL
            </span>
          }
          copyResult={`${result.min}mL ~ ${result.max}mL`}
          comment="Buffered Isotonic 수액을 15~30분간 주입해주세요."
        />
      )}
    </div>
  )
}
