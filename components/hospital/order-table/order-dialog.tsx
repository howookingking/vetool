import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import { ReactNode } from 'react'

export default function OrderDialog({
  isOpen,
  onOpenChange,
  children,
}: {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  children: ReactNode
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-0.5"
        >
          <Plus size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>오더 수정</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        {isOpen ? children : null}
      </DialogContent>
    </Dialog>
  )
}
