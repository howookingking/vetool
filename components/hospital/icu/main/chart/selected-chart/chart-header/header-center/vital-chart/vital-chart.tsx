import LargeLoaderCircle from '@/components/common/large-loader-circle'
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
import { getVitalTxData } from '@/lib/services/icu/chart/vitals'
import { parseVitalValue } from '@/lib/utils/analysis'
import type { VitalChartData, VitalData } from '@/types/icu/chart'
import { useEffect, useMemo, useState } from 'react'

export default function VitalChart({
  currentVital,
  patientId,
  inDate,
}: {
  currentVital: string
  patientId: string
  inDate: string
}) {
  const initialLength =
    VITALS.find((vital) => vital.title === currentVital)?.initialLength || 10

  const [isLoading, setIsLoading] = useState(false)
  const [vitalData, setVitalData] = useState<Record<string, VitalData[]>>({})
  const [displayCount, setDisplayCount] = useState<number>(initialLength)

  useEffect(() => {
    setDisplayCount(initialLength)

    const fetchVitalData = async () => {
      setIsLoading(true)

      if (vitalData[currentVital]) {
        setIsLoading(false)
        return
      }

      const fetchedVitalData = await getVitalTxData(patientId, inDate)
      const filteredVitalData = fetchedVitalData.filter((item) =>
        item.icu_chart_order_name?.includes(currentVital),
      )

      setVitalData((prev) => ({
        [currentVital]: filteredVitalData,
        ...prev,
      }))

      setIsLoading(false)
    }

    fetchVitalData()
  }, [currentVital, patientId, vitalData, inDate, initialLength])

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
    <div className="w-[calc(100%-160px)] flex-1 p-4">
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <LargeLoaderCircle />
        </div>
      ) : formattedData.length > 0 ? (
        <>
          <Card className="">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <CardTitle>{currentVital} 변화 추이</CardTitle>
                  <CardDescription>
                    최근 {formattedData.length}개의 데이터
                    {currentVital === '호흡수' && (
                      <span className="pl-1 text-muted-foreground">
                        (panting은 200으로 표시됩니다)
                      </span>
                    )}
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
              <VitalChartContent
                formattedData={formattedData}
                displayCount={displayCount}
                currentVital={currentVital}
                inDate={inDate}
              />
            </CardContent>
          </Card>
        </>
      ) : (
        <div className="flex h-full items-center justify-center">
          <NoResultSquirrel
            text="분석할 데이터가 없습니다"
            size="lg"
            className="flex-col"
          />
        </div>
      )}
    </div>
  )
}
