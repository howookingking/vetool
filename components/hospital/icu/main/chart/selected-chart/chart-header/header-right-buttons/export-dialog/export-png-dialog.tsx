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
import type { SelectedIcuChart } from '@/types/icu/chart'
import html2canvas from 'html2canvas'
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

  const hiddenRef = useRef<HTMLDivElement>(null)

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open)
    onDialogOpenChange?.(open)
  }

  const handleExportPng = async () => {
    setIsExporting(true)

    hiddenRef.current?.classList.add('capture-mode')

    // UI 업데이트를 위해 잠시 대기
    await new Promise((resolve) => setTimeout(resolve, 100))

    if (exportType === 'single-chart') {
      await handleExportSingle(
        hiddenRef,
        `${chartData.patient.name}-${chartData.target_date}`,
      )
    }

    setIsExporting(false)
    setIsParentsDialogOpen(false)
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
                {chartData.target_date} 저장
              </Label>
            </div>

            <div className="flex items-center gap-2">
              <RadioGroupItem value="all-charts" id="all-charts" />
              <Label htmlFor="all-charts" className="cursor-pointer">
                입원기간({chartData.icu_io.in_date} ~ {chartData.target_date})
                모두 저장
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

  try {
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
  } finally {
    node.classList.remove('capture-mode')
  }
}
