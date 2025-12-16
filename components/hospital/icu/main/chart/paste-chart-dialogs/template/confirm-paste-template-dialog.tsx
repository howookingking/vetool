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
import { useSafeRefresh } from '@/hooks/use-realtime-refresh'
import { pasteTemplateOrders } from '@/lib/services/icu/chart/order-mutation'
import { pasteChart } from '@/lib/services/icu/chart/paste-chart'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import { CheckIcon } from 'lucide-react'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { toast } from 'sonner'

type Props = OrderCreatorRowProps | PasteChartDialogProps

type OrderCreatorRowProps = {
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
  isOrderCreator: true
  chartId: string
  patientId: null
  targetDate: null
  templateChartId: string
}

type PasteChartDialogProps = {
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
  isOrderCreator: false
  chartId: null
  patientId: string
  targetDate: string
  templateChartId: string
}
export default function ConfirmPasteTemplateDialog({
  setIsDialogOpen,
  isOrderCreator,
  chartId,
  targetDate,
  patientId,
  templateChartId,
}: Props) {
  const safeRefresh = useSafeRefresh()
  const {
    basicHosData: { vetList, showOrderer },
  } = useBasicHosDataContext()

  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)

  const [orderer, setOrderer] = useState(vetList[0].name)
  const [isLoading, setIsLoading] = useState(false)

  const handlePasteSelectedTemplate = async () => {
    setIsLoading(true)

    // tableHeader : 이미 생성된 차트에서 템플릿오더를 추가
    // !tableHeader : 익일차트 혹은 첫차트에서 템플릿 오더를 추가하는 경우
    isOrderCreator
      ? await pasteTemplateOrders(templateChartId, chartId!)
      : await pasteChart(patientId!, templateChartId, targetDate!, orderer)

    toast.success('템플릿을 붙여넣었습니다')

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
          <DialogTitle>템플릿 붙여넣기</DialogTitle>
          <DialogDescription>선택한 템플릿을 붙여넣습니다</DialogDescription>
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
            onClick={handlePasteSelectedTemplate}
            isPending={isLoading}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
