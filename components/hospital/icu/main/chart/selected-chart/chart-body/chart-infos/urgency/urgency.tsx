import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import { updateUrgency } from '@/lib/services/icu/chart/update-icu-chart-infos'
import { Siren, Star } from 'lucide-react'
import { useEffect, useState } from 'react'

const URGENCY = [
  { label: '없음', value: 0 },
  { label: 1, value: 1 },
  { label: 2, value: 2 },
  { label: 3, value: 3 },
]

export default function Urgency({
  urgency,
  icuChartId,
}: {
  urgency: number | null
  icuChartId: string
}) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [localUrgency, setLocalUrgency] = useState<number | null>(urgency)

  const handleUpdateUrgency = async (value: string) => {
    const numValue = Number(value)
    if (urgency === numValue) return

    setIsUpdating(true)
    await updateUrgency(icuChartId, numValue)

    setLocalUrgency(numValue !== 0 ? numValue : null)

    toast({ title: '응급도를 변경하였습니다' })
    setIsUpdating(false)
  }

  useEffect(() => {
    setLocalUrgency(urgency)
  }, [urgency])

  return (
    <div className="relative flex items-center">
      <Label
        className="absolute left-2 text-xs text-muted-foreground"
        htmlFor="urgency"
      >
        <Siren size={16} className="text-muted-foreground" />
      </Label>

      <Select
        value={localUrgency !== null ? String(localUrgency) : ''}
        onValueChange={handleUpdateUrgency}
        disabled={isUpdating}
      >
        <SelectTrigger
          className="w-full pl-8 text-muted-foreground"
          showCaret={false}
        >
          <SelectValue placeholder="응급도">
            {localUrgency ? (
              <div className="flex items-center gap-0.5">
                {Array(localUrgency)
                  .fill(0)
                  .map((_, index) => (
                    <Star
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
                <span>미등록</span>
              ) : (
                <div className="flex items-center gap-0.5">
                  {Array(urgency.value)
                    .fill(0)
                    .map((_, index) => (
                      <Star
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
