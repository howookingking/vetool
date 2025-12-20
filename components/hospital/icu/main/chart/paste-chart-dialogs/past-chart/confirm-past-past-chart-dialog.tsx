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
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useSafeRefresh } from '@/hooks/use-safe-refresh'
import { pasteChart } from '@/lib/services/icu/chart/paste-chart'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { CheckIcon } from 'lucide-react'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { toast } from 'sonner'

type Props = {
  patientId: string
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
  chartId: string
  targetDate: string
}

export default function ConfirmPastePastChartDialog({
  patientId,
  setIsDialogOpen,
  chartId,
  targetDate,
}: Props) {
  const safeRefresh = useSafeRefresh()
  const {
    basicHosData: { vetList, showOrderer },
  } = useBasicHosDataContext()

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [orderer, setOrderer] = useState(vetList[0].name)
  const [isLoading, setIsLoading] = useState(false)

  const handlePasteSelectedChart = async () => {
    setIsLoading(true)

    await pasteChart(patientId, chartId, targetDate, orderer)

    toast.success('과거차트를 붙여넣었습니다')

    setIsLoading(false)
    setIsDialogOpen(false)

    safeRefresh()
  }

  return (
    <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" disabled={isLoading}>
          <CheckIcon />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>선택한 차트 붙여넣기</DialogTitle>
          <VisuallyHidden>
            <DialogDescription />
          </VisuallyHidden>
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
              닫기
            </Button>
          </DialogClose>

          <SubmitButton
            buttonText="확인"
            onClick={handlePasteSelectedChart}
            isPending={isLoading}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
