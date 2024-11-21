'use client'

import { Pie, PieChart } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { IcuAnalysisData } from '@/types/icu/analysis'
import { useMemo } from 'react'

const colors = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
]

export default function GroupByStatistics({
  analysisData,
}: {
  analysisData: IcuAnalysisData[]
}) {
  const { chartData, chartConfig } = useMemo(() => {
    const ioIdSet = new Set()
    const groupCounts = analysisData
      .filter((item) => {
        const duplicate = ioIdSet.has(item.icu_io.icu_io_id)
        ioIdSet.add(item.icu_io.icu_io_id)

        return !duplicate
      })

      .reduce(
        (acc, item) => {
          const { group_list } = item.icu_io
          group_list.forEach((group) => {
            acc[group] = (acc[group] || 0) + 1
          })
          return acc
        },
        {} as Record<string, number>,
      )

    const data = Object.entries(groupCounts).map(([group, counts], index) => ({
      group,
      counts,
      fill: colors[index % colors.length],
    }))

    const config = Object.fromEntries(
      data.map(({ group, fill }) => [
        group,
        {
          label: group,
          color: fill,
        },
      ]),
    ) as ChartConfig

    return { chartData: data, chartConfig: config }
  }, [analysisData])

  return (
    <Card className="ml-1 mr-2 flex flex-col">
      <CardHeader className="pb-0">
        <CardTitle>병과별 환자 통계</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[500px]"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="counts"
              nameKey="group"
              label={(entry) => entry.counts}
            />
            <ChartLegend
              content={<ChartLegendContent nameKey="group" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
