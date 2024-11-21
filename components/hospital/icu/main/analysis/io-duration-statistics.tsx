'use client'

import { IcuAnalysisData } from '@/types/icu/analysis'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts'

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

type ChartData = {
  ioDuration: number
  count: number
}

const chartConfig = {
  ioDuration: {
    label: '입원 환자 수',
  },
  count: {
    label: '환자 수',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig

const calculateStayDurations = (
  IcuAnalysisData: IcuAnalysisData[],
): ChartData[] => {
  const durationCounts: Record<number, number> = {}
  const seenIoIds = new Set()

  const stayDurations = IcuAnalysisData
    // io_id 기준으로 중복 제거
    .filter((data) => {
      const isDuplicate = seenIoIds.has(data.icu_io.icu_io_id)
      seenIoIds.add(data.icu_io.icu_io_id)
      return !isDuplicate
    })
    // out_date가 있는 데이터만 필터링
    .filter((data) => data.icu_io.out_date)
    .map(({ icu_io }) => {
      const inDate = new Date(icu_io.in_date)
      const outDate = new Date(icu_io.out_date!)

      // 퇴원일 - 입원일 + 1 (당일 포함)
      return (
        Math.round(
          (outDate.getTime() - inDate.getTime()) / (1000 * 60 * 60 * 24),
        ) + 1
      )
    })

  stayDurations.forEach((duration) => {
    durationCounts[duration] = (durationCounts[duration] || 0) + 1
  })

  return Object.entries(durationCounts)
    .map(([duration, count]) => ({
      ioDuration: parseInt(duration),
      count: count,
    }))
    .sort((a, b) => a.ioDuration - b.ioDuration)
}

export default function IoDurationStatistics({
  analysisData,
}: {
  analysisData: IcuAnalysisData[]
}) {
  const chartData = calculateStayDurations(analysisData)

  return (
    <Card className="ml-2 mr-1 mt-2">
      <CardHeader>
        <CardTitle>입원 환자 통계</CardTitle>
        <CardDescription>
          지난 한 달간의 입원 기간 - 입원환자 수
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[500px]">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="ioDuration"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => `${value}일`}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="ioDuration"
                />
              }
            />
            <Bar dataKey="count" fill="var(--color-count)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
    </Card>
  )
}
