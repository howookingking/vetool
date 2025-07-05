'use client'

import WarningMessage from '@/components/common/warning-message'
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
}

export default function DeleteChartDialog({
  icuChartId,
  patientName,
  icuIoId,
  inDate,
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

          <DialogDescription className="flex flex-col gap-2">
            <span>
              <span className="mr-2 rounded-sm bg-primary px-2 py-1 text-white">
                해당일 차트삭제
              </span>
              {target_date} 차트만 삭제합니다
            </span>
            <span>
              <span className="mr-2 rounded-sm bg-destructive px-2 py-1 text-white">
                모든 차트삭제
              </span>
              입원기간동안의 모든 차트를 삭제합니다
            </span>
            <WarningMessage text="해당작업은 실행 후 되될릴 수 없습니다." />
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DeleteChartButtons
            setIsDialogOpen={setIsDialogOpen}
            isFirstChart={isFirstChart}
            icuChartId={icuChartId}
            icuIoId={icuIoId}
            patientName={patientName}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
