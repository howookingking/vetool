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
import type { SummaryData } from '@/types/icu/summary'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts'

const chartConfig = {
  count: {
    label: '환자수',
    color: 'hsl(var(--chart-1)',
  },
} satisfies ChartConfig

export default function Urgency({
  summaryData,
}: {
  summaryData: SummaryData[]
}) {
  const currentPatient = summaryData.filter(
    (item) => item.icu_io.out_date === null,
  )

  const threeStars = currentPatient.filter((item) => item.urgency === 3).length
  const twoStars = currentPatient.filter((item) => item.urgency === 2).length
  const oneStar = currentPatient.filter((item) => item.urgency === 1).length
  const noStar = currentPatient.length - threeStars - twoStars - oneStar

  const chartData = [
    { urgency: '★3', count: threeStars, fill: 'hsl(var(--chart-4))' },
    { urgency: '★2', count: twoStars, fill: 'hsl(var(--chart-4))' },
    { urgency: '★1', count: oneStar, fill: 'hsl(var(--chart-4))' },
    { urgency: '★0', count: noStar, fill: 'hsl(var(--chart-4))' },
  ]
  return (
    <Card className="col-span-3 md:col-span-1">
      <CardHeader>
        <CardTitle>응급도</CardTitle>
        <VisuallyHidden>
          <CardDescription />
        </VisuallyHidden>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 28,
              right: 20,
            }}
          >
            <CartesianGrid horizontal={false} />

            <YAxis dataKey="urgency" type="category" hide />
            <XAxis dataKey="count" type="number" hide />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />

            <Bar
              dataKey="count"
              layout="vertical"
              fill="var(--color-count)"
              barSize={32}
              radius={4}
            >
              {/* 별 */}
              <LabelList
                dataKey="urgency"
                position="left"
                offset={10}
                className="fill-foreground font-mono"
                fontSize={14}
              />

              {/* 카운트 */}
              <LabelList
                dataKey="count"
                position="right"
                offset={10}
                className="fill-muted-foreground"
                fontSize={15}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
