'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import type { SummaryData } from '@/types/icu/summary'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts'

export default function MainVet({
  summaryData,
}: {
  summaryData: SummaryData[]
}) {
  const {
    basicHosData: { vetList },
  } = useBasicHosDataContext()

  const inHosPatients = summaryData.filter(
    (item) => item.icu_io.out_date === null && item.main_vet !== null,
  )

  // main_vet별로 그룹화하여 count 계산
  const vetCountMap = inHosPatients.reduce<Record<string, number>>(
    (acc, item) => {
      const vetId = item.main_vet!
      acc[vetId] = (acc[vetId] || 0) + 1
      return acc
    },
    {},
  )

  // chartData 형태로 변환
  const chartData = Object.entries(vetCountMap).map(([vetName, count]) => ({
    vetName: vetList.find((item) => item.user_id === vetName)?.name,
    count,
  }))

  return (
    <Card className="col-span-3 rounded-none md:col-span-1">
      <CardHeader>
        <CardTitle>주치의</CardTitle>
        <VisuallyHidden>
          <CardDescription />
        </VisuallyHidden>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="vetName" tickLine={false} axisLine={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Bar
              dataKey="count"
              fill="hsl(var(--chart-6)"
              radius={4}
              barSize={32}
            >
              {/* 카운트 */}
              <LabelList
                dataKey="count"
                position="insideTop"
                offset={12}
                className="fill-background"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

const chartConfig = {
  count: {
    label: '환자수',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig
