import { TooltipProps } from 'recharts'
import {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent'

type VitalDataPoint = {
  date: string
  value: number
  vitalName: string
}

export default function VitalChartTooltip({
  active,
  payload,
}: TooltipProps<ValueType, NameType>) {
  if (!active || !payload || !payload.length) {
    return null
  }

  const data = payload[0].payload as VitalDataPoint

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="flex flex-col gap-1">
        <div>
          <span className="pr-2 text-muted-foreground">날짜:</span>
          <span className="font-medium">{data.date}</span>
        </div>

        <div>
          <span className="pr-2 text-muted-foreground">{`${data.vitalName}:`}</span>
          <span className="font-medium">{data.value}</span>
        </div>
      </div>
    </div>
  )
}
