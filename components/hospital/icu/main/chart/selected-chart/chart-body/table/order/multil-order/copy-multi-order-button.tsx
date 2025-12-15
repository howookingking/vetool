import { Button } from '@/components/ui/button'
import { Kbd } from '@/components/ui/kbd'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { CopyIcon } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'
import { toast } from 'sonner'

type Props = {
  multiOrderPendingQueue: Partial<SelectedIcuOrder>[]
  setIsMultiOrderDialogOpen: Dispatch<SetStateAction<boolean>>
  setCopiedOrderPendingQueue: Dispatch<
    SetStateAction<Partial<SelectedIcuOrder>[]>
  >
  setMultiOrderPendingQueue: Dispatch<
    SetStateAction<Partial<SelectedIcuOrder>[]>
  >
}

export default function CopyMultiOrderButton({
  multiOrderPendingQueue,
  setIsMultiOrderDialogOpen,
  setCopiedOrderPendingQueue,
  setMultiOrderPendingQueue,
}: Props) {
  const handleCopySelectedOrders = () => {
    setCopiedOrderPendingQueue(multiOrderPendingQueue)

    toast.success(`${multiOrderPendingQueue.length}개 오더 복사 완료`, {
      description: (
        <>
          붙여넣기 할 차트로 이동하여 <Kbd>Ctrl</Kbd> + <Kbd>V</Kbd>
        </>
      ),
    })

    setMultiOrderPendingQueue([])
    setIsMultiOrderDialogOpen(false)
  }

  return (
    <Button
      onClick={handleCopySelectedOrders}
      className="flex items-center justify-start gap-2 py-5 text-base"
      variant="outline"
    >
      <CopyIcon />
      복사
    </Button>
  )
}
