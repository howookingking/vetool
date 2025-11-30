import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { type Dispatch, type SetStateAction } from 'react'
import DeleteAllChartDialog from './delete-all-chart-dialog'
import DeleteSingleChartDialog from './delete-single-chart-dialog'

type Props = {
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
  isFirstChart: boolean
  icuChartId: string
  icuIoId: string
  patientName: string
  hosId: string
  targetDate: string
}

export default function DeleteChartButtons({
  setIsDialogOpen,
  isFirstChart,
  icuChartId,
  icuIoId,
  patientName,
  hosId,
  targetDate,
}: Props) {
  return (
    <>
      <DialogClose asChild>
        <Button type="button" variant="outline">
          닫기
        </Button>
      </DialogClose>

      <DeleteSingleChartDialog
        isFirstChart={isFirstChart}
        icuChartId={icuChartId}
        patientName={patientName}
        setIsDialogOpen={setIsDialogOpen}
        targetDate={targetDate}
      />

      <DeleteAllChartDialog
        icuIoId={icuIoId}
        patientName={patientName}
        setIsDialogOpen={setIsDialogOpen}
        hosId={hosId}
        targetDate={targetDate}
      />
    </>
  )
}
