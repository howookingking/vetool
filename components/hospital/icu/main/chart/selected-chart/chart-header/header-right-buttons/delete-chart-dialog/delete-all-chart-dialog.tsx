import SubmitButton from '@/components/common/submit-button'
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
import { useRouter } from 'next/navigation'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { toast } from 'sonner'

type Props = {
  icuIoId: string
  patientName: string
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
  hosId: string
  targetDate: string
}

export default function DeleteAllChartDialog({
  icuIoId,
  patientName,
  hosId,
  targetDate,
}: Props) {
  const { push } = useRouter()

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

    push(`/hospital/${hosId}/icu/${targetDate}/summary`)
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
        <Button disabled={isDeletingAllCharts}>모든 차트 삭제</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {patientName}의 입원기간동안의 모든 차트를 삭제하시겠습니까?
          </DialogTitle>

          <DialogDescription className="flex flex-col gap-1">
            아래 입력칸을 정확하게 채워 주세요
            <WarningMessage text="해당작업은 실행 후 되될릴 수 없습니다." />
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <form
            className="flex flex-col items-end"
            onSubmit={handleDeleteAllCharts}
          >
            <div className="flex items-center gap-2 text-sm">
              <span>네,</span>
              <Input
                onChange={changeinputpatientName}
                type="text"
                className="w-28"
                placeholder={patientName}
              />
              <span className="shrink-0">의 모든 차트를 삭제하겠습니다.</span>
            </div>

            <div className="space-x-2">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  닫기
                </Button>
              </DialogClose>

              <SubmitButton
                isPending={isDeletingAllCharts}
                disabled={!isDeleteAllChartsAvailable}
                buttonText="삭제"
                variant="destructive"
              />
            </div>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
