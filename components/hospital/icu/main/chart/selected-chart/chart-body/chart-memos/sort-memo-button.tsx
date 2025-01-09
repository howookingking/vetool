import { Button } from '@/components/ui/button'
import { SortAsc, SortDesc } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export default function SortMemoButton({
  sortMemoMethod,
  setSortMemoMethod,
}: {
  sortMemoMethod: string
  setSortMemoMethod: (method: string) => void
}) {
  const desc = sortMemoMethod === 'desc'

  const handleSortMemo = () => {
    setSortMemoMethod(desc ? 'asc' : 'desc')
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
            {desc ? <SortAsc /> : <SortDesc />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{desc ? '새 메모 상단에 추가' : '새 메모 하단에 추가'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
