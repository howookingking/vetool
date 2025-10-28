import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ClipboardIcon, ClipboardCheckIcon, CheckIcon } from 'lucide-react'

type Props = {
  handleClick: () => void
  isCopied: boolean
  leftOrderCountsAtTime: number
}

export default function TimeTxTextCopy({
  handleClick,
  isCopied,
  leftOrderCountsAtTime,
}: Props) {
  return (
    <Button
      variant="outline"
      className="ml-1 h-6 w-6 text-muted-foreground shadow-none"
      size="sm"
      onClick={handleClick}
    >
      {isCopied ? (
        <CheckIcon style={{ width: 12, height: 12 }} />
      ) : (
        <span className="text-[10px]"> {leftOrderCountsAtTime}</span>
      )}
    </Button>
  )
}
