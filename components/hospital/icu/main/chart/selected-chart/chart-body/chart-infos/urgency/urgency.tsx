import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useSafeRefresh } from '@/hooks/use-realtime-refresh'
import { updateUrgency } from '@/lib/services/icu/chart/update-icu-chart-infos'
import { SirenIcon, StarIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

type Props = {
  urgency: number | null
  icuChartId: string
}

export default function Urgency({ urgency, icuChartId }: Props) {
  const safeRefresh = useSafeRefresh()

  const [isUpdating, setIsUpdating] = useState(false)

  const handleUpdateUrgency = async (value: string) => {
    setIsUpdating(true)

    await updateUrgency(icuChartId, Number(value))

    toast.success('응급도를 변경하였습니다')

    setIsUpdating(false)

    safeRefresh()
  }

  return (
    <div className="relative flex items-center">
      <Label
        className="absolute left-2 text-xs text-muted-foreground"
        htmlFor="urgency"
      >
        <SirenIcon size={16} className="text-muted-foreground" />
      </Label>

      <Select
        value={urgency !== null ? String(urgency) : ''}
        onValueChange={handleUpdateUrgency}
        disabled={isUpdating}
      >
        <SelectTrigger
          className="w-full pl-8 text-muted-foreground"
          showCaret={false}
        >
          <SelectValue placeholder="응급도">
            {urgency ? (
              <div className="flex items-center gap-0.5">
                {Array(urgency)
                  .fill(0)
                  .map((_, index) => (
                    <StarIcon
                      key={index}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
              </div>
            ) : (
              <span className="text-muted-foreground">응급도</span>
            )}
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          {URGENCY.map((urgency) => (
            <SelectItem key={urgency.value} value={String(urgency.value)}>
              {!urgency.value ? (
                <span>미지정</span>
              ) : (
                <div className="flex items-center gap-0.5">
                  {Array(urgency.value)
                    .fill(0)
                    .map((_, index) => (
                      <StarIcon
                        key={index}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                </div>
              )}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

const URGENCY = [
  { label: '없음', value: 0 },
  { label: 1, value: 1 },
  { label: 2, value: 2 },
  { label: 3, value: 3 },
] as const
