'use client'

import NewFeature from '@/components/common/new-feature'
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
import type { SelectedIcuChart } from '@/types/icu/chart'
import { Share } from 'lucide-react'
import { useState } from 'react'
import ExportPdfDialog from './export-pdf-dialog'
import ExportPngDialog from './export-png-dialog'
import ExportTextDialog from './export-text-dialog'

type Props = {
  chartData: SelectedIcuChart
}

export default function ExportDialog({ chartData }: Props) {
  const [isParentsDialogOpen, setIsParentsDialogOpen] = useState(false)

  return (
    <Dialog open={isParentsDialogOpen} onOpenChange={setIsParentsDialogOpen}>
      <NewFeature>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Share size={18} />
          </Button>
        </DialogTrigger>
      </NewFeature>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="gap-2">
          <DialogTitle>{chartData.patient.name} 차트 내보내기</DialogTitle>
          <DialogDescription className="flex flex-col gap-1">
            <span>
              텍스트 : {chartData.target_date} 차트를 텍스트 형식으로 복사합니다
            </span>
            <span>PNG : PNG 형식으로 저장합니다</span>
            <span>PDF : PDF 형식으로 저장합니다</span>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">닫기</Button>
          </DialogClose>

          <NewFeature>
            <ExportTextDialog chartData={chartData} />
          </NewFeature>

          <NewFeature>
            <ExportPngDialog
              chartData={chartData}
              setIsParentsDialogOpen={setIsParentsDialogOpen}
            />
          </NewFeature>

          <NewFeature>
            <ExportPdfDialog
              chartData={chartData}
              setIsParentsDialogOpen={setIsParentsDialogOpen}
            />
          </NewFeature>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
