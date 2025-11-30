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
import { Trash2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import DeleteChartButtons from './delete-chart-buttons'

type Props = {
  icuChartId: string
  patientName: string
  icuIoId: string
  inDate: string
  hosId: string
  targetDate: string
}

export default function DeleteChartDialog({
  icuChartId,
  patientName,
  icuIoId,
  inDate,
  hosId,
  targetDate,
}: Props) {
  const { target_date } = useParams()

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const isFirstChart = inDate === target_date

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trash2 size={18} />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mb-2">
            {patientName}의 차트를 삭제하시겠습니까?
          </DialogTitle>

          <DialogDescription className="flex flex-col gap-1">
            <span>해당일 차트 삭제 : {target_date} 차트만 삭제합니다</span>
            <span>모든 차트 삭제 : 입원기간동안의 모든 차트를 삭제합니다</span>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DeleteChartButtons
            setIsDialogOpen={setIsDialogOpen}
            isFirstChart={isFirstChart}
            icuChartId={icuChartId}
            icuIoId={icuIoId}
            patientName={patientName}
            hosId={hosId}
            targetDate={targetDate}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
