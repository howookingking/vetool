import WarningMessage from '@/components/common/warning-message'
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
import { Input } from '@/components/ui/input'
import { deleteAllCharts } from '@/lib/services/icu/chart/delete-icu-chart'
import { cn } from '@/lib/utils/utils'
import { LoaderCircleIcon } from 'lucide-react'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { toast } from 'sonner'

type Props = {
  icuIoId: string
  patientName: string
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
}

export default function DeleteAllChartDialog({ icuIoId, patientName }: Props) {
  const [isDeletingAllCharts, setIsDeletingAllCharts] = useState(false)
  const [isDeleteAllChartsAvailable, setIsDeleteAllChartsAvailable] =
    useState(false)

  const handleDeleteAllCharts = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()
    setIsDeletingAllCharts(true)

    await deleteAllCharts(icuIoId)

    toast.success(`${patientName}의 모든차트가 삭제되었습니다`)

    setIsDeletingAllCharts(false)
    setIsDeleteAllChartsAvailable(false)
  }

  const changeinputpatientName = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    patientName.trim() === event.target.value.trim()
      ? setIsDeleteAllChartsAvailable(true)
      : setIsDeleteAllChartsAvailable(false)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" disabled={isDeletingAllCharts}>
          모든 차트삭제
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            정말로 {patientName}의 입원기간동안의 모든 차트를 삭제하시겠습니까?
          </DialogTitle>

          <DialogDescription>
            아래 입력칸을 정확하게 채워 주세요
            <WarningMessage text="해당작업은 실행 후 되될릴 수 없습니다." />
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <form
            className="flex flex-col items-end"
            onSubmit={handleDeleteAllCharts}
          >
            <div className="flex items-center gap-2">
              <span>네</span>
              <Input
                onChange={changeinputpatientName}
                type="text"
                placeholder={patientName}
              />
              <span className="shrink-0">의 모든 차트를 삭제하겠습니다.</span>
            </div>

            <div className="space-x-2">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  취소
                </Button>
              </DialogClose>
              <Button
                variant="destructive"
                disabled={isDeletingAllCharts || !isDeleteAllChartsAvailable}
              >
                삭제
                <LoaderCircleIcon
                  className={cn(
                    isDeletingAllCharts ? 'ml-2 animate-spin' : 'hidden',
                  )}
                />
              </Button>
            </div>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
