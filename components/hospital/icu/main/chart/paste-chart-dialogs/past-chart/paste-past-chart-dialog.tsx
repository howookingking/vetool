import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { PatientIo } from '@/lib/services/icu/chart/get-icu-chart'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { CalendarPlusIcon } from 'lucide-react'
import { useState } from 'react'
import DialogTriggerButton from '../dialog-trigger-button'
import PastChartTable from './past-chart-table'

type Props = {
  targetDate: string
  patientId: string
  patientIos: PatientIo[]
}

export default function PastePastChartDialog({
  targetDate,
  patientId,
  patientIos,
}: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTriggerButton icon={CalendarPlusIcon} title="과거 차트 붙여넣기" />

      <DialogContent className="flex h-[609.5px] flex-col justify-start md:max-w-[1200px]">
        <DialogHeader>
          <DialogTitle>과거 차트 붙여넣기</DialogTitle>
          <VisuallyHidden>
            <DialogDescription />
          </VisuallyHidden>
        </DialogHeader>

        <PastChartTable
          patientIos={patientIos}
          setIsDialogOpen={setIsDialogOpen}
          patientId={patientId}
          targetDate={targetDate}
        />

        <DialogFooter className="mt-auto">
          <DialogClose asChild>
            <Button size="sm" type="button" variant="outline">
              닫기
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
