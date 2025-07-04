import { Button } from '@/components/ui/button'
import {
  DialogClose,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import {
  deleteAllCharts,
  deleteChart,
  deleteOrders,
} from '@/lib/services/icu/chart/delete-icu-chart'
import { cn } from '@/lib/utils/utils'
import { LoaderCircle } from 'lucide-react'
import { useParams } from 'next/navigation'
import { Dispatch, SetStateAction, use, useState } from 'react'
import WarningMessage from '@/components/common/warning-message'
export default function DeleteChartButtons({
  setIsDialogOpen,
  isFirstChart,
  icuChartId,
  icuIoId,
  name,
}: {
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
  isFirstChart: boolean
  icuChartId: string
  icuIoId: string
  name: string
}) {
  const { target_date } = useParams()
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDeletingAll, setIsDeletingAll] = useState(false)
  const [isDelet, setIsDelet] = useState(false)
  const [isDeletConfirmOpen, setIsDeletConfirmOpen] = useState(false)
  const [inputName, setInputName] = useState('')

  const handleDeleteChart = async () => {
    setIsDeleting(true)

    // 첫 차트인 경우 오더만 삭제, 2일차이상의 경우 차트 전체 삭제
    if (isFirstChart) {
      await deleteOrders(icuChartId)
    } else {
      await deleteChart(icuChartId)
    }

    toast({
      title: '차트가 삭제되었습니다',
    })
    setIsDeleting(false)
    setIsDialogOpen(false)
  }
  const handleDeleteAllCharts = async () => {
    setIsDeletingAll(true)

    await deleteAllCharts(icuIoId)

    toast({
      title: `${name}의 모든차트가 삭제되었습니다`,
    })
    setIsDeletingAll(false)
    setIsDialogOpen(false)
  }
  const changeinputname = (e: React.ChangeEvent<HTMLInputElement>) => {
    name === e.target.value && setIsDelet(true)
    setInputName(e.target.value)
  }
  return (
    <>
      <DialogClose asChild>
        <Button type="button" variant="outline">
          취소
        </Button>
      </DialogClose>
      <Button
        onClick={handleDeleteChart}
        disabled={isDeleting || isDeletingAll}
      >
        선택차트삭제
        <LoaderCircle
          className={cn(isDeleting ? 'ml-2 animate-spin' : 'hidden')}
        />
      </Button>
      <Dialog open={isDeletConfirmOpen} onOpenChange={setIsDeletConfirmOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={
              isDeletConfirmOpen
                ? () => setIsDeletConfirmOpen(false)
                : () => setIsDeletConfirmOpen(true)
            }
            variant="destructive"
            disabled={isDeleting || isDeletingAll}
          >
            모든차트삭제
            <LoaderCircle
              className={cn(isDeletingAll ? 'ml-2 animate-spin' : 'hidden')}
            />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              정말로 {name}의 입원기간동안의 모든 차트를 삭제하시겠습니까?
            </DialogTitle>

            <DialogDescription>
              아래 입력칸을 정확하게 채워 주세요
              <WarningMessage text="해당작업은 실행 후 되될릴 수 없습니다." />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <div className="flex items-center gap-2">
              네
              <Input
                value={inputName}
                onChange={changeinputname}
                type="text"
                className="w-20"
                placeholder={name}
              />
              의 모든 차트를 삭제하겠습니다.
            </div>
            <Button
              onClick={handleDeleteAllCharts}
              variant="destructive"
              disabled={isDeletingAll || !isDelet}
            >
              {' '}
              모든차트삭제
              <LoaderCircle
                className={cn(isDeletingAll ? 'ml-2 animate-spin' : 'hidden')}
              />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
