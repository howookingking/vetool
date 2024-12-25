import NoResultSquirrel from '@/components/common/no-result-squirrel'
import UpdateVitalDialog from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-center/vital-chart/update-vital-dialog'
import VitalChartTooltip from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-center/vital-chart/vital-chart-tooltip'
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
} from '@/components/ui/chart'
import { getWeightData } from '@/lib/services/icu/chart/vitals'
import type { VitalChartData } from '@/types/icu/chart'
import { format } from 'date-fns'
import { useEffect, useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts'

export default function VitalChartContent({
  currentVital,
  patientId,
}: {
  currentVital: string
  patientId: string
}) {
  const [vitalData, setVitalData] = useState<Record<string, any[]>>({})
  const [displayCount, setDisplayCount] = useState(10)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedVitalData, setSelectedVitalData] =
    useState<VitalChartData | null>(null)

  useEffect(() => {
    const fetchVitalData = async () => {
      // 이미 페칭한 데이터가 존재하면 early return
      if (vitalData[currentVital]) return

      let fetchedVitalData: any[] = []

      switch (currentVital) {
        case '체중':
          fetchedVitalData = await getWeightData(patientId)
          break
      }

      setVitalData((prev) => ({
        ...prev,
        [currentVital]: fetchedVitalData,
      }))
    }

    fetchVitalData()
  }, [currentVital, patientId, vitalData])

  // 차트 데이터 포맷 변환 및 정렬 (최신순)
  const formattedData = useMemo(() => {
    if (!vitalData[currentVital]) return []

    return vitalData[currentVital]
      .map((item) => ({
        date: format(new Date(item.created_at), 'yyyy-MM-dd HH:mm'),
        value: parseFloat(item.body_weight),
        vitalId: item.vital_id,
      }))
      .slice(0, displayCount)
      .reverse()
  }, [currentVital, vitalData, displayCount])

  const hasMoreData = (() => {
    return (vitalData[currentVital] || []).length > displayCount
  })()

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 10)
  }

  const chartConfig = {
    weight: {
      label: '체중',
      color: 'hsl(var(--chart-1))',
    },
  } satisfies ChartConfig

  const handleBarClick = (vitalData: VitalChartData) => {
    setSelectedVitalData(vitalData)
    setIsDialogOpen(true)
  }

  return (
    <div className="flex-1 p-4">
      {formattedData.length > 0 ? (
        <>
          <Card className="h-[640px]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{currentVital} 변화 추이</CardTitle>
                  <CardDescription>
                    과거부터 최신까지 {formattedData.length}개의 데이터
                  </CardDescription>
                </div>

                {hasMoreData && (
                  <div className="mt-2">
                    <Button
                      variant="outline"
                      onClick={handleLoadMore}
                      size="lg"
                    >
                      더보기
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[560px]">
                <BarChart
                  data={formattedData}
                  margin={{
                    top: 42,
                    left: 30,
                    bottom: 32,
                  }}
                  barSize={36}
                >
                  <CartesianGrid vertical={false} />

                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    fontSize={16}
                    tickMargin={14}
                  />

                  <ChartTooltip
                    cursor={false}
                    content={<VitalChartTooltip />}
                  />
                  <Bar
                    dataKey="value"
                    fill="var(--color-weight)"
                    radius={8}
                    cursor="pointer"
                    onClick={(value) => handleBarClick(value)}
                  >
                    <LabelList
                      dataKey="value"
                      position="top"
                      offset={12}
                      className="fill-foreground"
                      fontSize={16}
                      formatter={(value: number) => `${value}kg`}
                    />
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <UpdateVitalDialog
            currentVital={currentVital}
            patientId={patientId}
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            vitalId={selectedVitalData?.vitalId}
            defaultValue={selectedVitalData?.value?.toString()}
          />
        </>
      ) : (
        <div className="flex h-[560px] items-center justify-center">
          <NoResultSquirrel text="분석할 데이터가 없습니다" size="lg" />
        </div>
      )}
    </div>
  )
}
