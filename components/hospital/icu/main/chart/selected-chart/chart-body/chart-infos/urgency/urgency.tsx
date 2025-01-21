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

export default function Urgency({
  urgency,
  icuChartId,
}: {
  urgency: number | null
  icuChartId: string
}) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [localUrgency, setLocalUrgency] = useState(urgency)

  const handleUpdateUrgency = async (value: string) => {
    if (urgency === Number(value)) return

    setIsUpdating(true)
    await updateUrgency(icuChartId, Number(value))
    setLocalUrgency(Number(value))
    toast({
      title: '응급도를 변경하였습니다',
    })

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
        defaultValue={localUrgency ? String(localUrgency) : undefined}
        onValueChange={handleUpdateUrgency}
        disabled={isUpdating}
      >
        <SelectTrigger
          className="w-full pl-8 text-muted-foreground"
          showCaret={false}
        >
          <SelectValue placeholder="응급도" className="text-muted-foreground">
            {localUrgency && (
              <div className="flex items-center gap-0.5">
                {Array(Number(localUrgency))
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
              </div>
            )}
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          {[1, 2, 3].map((value) => (
            <SelectItem key={value} value={String(value)}>
              <div className="flex items-center gap-0.5">
                {Array(value)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
