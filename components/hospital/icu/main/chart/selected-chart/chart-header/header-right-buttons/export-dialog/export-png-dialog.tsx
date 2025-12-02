import ReadOnlyIcuChart from '@/components/common/read-only-icu-chart/read-only-icu-chart'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Spinner } from '@/components/ui/spinner'
import { getIcuChartByPatientIdAndTargetDate } from '@/lib/services/icu/chart/get-icu-chart'
import {
  BasicHosData,
  BasicHosDataProvider,
  useBasicHosDataContext,
} from '@/providers/basic-hos-data-context-provider'
import type { SelectedIcuChart } from '@/types/icu/chart'
import html2canvas from 'html2canvas'
import JSZip from 'jszip'
import {
  type Dispatch,
  type RefObject,
  type SetStateAction,
  useRef,
  useState,
} from 'react'

type Props = {
  chartData: SelectedIcuChart
  setIsParentsDialogOpen: Dispatch<SetStateAction<boolean>>
  onDialogOpenChange?: (open: boolean) => void
}

export default function ExportPngDialog({
  chartData,
  setIsParentsDialogOpen,
  onDialogOpenChange,
}: Props) {
  const [isExporting, setIsExporting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [exportType, setExportType] = useState<'single-chart' | 'all-charts'>(
    'single-chart',
  )

  const { basicHosData } = useBasicHosDataContext()

  console.log(chartData.patient.patient_id)

  const hiddenRef = useRef<HTMLDivElement>(null)

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open)
    onDialogOpenChange?.(open)
  }

  const handleExportPng = async () => {
    setIsExporting(true)

    try {
      if (exportType === 'single-chart') {
        hiddenRef.current?.classList.add('capture-mode')
        await new Promise((resolve) => setTimeout(resolve, 100))

        await handleExportSingle(
          hiddenRef,
          `${chartData.patient.name}/${chartData.target_date}`,
        )
      } else if (exportType === 'all-charts') {
        await handleExportAllCharts(chartData, basicHosData)
      }
    } catch (error) {
      console.error('Export failed:', error)
      alert('내보내기 중 오류가 발생했습니다.')
    } finally {
      setIsExporting(false)
      setIsParentsDialogOpen(false)
    }
  }

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
        <DialogTrigger asChild>
          <Button variant="secondary">PNG</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {chartData.patient.name}의 차트를 PNG형식으로 저장합니다
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <RadioGroup
            defaultValue={exportType}
            onValueChange={(value) =>
              setExportType(value as 'single-chart' | 'all-charts')
            }
            className="space-y-1"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="single-chart" id="single-chart" />
              <Label htmlFor="single-chart" className="cursor-pointer">
                {chartData.target_date}
              </Label>
            </div>

            <div className="flex items-center gap-2">
              <RadioGroupItem value="all-charts" id="all-charts" />
              <Label htmlFor="all-charts" className="cursor-pointer">
                {chartData.icu_io.in_date} ~{' '}
                {chartData.icu_io.out_date ?? chartData.target_date}
              </Label>
            </div>
          </RadioGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                닫기
              </Button>
            </DialogClose>

            <Button
              type="button"
              onClick={handleExportPng}
              disabled={isExporting}
            >
              저장
              {isExporting ? <Spinner /> : null}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {isDialogOpen ? (
        <div
          style={{
            position: 'fixed',
            top: -10000,
            left: -10000,
            opacity: 0,
            pointerEvents: 'none',
          }}
        >
          <ReadOnlyIcuChart chartData={chartData} ref={hiddenRef} />
        </div>
      ) : null}
    </>
  )
}

async function handleExportSingle(
  hiddenRef: RefObject<HTMLDivElement | null>,
  fileName: string,
) {
  if (!hiddenRef.current) return

  const node = hiddenRef.current

  const canvas = await html2canvas(node, {
    backgroundColor: '#ffffff',
    scale: 2,
    logging: true,
    useCORS: true,
    allowTaint: true,
    foreignObjectRendering: false,
  })

  const dataUrl = canvas.toDataURL('image/png')

  const link = document.createElement('a')
  link.href = dataUrl
  link.download = `${fileName}.png`
  link.click()
}

