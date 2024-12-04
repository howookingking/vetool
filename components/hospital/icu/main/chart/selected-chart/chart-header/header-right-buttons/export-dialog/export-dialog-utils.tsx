import ChartInfos from '@/components/hospital/icu/main/chart/selected-chart/chart-body/chart-infos/chart-infos'
import ChartTable from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table'
import { Badge } from '@/components/ui/badge'
import { toast } from '@/components/ui/use-toast'
import { getIcuChart } from '@/lib/services/icu/chart/get-icu-chart'
import { getIoDateRange } from '@/lib/services/icu/chart/get-io-date-range'
import { getIcuData } from '@/lib/services/icu/get-icu-data'
import { Json } from '@/lib/supabase/database.types'
import { BasicHosDataProvider } from '@/providers/basic-hos-data-context-provider'
import type { IcuOrderColors } from '@/types/adimin'
import type { IcuSidebarIoData, SelectedChart, Vet } from '@/types/icu/chart'
import html2canvas from 'html2canvas'
import React, { useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'

// 현재 화면 기준 ScrollWidth & ScrollHeight를 가진 HTMLCanvasElement를 생성
export const captureContent = async (element: HTMLElement) => {
  return await html2canvas(element, {
    width: element.scrollWidth,
    height: element.scrollHeight + 300,
    scale: 1.2,
    useCORS: true,
    allowTaint: true,
    logging: false,
  })
}

export const ExportChartBody: React.FC<{
  chartData: SelectedChart
  onRender: (element: HTMLDivElement) => void
}> = ({ chartData, onRender }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      onRender(ref.current)
    }
  }, [onRender])

  return (
    <div ref={ref} className="p-4">
      <Badge className="mb-4">{chartData.target_date}</Badge>
      <div className="flex flex-col gap-2">
        <ChartInfos chartData={chartData} />
        <ChartTable chartData={chartData} isExport />
      </div>
    </div>
  )
}

// ExportChartBody를 렌더링하고 캡처하는 함수
export const renderAndCaptureExportChartBody = (
  chartData: SelectedChart,
  initialIcuData: {
    icuSidebarData: IcuSidebarIoData[]
    vetsListData: Vet[]
    basicHosData: {
      order_color: Json
      group_list: string[]
      icu_memo_names: string[]
    }
  },
): Promise<HTMLCanvasElement> => {
  return new Promise((resolve, reject) => {
    const container = document.createElement('div')
    container.style.position = 'absolute'
    container.style.left = '-9999px'
    container.style.width = document.body.clientWidth + 'px'
    container.style.height = document.body.clientHeight + 'px'

    document.body.appendChild(container)

    const handleRender = (element: HTMLDivElement) => {
      setTimeout(async () => {
        try {
          const canvas = await captureContent(element)
          document.body.removeChild(container)
          resolve(canvas)
        } catch (error) {
          reject(error)
        }
      }, 100)
    }

    const root = createRoot(container)

    root.render(
      <BasicHosDataProvider
        basicHosData={{
          //todo
          rerCalcMethod: 'a',
          maintenanceRateCalcMethod: 'b',
          showOrderer: true,
          vetsListData: initialIcuData.vetsListData,
          groupListData: initialIcuData.basicHosData.group_list,
          sidebarData: initialIcuData.icuSidebarData ?? [],
          orderColorsData: initialIcuData.basicHosData
            .order_color as IcuOrderColors,
          memoNameListData: initialIcuData.basicHosData.icu_memo_names,
          vitalRefRange: [],
          orderFontSizeData: 12,
        }}
      >
        <ExportChartBody chartData={chartData} onRender={handleRender} />,
      </BasicHosDataProvider>,
    )
  })
}

export const handleExport = async (
  icuIoId: string,
  patientId: string,
  target_date: string,
  hosId: string,
  exportFn: (canvases: HTMLCanvasElement[]) => void,
) => {
  try {
    const dateRange = await getIoDateRange(icuIoId)
    const initialIcuData = await getIcuData(hosId, target_date)

    if (dateRange) {
      const canvases = await Promise.all(
        dateRange.map(async ({ target_date }) => {
          const chartData = await getIcuChart(hosId, target_date, patientId)
          const dateChartData = {
            ...chartData,
            target_date,
          }

          return renderAndCaptureExportChartBody(dateChartData, initialIcuData)
        }),
      )

      exportFn(canvases)
    }

    toast({
      title: '저장 성공',
      description: '차트가 성공적으로 저장되었습니다.',
    })
  } catch (error) {
    console.error('Export error:', error)
    toast({
      variant: 'destructive',
      title: '저장 실패',
      description: '차트 저장에 실패하였습니다. 나중에 다시 시도해주세요.',
    })
  }
}
