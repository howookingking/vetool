import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function DateRagneSelect({
  timeRange,
  onChange,
}: {
  timeRange: string
  onChange: (value: string) => void
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="name" className="text-left">
        조회 기간
      </Label>
      <Select defaultValue={timeRange} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="1">1개월</SelectItem>
            <SelectItem value="2">2개월</SelectItem>
            <SelectItem value="3">3개월</SelectItem>
            <SelectItem value="6">6개월</SelectItem>
            <SelectItem value="12">1년</SelectItem>
            <SelectItem value="all">전체</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
