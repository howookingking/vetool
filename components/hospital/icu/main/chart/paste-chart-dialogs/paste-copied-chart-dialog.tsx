import SubmitButton from '@/components/common/submit-button'
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
import { useCopiedChartStore } from '@/lib/store/icu/copied-chart'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import { ClipboardCheckIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import DialogTriggerButton from './dialog-trigger-button'

type Props = {
  targetDate: string
  patientId: string
}

export default function PasteCopiedChartDialog({
  targetDate,
  patientId,
}: Props) {
  const safeRefresh = useSafeRefresh()
  const { copiedChartId, reset } = useCopiedChartStore()
  const {
    basicHosData: { vetList, showOrderer },
  } = useBasicHosDataContext()

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [orderer, setOrderer] = useState(vetList[0].name)
  const [isLoading, setIsLoading] = useState(false)

  const handlePasteCopiedChart = async () => {
    if (!copiedChartId) {
      setIsDialogOpen(false)

      toast.error('복사할 차트가 없습니다', {
        description: '차트를 먼저 복사해주세요',
      })

      return
    }

    setIsLoading(true)

    await pasteChart(patientId, copiedChartId, targetDate, orderer)

    toast.success('복사한 차트를 생성했습니다', {
      description: '복사한 차트는 클립보드에서 제거됩니다',
    })

    setIsLoading(false)
    setIsDialogOpen(false)
    reset()

    safeRefresh()
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTriggerButton
        icon={ClipboardCheckIcon}
        title="복사한 차트 붙여넣기"
        hiddenOnMobile
      />

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>복사한 차트 붙여넣기</DialogTitle>
          <DialogDescription>
            클립보드에 복사한 차트를 붙여넣습니다
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
            onClick={handlePasteCopiedChart}
            isPending={isLoading}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
