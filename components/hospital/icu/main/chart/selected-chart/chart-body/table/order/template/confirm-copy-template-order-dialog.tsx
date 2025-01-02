import UserAvatar from '@/components/hospital/common/user-avatar'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
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
import { toast } from '@/components/ui/use-toast'
import { upsertTemplateOrders } from '@/lib/services/icu/chart/order-mutation'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { useTemplateStore } from '@/lib/store/icu/template'
import { cn } from '@/lib/utils/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import { DialogDescription } from '@radix-ui/react-dialog'
import { LoaderCircle } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useState } from 'react'

export default function ConfirmCopyTemplateOrderDialog({
  icuChartId,
}: {
  icuChartId: string
}) {
  const { setOrderStep } = useIcuOrderStore()
  const { isTemplateDialogOpen, setIsTemplateDialogOpen, reset, template } =
    useTemplateStore()
  const {
    basicHosData: { vetsListData, showOrderer },
  } = useBasicHosDataContext()
  const [orderer, setOrderer] = useState(vetsListData[0].name)
  const [isPending, setIsPending] = useState(false)

  const handleConfirmCopy = useCallback(async () => {
    setIsPending(true)
    await upsertTemplateOrders(template.icu_chart_id!, icuChartId)

    toast({
      title: '오더를 추가하였습니다',
    })

    setIsPending(false)
    reset()
    setIsTemplateDialogOpen(false)
    setOrderStep('closed')
  }, [
    template.icu_chart_id,
    icuChartId,
    reset,
    setIsTemplateDialogOpen,
    setOrderStep,
  ])

  return (
    <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>오더를 추가하시겠습니까?</DialogTitle>
          <DialogDescription />
          {showOrderer && (
            <div>
              <Label className="pt-4">오더결정 수의사</Label>
              <Select onValueChange={setOrderer} defaultValue={orderer}>
                <SelectTrigger
                  className={cn(
                    'h-8 text-sm',
                    !orderer && 'text-muted-foreground',
                  )}
                >
                  <SelectValue placeholder="수의사를 선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                  {vetsListData.map((vet) => (
                    <SelectItem
                      key={vet.user_id}
                      value={vet.name}
                      className="w-full"
                    >
                      <div className="flex items-center gap-2">
                        {vet.avatar_url && (
                          <UserAvatar src={vet.avatar_url} alt={vet.name} />
                        )}
                        <span>{vet.name}</span>
                        {vet.position && (
                          <span className="text-xs">({vet.position})</span>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsTemplateDialogOpen(false)}
          >
            취소
          </Button>
          <Button onClick={handleConfirmCopy} disabled={isPending}>
            확인
            <LoaderCircle
              className={cn(isPending ? 'ml-2 animate-spin' : 'hidden')}
            />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
