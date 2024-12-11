'use client'

import IoPatientsCalendar from '@/components/hospital/icu/main/analysis/io-patients/io-patients-calendar'
import IoPatientsGroupSelect from '@/components/hospital/icu/main/analysis/io-patients/io-patients-group-select'
import IoPatientsVetSelect from '@/components/hospital/icu/main/analysis/io-patients/io-patients-vet-select'
import { Button } from '@/components/ui/button'
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
import {
  calculateDailyAverage,
  calculateTotals,
  filterIoPatients,
  groupDataByDate,
} from '@/lib/utils/analysis'
import { IcuAnalysisData } from '@/types/icu/analysis'
import { format } from 'date-fns'
import { Dispatch, SetStateAction, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'

const chartConfig = {
  views: {
    label: '입원 환자 수',
  },
  all: {
    label: '전체',
    color: 'hsl(var(--chart-1))',
  },
  canine: {
    label: 'Canine',
    color: 'hsl(var(--chart-2))',
  },
  feline: {
    label: 'Feline',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig

export default function IoPatientsStatistics({
  analysisData,
  setStartDate,
  setEndDate,
  groups,
  vets,
}: {
  analysisData: IcuAnalysisData[]
  setStartDate: Dispatch<SetStateAction<string>>
  setEndDate: Dispatch<SetStateAction<string>>
  groups: string[]
  vets: string[]
}) {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)
  const [selectedVet, setSelectedVet] = useState<string | null>(null)
  const [activeChart, setActiveChart] =
    useState<keyof typeof chartConfig>('all')
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 7)),
    to: new Date(),
  })

  const filteredData = filterIoPatients(
    analysisData,
    selectedGroup,
    selectedVet,
  )
  const groupedByDateData = groupDataByDate(filteredData)
  const uniquePatientsTotal = calculateTotals(filteredData)
  const dailyAverages = calculateDailyAverage(groupedByDateData, dateRange)

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range)

    if (range?.from && range?.to) {
      setStartDate(format(range.from, 'yyyy-MM-dd'))
      setEndDate(format(range.to, 'yyyy-MM-dd'))
    }
  }

  return (
    <Card className="m-2">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>입원 환자 통계</CardTitle>
          <CardDescription>{`기간 내 일일 평균: ${dailyAverages[activeChart].toLocaleString()}마리`}</CardDescription>
        </div>

        <div className="flex items-center space-x-4 p-4">
          <IoPatientsCalendar
            dateRange={dateRange}
            handleDateRangeChange={handleDateRangeChange}
          />
          <IoPatientsGroupSelect
            groups={groups}
            selectedGroup={selectedGroup}
            setSelectedGroup={setSelectedGroup}
          />
          <IoPatientsVetSelect
            vets={vets}
            selectedVet={selectedVet}
            setSelectedVet={setSelectedVet}
          />
        </div>

        <div className="flex">
          {['all', 'canine', 'feline'].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <Button
                key={chart}
                variant="outline"
                data-active={activeChart === chart}
                className="flex h-full flex-1 flex-col items-center justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {uniquePatientsTotal[
                    key as keyof typeof uniquePatientsTotal
                  ].toLocaleString()}
                </span>
              </Button>
            )
          })}
        </div>
      </CardHeader>

      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="mt-4 aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={groupedByDateData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={6}
              minTickGap={1}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString('ko-KR', {
                  month: 'short',
                  day: 'numeric',
                })
              }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('ko-KR', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  }}
                />
              }
            />
            <Line
              dataKey={activeChart}
              type="monotone"
              stroke={`var(--color-${activeChart})`}
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
