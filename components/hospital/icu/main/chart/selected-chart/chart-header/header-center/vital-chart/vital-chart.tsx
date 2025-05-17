import NoResultSquirrel from '@/components/common/no-result-squirrel'
import VitalChartContent from '@/components/hospital/icu/main/chart/selected-chart/chart-header/header-center/vital-chart/vital-chart-content'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { ChartableVital } from '@/constants/hospital/icu/chart/vital-chart'
import { purifyVitalValue } from '@/lib/utils/vital-chart'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import type { VitalChartData, VitalData } from '@/types/icu/chart'
import { type Dispatch, type SetStateAction, useMemo } from 'react'

type Props = {
  selectedVital: ChartableVital
  inDate: string
  chartableVitals: Record<string, VitalData[]>
  displayCount: number
  setDisplayCount: Dispatch<SetStateAction<number>>
}

export default function VitalChart({
  selectedVital,
  inDate,
  chartableVitals,
  displayCount,
  setDisplayCount,
}: Props) {
  const {
    basicHosData: { baselineTime },
  } = useBasicHosDataContext()

  // 차트 데이터 포맷 변환 및 정렬
  const formattedSelectedVitalData: VitalChartData[] = useMemo(() => {
    const selectedVitalArray = chartableVitals[selectedVital]

    if (!selectedVitalArray) return []

    return selectedVitalArray
      .map((item) => {
        const value = purifyVitalValue(selectedVital, item.icu_chart_tx_result)
        const date = `${item.target_date} ${`${((item.time - 1 + baselineTime) % 24).toString().padStart(2, '0')}:00`}`

        if (isNaN(value) || !date) return null

        return {
          date,
          value,
          vitalId: item.icu_chart_tx_id,
          vitalName: selectedVital,
        }
      })
      .filter((item) => item !== null)
      .slice(0, displayCount)
      .reverse()
  }, [selectedVital, chartableVitals, displayCount, baselineTime])

  const hasMoreData =
    (chartableVitals[selectedVital] ?? []).length > displayCount

  return (
    <div className="flex h-full w-full justify-center">
      {formattedSelectedVitalData.length === 0 && (
        <NoResultSquirrel
          text="분석할 데이터가 없습니다"
          size="lg"
          className="h-full flex-col"
        />
      )}

      {formattedSelectedVitalData.length > 0 && (
        <Card className="h-full w-full border-0 shadow-none">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <CardTitle className="flex h-8 items-center gap-2">
                  {selectedVital} 변화 추이
                  {hasMoreData && (
                    <Button
                      variant="default"
                      onClick={() => {
                        setDisplayCount((prev) => prev + 10)
                      }}
                      size="sm"
                    >
                      더보기
                    </Button>
                  )}
                </CardTitle>
                <CardDescription>
                  최근 {formattedSelectedVitalData.length}개의 데이터
                  {selectedVital === '호흡수' && (
                    <span className="pl-1 text-muted-foreground">
                      (panting은 200으로 표시됩니다)
                    </span>
                  )}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <VitalChartContent
              formattedSelectedVitalData={formattedSelectedVitalData}
              displayCount={displayCount}
              selectedVital={selectedVital}
              inDate={inDate}
            />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
