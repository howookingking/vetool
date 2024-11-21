import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export default function DrugDoseUnitRadio({
  drugTotalUnit,
  setDrugTotalUnit,
}: {
  drugTotalUnit: string
  setDrugTotalUnit: (value: string) => void
}) {
  return (
    <RadioGroup
      defaultValue={drugTotalUnit}
      onValueChange={setDrugTotalUnit}
      className="mt-6 flex shrink-0"
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value={'ml'} id="ml" />
        <Label className="text-xs" htmlFor="ml">
          ml
        </Label>
      </div>

      <div className="flex items-center space-x-2">
        <RadioGroupItem value={'ul'} id="ul" />
        <Label className="text-xs" htmlFor="ul">
          ul
        </Label>
      </div>
    </RadioGroup>
  )
}
