import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Dispatch, SetStateAction } from 'react'

type DietFeedPerDayInputProps = {
  feedPerDay: string
  setFeedPerDay: Dispatch<SetStateAction<string>>
}

export default function DietFeedPerDayInput({
  feedPerDay,
  setFeedPerDay,
}: DietFeedPerDayInputProps) {
  const handleFeedPerDayChange = (value: string) => {
    setFeedPerDay(value)
  }

  return (
    <div className="w-full space-y-2">
      <Label className="font-semibold">급여 횟수</Label>
      <Select value={feedPerDay} onValueChange={handleFeedPerDayChange}>
        <SelectTrigger className="w-full">
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
