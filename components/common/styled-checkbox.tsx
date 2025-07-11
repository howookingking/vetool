import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'

type Props = {
  checked: boolean
  onCheckedChange?: (checked: boolean) => void
}

export default function StyledCheckbox({ checked, onCheckedChange }: Props) {
  return (
    <Label className="flex cursor-pointer items-center gap-2 rounded-lg border p-3 hover:bg-accent/50 has-[[aria-checked=true]]:border-primary has-[[aria-checked=true]]:bg-teal-50">
      <Checkbox
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="data-[state=checked]:bg-primary"
      />
      <p className="text-sm font-medium leading-none">테두리 표시</p>
    </Label>
  )
}
