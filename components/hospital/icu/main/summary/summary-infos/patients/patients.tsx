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
import { cn } from '@/lib/utils/utils'
import { SummaryData } from '@/types/icu/summary'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react'
import { Label, LabelList, Pie, PieChart } from 'recharts'
import Species from './species'

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
    <Card className="relative col-span-3 flex flex-col md:col-span-1">
      <CardHeader className="pb-0">
        <CardTitle>환자수</CardTitle>
        <VisuallyHidden>
          <CardDescription />
        </VisuallyHidden>
      </CardHeader>

      <Species summaryData={summaryData} />

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
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
              innerRadius={40}
              strokeWidth={5}
            >
              <LabelList
                dataKey="patient"
                className={cn('pointer-events-none fill-background')}
                stroke="none"
                fontSize={14}
                formatter={(value: keyof typeof chartConfig) =>
                  `${chartConfig[value]?.label}(${
                    chartData.find((item) => item.patient === value)?.count
                  })`
                }
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

function dailyPatientChange(prevCount: number, todayCount: number) {
  if (prevCount === 0) {
    return <div>전날 환자가 없었습니다</div>
  }

  if (prevCount === todayCount) {
    return <div>전날과 환자수가 동일합니다</div>
  }

  if (prevCount < todayCount) {
    return (
      <div className="flex items-center gap-1">
        전날보다 {todayCount - prevCount}마리 증가하였습니다
        <TrendingUpIcon size={16} className="text-red-500" />
      </div>
    )
  }

  if (prevCount > todayCount) {
    return (
      <div className="flex items-center gap-1">
        전날보다 {prevCount - todayCount}마리 감소하였습니다
        <TrendingDownIcon size={16} className="text-blue-500" />
      </div>
    )
  }
}
