import { FEEDBACK_CATEGORY_ENUM } from '@/components/hospital/feedback/feedback-form-schema'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function FeedbackFilter({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>유저 피드백</CardTitle>
        <CardDescription />
      </CardHeader>

      <CardContent>
        <div className="flex items-center space-x-4">
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-[288px]">
              <SelectValue placeholder="피드백 카테고리 선택" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem key={'all'} value={'all'}>
                {'전체'}
              </SelectItem>

              {FEEDBACK_CATEGORY_ENUM.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
