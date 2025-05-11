import VitalChartDateTick from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-center/vital-chart/vital-chart-date-tick'
import VitalChartTooltip from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-center/vital-chart/vital-chart-tooltip'
import { ChartContainer, ChartTooltip } from '@/components/ui/chart'
import {
  CHART_CONFIG,
  type ChartableVital,
} from '@/constants/hospital/icu/chart/vital-chart'
import type { VitalChartData } from '@/types/icu/chart'
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from 'recharts'

type Props = {
  formattedSelectedVitalData: VitalChartData[]
  displayCount: number
  selectedVital: ChartableVital
  inDate: string
}

export default function VitalChartContent({
  formattedSelectedVitalData,
  displayCount,
  selectedVital,
  inDate,
}: Props) {
  const barColor = Object.values(CHART_CONFIG).find(
    (item) => item.label === selectedVital,
  )?.color

  return (
    <ChartContainer config={CHART_CONFIG} className="h-[70vh] w-full">
      <LineChart
        data={formattedSelectedVitalData}
        margin={{
          top: 42,
          left: 88,
          bottom: 32,
          right: 48,
        }}
      >
        <CartesianGrid vertical={false} />

        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={14}
          tick={
            <VitalChartDateTick
              x={16}
              y={16}
              payload={{ value: '' }}
              inDate={inDate}
            />
          }
        />

        <ChartTooltip cursor={false} content={<VitalChartTooltip />} />
        <Line
          type="monotone"
          dataKey="value"
          stroke={barColor}
          strokeWidth={3}
          dot={{ r: 4, fill: barColor }}
          activeDot={{ r: 6 }}
          isAnimationActive={false}
        >
          {displayCount <= 50 && (
            <LabelList
              dataKey="value"
              position="top"
              offset={12}
              className="fill-foreground"
              fontSize={14}
              formatter={(value: number) => `${value}`}
            />
          )}
        </Line>
      </LineChart>
    </ChartContainer>
  )
}
