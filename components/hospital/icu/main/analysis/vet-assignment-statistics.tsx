'use client'

import React, { useMemo } from 'react'
import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, XAxis, YAxis } from 'recharts'

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
import { IcuAnalysisData } from '@/types/icu/analysis'

const chartConfig = {
  main_vet_count: {
    label: '주치의',
    color: 'hsl(var(--chart-1))',
  },
  sub_vet_count: {
    label: '부주치의',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig

export default function VetAssignmentStatistics({
  analysisData,
}: {
  analysisData: IcuAnalysisData[]
}) {
  const chartData = useMemo(() => {
    const vetCounts = analysisData.reduce(
      (acc, item) => {
        const { main_vet, sub_vet } = item

        if (!acc[main_vet.name]) {
          acc[main_vet.name] = { main_vet_count: 0, sub_vet_count: 0 }
        }

        if (sub_vet.name && !acc[sub_vet.name]) {
          acc[sub_vet.name] = { main_vet_count: 0, sub_vet_count: 0 }
        }

        acc[main_vet.name].main_vet_count += 1
        if (sub_vet.name) acc[sub_vet.name].sub_vet_count += 1

        return acc
      },
      {} as Record<string, { main_vet_count: number; sub_vet_count: number }>,
    )

    return Object.entries(vetCounts).map(([vet_id, counts]) => ({
      vet_id,
      main_vet_count: counts.main_vet_count,
      sub_vet_count: counts.sub_vet_count,
    }))
  }, [analysisData])

  return (
    <Card>
      <CardHeader>
        <CardTitle>환자 담당 통계</CardTitle>
        <CardDescription>주치의별 주치의-부주치의 담당 통계</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[500px]">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 50,
              right: 20,
              top: 20,
              bottom: 20,
            }}
          >
            <YAxis
              dataKey="vet_id"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />

            <XAxis type="number" />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar
              dataKey="main_vet_count"
              fill="var(--color-main_vet_count)"
              radius={[0, 5, 5, 0]}
            />
            <Bar
              dataKey="sub_vet_count"
              fill="var(--color-sub_vet_count)"
              radius={[0, 5, 5, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          주치의별 주치의/부주치의 배정 현황 <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter> */}
    </Card>
  )
}
