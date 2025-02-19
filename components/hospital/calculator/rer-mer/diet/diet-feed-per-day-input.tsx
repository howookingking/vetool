import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { type Dispatch, type SetStateAction } from 'react'

type Props = {
  feedPerDay: string
  setFeedPerDay: Dispatch<SetStateAction<string>>
  disabled?: boolean
}

export default function DietFeedPerDayInput({
  feedPerDay,
  setFeedPerDay,
  disabled,
}: Props) {
  const handleFeedPerDayChange = (value: string) => {
    setFeedPerDay(value)
  }

  return (
    <div className="w-full space-y-2">
      <Label className="font-semibold">급여 횟수</Label>
      <Select value={feedPerDay} onValueChange={handleFeedPerDayChange}>
        <SelectTrigger className="w-full" disabled={disabled}>
          <SelectValue placeholder="회" />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: 24 }, (_, i) => (
            <SelectItem key={i + 1} value={(i + 1).toString()}>
              {i + 1} 회
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
