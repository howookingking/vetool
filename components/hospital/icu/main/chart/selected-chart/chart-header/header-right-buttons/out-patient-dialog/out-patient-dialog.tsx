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
import type { SelectedChart } from '@/types/icu/chart'
import { LogOut, Undo2 } from 'lucide-react'
import { useState } from 'react'
import OutPatientButtons from './out-patient-buttons'

export default function OutPatientDialog({
  chartData,
}: {
  chartData: SelectedChart
}) {
  const { icu_io, patient } = chartData

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const isPatientOut = icu_io.out_date !== null

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          {isPatientOut ? <Undo2 size={18} /> : <LogOut size={18} />}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>
            {isPatientOut
              ? `${patient.name}의 퇴원을 취소하시겠습니까?`
              : `${patient.name}을(를) 퇴원시키시겠습니까?`}
          </DialogTitle>
          <DialogDescription>해당 작업은 되돌릴 수 있습니다</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <OutPatientButtons
            isPatientOut={isPatientOut}
            chartData={chartData}
            setIsDialogOpen={setIsDialogOpen}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
