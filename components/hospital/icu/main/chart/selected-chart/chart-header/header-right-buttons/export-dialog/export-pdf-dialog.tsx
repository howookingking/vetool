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
import jsPDF from 'jspdf'
import {
  type Dispatch,
  type RefObject,
  type SetStateAction,
  useRef,
  useState,
} from 'react'
import { toast } from 'sonner'

type Props = {
  chartData: SelectedIcuChart
  setIsParentsDialogOpen: Dispatch<SetStateAction<boolean>>
  onDialogOpenChange?: (open: boolean) => void
}

export default function ExportPdfDialog({
  chartData,
  setIsParentsDialogOpen,
  onDialogOpenChange,
}: Props) {
  const isSingleChart = chartData.icu_io.in_date === chartData.target_date

  const [isExporting, setIsExporting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [exportType, setExportType] = useState<'single-chart' | 'all-charts'>(
    'single-chart',
  )

  const { basicHosData } = useBasicHosDataContext()

  const hiddenRef = useRef<HTMLDivElement>(null)

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open)
    onDialogOpenChange?.(open)
  }

  const handleExportPdf = async () => {
    setIsExporting(true)

    toast.info(
      <>
        PDF파일을 생성 중입니다
        <br /> 잠시만 기다려주세요
      </>,
    )

    try {
      if (exportType === 'single-chart') {
        await handleExportSingle(
          hiddenRef,
          `${chartData.patient.name}-${chartData.target_date}`,
        )
      } else if (exportType === 'all-charts') {
        await handleExportAllCharts(chartData, basicHosData)
      }
    } catch (error) {
      console.error('Export failed:', error)
      toast.error('PDF 내보내기 중 오류가 발생했습니다.')
    } finally {
      setIsExporting(false)
      setIsParentsDialogOpen(false)
    }
  }

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
        <DialogTrigger asChild>
          <Button variant="secondary">PDF</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {chartData.patient.name}의 차트를 PDF형식으로 저장합니다
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

            {!isSingleChart ? (
              <div className="flex items-center gap-2">
                <RadioGroupItem value="all-charts" id="all-charts" />
                <Label htmlFor="all-charts" className="cursor-pointer">
                  {chartData.icu_io.in_date} ~{' '}
                  {chartData.icu_io.out_date ?? chartData.target_date}
                </Label>
              </div>
            ) : null}
          </RadioGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                닫기
              </Button>
            </DialogClose>

            <Button
              type="button"
              onClick={handleExportPdf}
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
          <ReadOnlyIcuChart chartData={chartData} ref={hiddenRef} isExport />
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
    scale: 1.5, // 2에서 1.5로 줄여서 용량 감소
    logging: false,
    useCORS: true,
    allowTaint: true,
    foreignObjectRendering: false,
  })

  // Canvas를 JPEG로 변환 (PNG보다 용량이 작음)
  const imgData = canvas.toDataURL('image/jpeg', 0.85) // 85% 품질

  // PDF 생성 (A4 가로 방향, 압축 활성화)
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
    compress: true, // PDF 압축 활성화
  })

  // A4 가로 크기 (mm)
  const pdfWidth = pdf.internal.pageSize.getWidth()
  const pdfHeight = pdf.internal.pageSize.getHeight()

  // Canvas 비율 계산
  const canvasWidth = canvas.width
  const canvasHeight = canvas.height
  const ratio = canvasWidth / canvasHeight

  // PDF에 맞게 이미지 크기 조정
  let imgWidth = pdfWidth
  let imgHeight = pdfWidth / ratio

  // 높이가 PDF 높이를 초과하면 높이 기준으로 조정
  if (imgHeight > pdfHeight) {
    imgHeight = pdfHeight
    imgWidth = pdfHeight * ratio
  }

  // 중앙 정렬을 위한 위치 계산
  const x = (pdfWidth - imgWidth) / 2
  const y = (pdfHeight - imgHeight) / 2

  pdf.addImage(imgData, 'JPEG', x, y, imgWidth, imgHeight)
  pdf.save(`${fileName}.pdf`)
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

  // PDF 생성 (A4 가로 방향, 압축 활성화)
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
    compress: true, // PDF 압축 활성화
  })

  const pdfWidth = pdf.internal.pageSize.getWidth()
  const pdfHeight = pdf.internal.pageSize.getHeight()

  // 임시 컨테이너 생성
  const tempContainer = document.createElement('div')
  tempContainer.style.position = 'fixed'
  tempContainer.style.top = '-10000px'
  tempContainer.style.left = '-10000px'
  tempContainer.style.opacity = '0'
  tempContainer.style.pointerEvents = 'none'
  document.body.appendChild(tempContainer)

  try {
    let isFirstPage = true

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
              plan: basicHosData.plan,
              isInChargeSystem: basicHosData.isInChargeSystem,
            }}
          >
            <ReadOnlyIcuChart chartData={dateChartData} isExport />
          </BasicHosDataProvider>,
        )
        // 렌더링 완료 대기
        setTimeout(() => resolve(), 500)
      })

      // capture-mode 클래스 추가
      const chartElement = chartContainer.firstChild as HTMLElement
      if (chartElement) {
        await new Promise((resolve) => setTimeout(resolve, 100))

        // Canvas로 변환
        const canvas = await html2canvas(chartElement, {
          backgroundColor: '#ffffff',
          scale: 1.5, // 2에서 1.5로 줄여서 용량 감소
          logging: false,
          useCORS: true,
          allowTaint: true,
          foreignObjectRendering: false,
        })

        // Canvas를 JPEG로 변환 (PNG보다 용량이 작음)
        const imgData = canvas.toDataURL('image/jpeg', 0.85) // 85% 품질

        // Canvas 비율 계산
        const canvasWidth = canvas.width
        const canvasHeight = canvas.height
        const ratio = canvasWidth / canvasHeight

        // PDF에 맞게 이미지 크기 조정
        let imgWidth = pdfWidth
        let imgHeight = pdfWidth / ratio

        // 높이가 PDF 높이를 초과하면 높이 기준으로 조정
        if (imgHeight > pdfHeight) {
          imgHeight = pdfHeight
          imgWidth = pdfHeight * ratio
        }

        // 중앙 정렬을 위한 위치 계산
        const x = (pdfWidth - imgWidth) / 2
        const y = (pdfHeight - imgHeight) / 2

        // 첫 페이지가 아니면 새 페이지 추가
        if (!isFirstPage) {
          pdf.addPage()
        }
        isFirstPage = false

        // PDF에 이미지 추가
        pdf.addImage(imgData, 'JPEG', x, y, imgWidth, imgHeight)
      }

      // 정리
      root.unmount()
      tempContainer.removeChild(chartContainer)
    }

    // PDF 파일 다운로드
    pdf.save(`${chartData.patient.name}-${inDate}_${outDate}-charts.pdf`)
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
