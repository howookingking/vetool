import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { PanelBottomClose, PanelTopClose } from 'lucide-react'
import { type NewMemoAddedTo } from './chart-memos'

type Props = {
  newMemoAddedTo: NewMemoAddedTo
  setNewMemoAddedTo: (
    value: NewMemoAddedTo | ((val: NewMemoAddedTo) => NewMemoAddedTo),
  ) => void
}

export default function NewMemoAddedToButton({
  newMemoAddedTo,
  setNewMemoAddedTo,
}: Props) {
  const handleSortMemo = () => {
    setNewMemoAddedTo(newMemoAddedTo === 'bottom' ? 'top' : 'bottom')
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="absolute -top-1 right-8 h-6 w-6 text-muted-foreground"
            variant="ghost"
            size="icon"
            onClick={handleSortMemo}
          >
            {newMemoAddedTo === 'top' ? (
              <PanelBottomClose />
            ) : (
              <PanelTopClose />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {newMemoAddedTo === 'top'
              ? '새 메모 상단에 추가'
              : '새 메모 하단에 추가'}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
