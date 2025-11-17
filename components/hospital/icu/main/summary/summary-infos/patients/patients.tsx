'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { dailyPatientChange } from '@/lib/utils/icu-summary-utils'
import { cn } from '@/lib/utils/utils'
import { SummaryData } from '@/types/icu/summary'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { Label, LabelList, Pie, PieChart } from 'recharts'
import SpeciesCount from './species-count'

type Props = {
  summaryData: SummaryData[]
  targetDate: string
  prevSummaryCount: number
}

export default function Patients({
  summaryData,
  targetDate,
  prevSummaryCount,
}: Props) {
  const totalPatientCount = summaryData.length
  const newPatientCount = summaryData.filter(
    (item) =>
      item.icu_io.in_date === targetDate && item.icu_io.out_date === null,
  ).length
  const outPatientCount = summaryData.filter(
    (item) => item.icu_io.out_date !== null,
  ).length

  const chartData = [
    {
      patient: 'extend',
      count: totalPatientCount - newPatientCount - outPatientCount,
      fill: 'hsl(var(--chart-1))',
    },
    { patient: 'new', count: newPatientCount, fill: 'hsl(var(--chart-2))' },
    { patient: 'out', count: outPatientCount, fill: 'hsl(var(--chart-3))' },
  ]

  return (
    <Card className="relative col-span-1 flex flex-col rounded-none">
      <CardHeader className="pb-0">
        <CardTitle>환자수</CardTitle>
        <VisuallyHidden>
          <CardDescription />
        </VisuallyHidden>
      </CardHeader>

      <SpeciesCount summaryData={summaryData} />

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-1/2"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="patient"
              innerRadius="40%"
            >
              <LabelList
                dataKey="patient"
                className={cn('pointer-events-none fill-background')}
                stroke="none"
                fontSize={14}
                formatter={(value: keyof typeof chartConfig) => {
                  // 퇴원 환자가 0마리인경우 표시 x
                  if (
                    value === 'out' &&
                    chartData.find((item) => item.patient === value)?.count ===
                      0
                  ) {
                    return
                  }
                  return `${chartConfig[value]?.label}(${
                    chartData.find((item) => item.patient === value)?.count
                  })`
                }}
              />

              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalPatientCount.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          마리
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col text-sm font-medium leading-none">
        {dailyPatientChange(prevSummaryCount, totalPatientCount)}
      </CardFooter>
    </Card>
  )
}

const chartConfig = {
  extend: {
    label: '연장',
    color: 'var(--chart-1)',
  },
  new: {
    label: '신규',
    color: 'var(--chart-2)',
  },
  out: {
    label: '퇴원',
    color: 'var(--chart-3)',
  },
} satisfies ChartConfig
