import VitalChartDateTick from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-center/vital-chart/vital-chart-date-tick'
import VitalChartTooltip from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-center/vital-chart/vital-chart-tooltip'
import { ChartContainer, ChartTooltip } from '@/components/ui/chart'
import { CHART_CONFIG } from '@/constants/hospital/icu/chart/vital'
import type { VitalChartData } from '@/types/icu/chart'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts'

export default function VitalChartContent({
  formattedData,
  displayCount,
  handleBarClick,
  currentVital,
  inDate,
}: {
  formattedData: VitalChartData[]
  displayCount: number
  handleBarClick: (value: any) => void
  currentVital: string
  inDate: string
}) {
  const barColor = Object.values(CHART_CONFIG).find(
    (item) => item.label === currentVital,
  )?.color

  return (
    <ChartContainer config={CHART_CONFIG} className="h-[70vh] w-full">
      <BarChart
        data={formattedData}
        margin={{
          top: 42,
          left: 30,
          bottom: 32,
        }}
        barSize={48}
      >
        <CartesianGrid vertical={false} />

        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={14}
          tick={
            <VitalChartDateTick
              x={0}
              y={0}
              payload={{ value: '' }}
              inDate={inDate}
            />
          }
        />

        <ChartTooltip cursor={false} content={<VitalChartTooltip />} />
        <Bar
          dataKey="value"
          fill={barColor}
          radius={8}
          cursor="pointer"
          onClick={(value) => handleBarClick(value)}
          isAnimationActive={false}
        >
          {displayCount <= 15 && (
            <LabelList
              dataKey="value"
              position="top"
              offset={12}
              className="fill-foreground"
              fontSize={16}
              formatter={(value: number) => `${value}`}
            />
          )}
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}
