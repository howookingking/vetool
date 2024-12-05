import ChartTable from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import type { SelectedChart } from '@/types/icu/chart'
import { Fullscreen } from 'lucide-react'
import { useRef, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
// import PinchZoomContainer from '../../pinch-zoom-container'

export default function MobileChartTable({
  chartData,
}: {
  chartData: SelectedChart
}) {
  const cellRef = useRef<HTMLTableRowElement>(null)
  const [isTouchMove, setIsTouchMove] = useState(false)

  const checkWidth = useDebouncedCallback(() => {
    if (cellRef.current) {
      const isMoving = cellRef.current.getBoundingClientRect().left < 0
      setIsTouchMove(isMoving)
    }
  }, 10)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-[320px]">
          <span>처치표 보기</span>
          <Fullscreen size={20} />
        </Button>
      </DialogTrigger>

      <DialogHeader>
        <DialogTitle />
        <DialogDescription />
      </DialogHeader>

      <DialogContent className="flex max-h-[80vh] min-h-[40vh] max-w-full flex-col justify-start overflow-hidden px-2 pb-10">
        <DialogHeader>
          <DialogTitle />
          <DialogDescription />
        </DialogHeader>
        <div className="min-h-[calc(70vh)] overflow-auto" onScroll={checkWidth}>
          <ChartTable
            chartData={chartData}
            cellRef={cellRef}
            isTouchMove={isTouchMove}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
