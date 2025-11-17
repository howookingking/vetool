'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { type SelectedIcuChart } from '@/types/icu/chart'
import { Share } from 'lucide-react'
import { useState } from 'react'
import ExportButtons from './export-buttons'

export default function ExportDialog({
  chartData,
}: {
  chartData: SelectedIcuChart
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Share size={18} />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="gap-2">
          <DialogTitle>{chartData.patient.name} 차트 내보내기</DialogTitle>
          <DialogDescription className="flex flex-col gap-1">
            <span>입원 기간 동안의 차트를 저장합니다(임시 비활성화)</span>
            <span>
              텍스트로 복사할 경우 {chartData.target_date} 차트만 복사합니다
            </span>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <ExportButtons
            chartData={chartData}
            setIsDialogOpen={setIsDialogOpen}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
