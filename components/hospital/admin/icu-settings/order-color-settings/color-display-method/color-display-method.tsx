import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export default function OrderColorDisplayMethod({
  handleOrderColorDisplayMethod,
  localColorDisplayMethod,
}: {
  handleOrderColorDisplayMethod: (method: string) => void
  localColorDisplayMethod: string
}) {
  return (
    <section className="space-y-2">
      <h3 className="font-semibold">오더색상 표시방법</h3>
      <RadioGroup
        value={localColorDisplayMethod}
        onValueChange={handleOrderColorDisplayMethod}
        className="flex gap-10"
      >
        <div className="flex items-center gap-1">
          <RadioGroupItem value="full" id="full" />
          <Label htmlFor="full">기본</Label>
        </div>
        <div className="flex items-center gap-1">
          <RadioGroupItem value="dot" id="dot" />
          <Label htmlFor="dot">포인트</Label>
        </div>
      </RadioGroup>
    </section>
  )
}
