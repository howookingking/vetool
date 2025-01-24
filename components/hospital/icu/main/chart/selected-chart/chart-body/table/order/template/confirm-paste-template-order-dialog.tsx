import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { toast } from '@/components/ui/use-toast'
import { pasteTemplateOrders } from '@/lib/services/icu/chart/order-mutation'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { useTemplateStore } from '@/lib/store/icu/template'
import { cn } from '@/lib/utils/utils'
import { DialogDescription } from '@radix-ui/react-dialog'
import { LoaderCircle } from 'lucide-react'
import { useState } from 'react'

export default function ConfirmPasteTemplateOrderDialog({
  icuChartId,
}: {
  icuChartId: string
}) {
  const { setOrderStep } = useIcuOrderStore()
  const { isTemplateDialogOpen, setIsTemplateDialogOpen, reset, template } =
    useTemplateStore()
  const [isPending, setIsPending] = useState(false)

  const handleConfirmPasting = async () => {
    setIsPending(true)

    await pasteTemplateOrders(template.icu_chart_id!, icuChartId)

    toast({
      title: '템플릿 오더를 추가하였습니다',
    })

    setIsPending(false)
    setIsTemplateDialogOpen(false)
    setOrderStep('closed')
    reset()
  }

  return (
    <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>오더를 추가하시겠습니까?</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsTemplateDialogOpen(false)}
          >
            취소
          </Button>
          <Button onClick={handleConfirmPasting} disabled={isPending}>
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