async function handleExportAllCharts(
  chartData: SelectedIcuChart,
  basicHosData: BasicHosData,
) {
  const patientId = chartData.patient.patient_id
  const inDate = chartData.icu_io.in_date
  const outDate = (chartData.icu_io.out_date ?? chartData.target_date) as string

  // 날짜 범위 생성
  const dateRange = getDateRange(inDate, outDate)

  const zip = new JSZip()

  // 임시 컨테이너 생성
  const tempContainer = document.createElement('div')
  tempContainer.style.position = 'fixed'
  tempContainer.style.top = '-10000px'
  tempContainer.style.left = '-10000px'
  tempContainer.style.opacity = '0'
  tempContainer.style.pointerEvents = 'none'
  document.body.appendChild(tempContainer)

  try {
    for (let i = 0; i < dateRange.length; i++) {
      const targetDate = dateRange[i]

      // 각 날짜의 차트 데이터 가져오기
      const dateChartData = await getIcuChartByPatientIdAndTargetDate(
        targetDate,
        patientId,
      )

      if (!dateChartData) {
        console.warn(`No chart data found for ${targetDate}`)
        continue
      }

      // ReadOnlyIcuChart를 동적으로 렌더링
      const { default: ReadOnlyIcuChart } = await import(
        '@/components/common/read-only-icu-chart/read-only-icu-chart'
      )
      const { createRoot } = await import('react-dom/client')

      const chartContainer = document.createElement('div')
      tempContainer.appendChild(chartContainer)

      // React 컴포넌트 렌더링
      const root = createRoot(chartContainer)
      await new Promise<void>((resolve) => {
        root.render(
          <BasicHosDataProvider
            basicHosData={{
              // 수의사 정보
              vetList: basicHosData.vetList,

              // 사이드바에 표시되는 환자 정보 => 차트 생성 단계에서 필요함
              icuSidebarPatients: basicHosData.icuSidebarPatients,

              // 병원 ICU 설정값들
              groupListData: basicHosData.groupListData,
              orderColorsData: basicHosData.orderColorsData,
              memoNameListData: basicHosData.memoNameListData,
              showOrderer: basicHosData.showOrderer,
              showTxUser: basicHosData.showTxUser,
              vitalRefRange: basicHosData.vitalRefRange,
              orderFontSizeData: basicHosData.orderFontSizeData,
              timeGuidelineData: basicHosData.timeGuidelineData,
              orderColorDisplay: basicHosData.orderColorDisplay,
              plan: basicHosData.plan,
              isInChargeSystem: basicHosData.isInChargeSystem,
            }}
          >
            <ReadOnlyIcuChart chartData={dateChartData} />
          </BasicHosDataProvider>,
        )
        // 렌더링 완료 대기
        setTimeout(() => resolve(), 500)
      })

      // capture-mode 클래스 추가
      const chartElement = chartContainer.firstChild as HTMLElement
      if (chartElement) {
        chartElement.classList.add('capture-mode')
        await new Promise((resolve) => setTimeout(resolve, 100))

        // PNG로 변환
        const canvas = await html2canvas(chartElement, {
          backgroundColor: '#ffffff',
          scale: 2,
          logging: false,
          useCORS: true,
          allowTaint: true,
          foreignObjectRendering: false,
        })

        // Canvas를 Blob으로 변환
        const blob = await new Promise<Blob>((resolve) => {
          canvas.toBlob((blob) => {
            resolve(blob!)
          }, 'image/png')
        })

        // ZIP에 추가
        zip.file(`${chartData.patient.name}-${targetDate}.png`, blob)
      }

      // 정리
      root.unmount()
      tempContainer.removeChild(chartContainer)
    }

    // ZIP 파일 생성 및 다운로드
    const zipBlob = await zip.generateAsync({ type: 'blob' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(zipBlob)
    link.download = `${chartData.patient.name}-${inDate}_${outDate}-charts.zip`
    link.click()
    URL.revokeObjectURL(link.href)
  } finally {
    // 임시 컨테이너 제거
    document.body.removeChild(tempContainer)
  }
}

// 날짜 범위 생성 함수
function getDateRange(startDate: string, endDate: string): string[] {
  const dates: string[] = []
  const current = new Date(startDate)
  const end = new Date(endDate)

  while (current <= end) {
    dates.push(current.toISOString().split('T')[0])
    current.setDate(current.getDate() + 1)
  }

  return dates
}
