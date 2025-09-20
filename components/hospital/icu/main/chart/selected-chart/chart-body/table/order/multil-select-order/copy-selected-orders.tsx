import { Button } from '@/components/ui/button'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { CopyIcon } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

export default function CopySelectedOrdersButton({
  setIsMultiSelectOrderActionDialogOpen,
}: {
  setIsMultiSelectOrderActionDialogOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >
}) {
  const {
    setCopiedOrderPendingQueue,
    selectedOrderPendingQueue,
    setSelectedOrderPendingQueue,
  } = useIcuOrderStore()

  const handleCopySelectedOrders = () => {
    setCopiedOrderPendingQueue(selectedOrderPendingQueue)

    toast.success('오더 복사 완료', {
      description: '붙여넣기 할 차트로 이동하여 ctrl + v를 눌러주세요',
    })

    setSelectedOrderPendingQueue([])
    setIsMultiSelectOrderActionDialogOpen(false)
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
