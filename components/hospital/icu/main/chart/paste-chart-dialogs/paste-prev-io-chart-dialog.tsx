import SubmitButton from '@/components/common/submit-button'
import PreviewDialog from '@/components/hospital/common/preview/preview-dialog'
import UserSelectItem from '@/components/hospital/common/user-select-item'
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
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useSafeRefresh } from '@/hooks/use-realtime-refresh'
import { pasteChart } from '@/lib/services/icu/chart/paste-chart'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import type { PrevIoChartData } from '@/types/icu/chart'
import { CalendarPlusIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import DialogTriggerButton from './dialog-trigger-button'

type Props = {
  prevIoChartData: PrevIoChartData
  patientId: string
  targetDate: string
}

export default function PastePrevIoChartDialog({
  prevIoChartData,
  patientId,
  targetDate,
}: Props) {
  const { icu_chart_id: prevChartId, target_date: prevDate } = prevIoChartData

  const safeRefresh = useSafeRefresh()
  const {
    basicHosData: { vetList, showOrderer },
  } = useBasicHosDataContext()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [orderer, setOrderer] = useState(vetList[0].name)

  const handleCopyPrevIoChart = async () => {
    setIsLoading(true)

    await pasteChart(patientId, prevChartId, targetDate, orderer)

    toast.success('최근 입원 차트를 복사하였습니다')

    setIsLoading(false)
    setIsDialogOpen(false)

    safeRefresh()
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <div className="relative">
        <DialogTriggerButton
          icon={CalendarPlusIcon}
          title={`${prevDate} 차트 붙여넣기`}
          hiddenOnMobile
        />
        <div className="absolute bottom-14 left-1/2 hidden -translate-x-1/2 md:block">
          <PreviewDialog
            targetDate={prevDate!}
            isTemplate={false}
            patientId={patientId}
            chartId={prevChartId}
          />
        </div>
      </div>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>최근 차트 붙여넣기</DialogTitle>
          <DialogDescription>
            {prevDate} 차트를 복사하여 {targetDate} 차트를 생성합니다
          </DialogDescription>
        </DialogHeader>

        {showOrderer && (
          <div>
            <Label className="pt-4">오더결정 수의사</Label>
            <Select onValueChange={setOrderer} defaultValue={orderer}>
              <SelectTrigger className="h-8 text-sm">
                <SelectValue placeholder="수의사를 선택해주세요" />
              </SelectTrigger>

              <SelectContent>
                {vetList.map((vet) => (
                  <SelectItem
                    key={vet.user_id}
                    value={vet.name}
                    className="w-full"
                  >
                    <UserSelectItem
                      avatarUrl={vet.avatar_url}
                      name={vet.name}
                      position={vet.position}
                    />
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <DialogFooter className="gap-2 md:gap-0">
          <DialogClose asChild>
            <Button size="sm" type="button" variant="outline" tabIndex={-1}>
              취소
            </Button>
          </DialogClose>

          <SubmitButton
            buttonText="확인"
            isPending={isLoading}
            onClick={handleCopyPrevIoChart}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
