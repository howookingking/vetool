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
import { VITALS } from '@/constants/hospital/icu/chart/vital'
import { parseVitalValue } from '@/lib/utils/analysis'
import { type VitalChartData, type VitalData } from '@/types/icu/chart'
import { useEffect, useMemo, useState } from 'react'

type Props = {
  currentVital: string
  inDate: string
  vitalData: Record<string, VitalData[]>
}

export default function VitalChart({ currentVital, inDate, vitalData }: Props) {
  const initialLength =
    VITALS.find((vital) => vital.title === currentVital)?.initialLength || 10

  const [displayCount, setDisplayCount] = useState<number>(initialLength)

  useEffect(() => {
    setDisplayCount(initialLength)
  }, [currentVital, initialLength])

  // 차트 데이터 포맷 변환 및 정렬
  const formattedData: VitalChartData[] = useMemo(() => {
    if (!vitalData[currentVital]) return []

    return vitalData[currentVital]
      .map((item) => {
        const value = parseVitalValue(currentVital, item)
        const date = `${item?.target_date ?? ''} ${
          item?.time ? `${item.time.toString().padStart(2, '0')}:00` : ''
        }`

        if (isNaN(value) || !date) return null

        return {
          date,
          value,
          vitalId: item.icu_chart_tx_id,
          vitalName: item.icu_chart_order_name || '체중',
        }
      })
      .filter((item) => item !== null)
      .slice(0, displayCount)
      .reverse()
  }, [currentVital, vitalData, displayCount])

  const hasMoreData = (vitalData[currentVital] || []).length > displayCount

  const handleLoadMore = () => {
    setDisplayCount((prev: number) => prev + initialLength)
  }

  return (
    <div className="flex h-full w-full justify-center">
      {formattedData.length > 0 ? (
        <Card className="h-full w-full border-0 shadow-none">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <CardTitle className="flex h-8 items-center gap-2">
                  {currentVital} 변화 추이
                  {hasMoreData && (
                    <Button
                      variant="default"
                      onClick={handleLoadMore}
                      size="sm"
                    >
                      더보기
                    </Button>
                  )}
                </CardTitle>
                <CardDescription>
                  최근 {formattedData.length}개의 데이터
                  {currentVital === '호흡수' && (
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
              formattedData={formattedData}
              displayCount={displayCount}
              currentVital={currentVital}
              inDate={inDate}
            />
          </CardContent>
        </Card>
      ) : (
        <NoResultSquirrel
          text="분석할 데이터가 없습니다"
          size="lg"
          className="h-full flex-col"
        />
      )}
    </div>
  )
}
