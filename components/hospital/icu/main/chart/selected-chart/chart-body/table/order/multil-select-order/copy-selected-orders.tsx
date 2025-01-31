import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { useIcuOrderStore } from '@/lib/store/icu/icu-order'
import { Copy } from 'lucide-react'
import React from 'react'

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

    toast({
      title: '오더 복사 완료',
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
      <Copy />
      복사
    </Button>
  )
}
