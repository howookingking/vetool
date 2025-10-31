import UnReadCounts from '@/components/hospital/common/unread-counts'
import { Button } from '@/components/ui/button'
import { ClipboardCheckIcon, ClipboardIcon } from 'lucide-react'

type Props = {
  handleClick: () => void
  isCopied: boolean
  leftOrderCountsAtTime: number
}

export default function LettOrderCountsAndCopyTxButton({
  handleClick,
  isCopied,
  leftOrderCountsAtTime,
}: Props) {
  return (
    <>
      <UnReadCounts counts={leftOrderCountsAtTime} />

      <Button
        variant="ghost"
        className="h-7 w-7 text-muted-foreground shadow-none"
        size="sm"
        onClick={handleClick}
      >
        {isCopied ? (
          <ClipboardCheckIcon style={{ width: 14 }} />
        ) : (
          <ClipboardIcon style={{ width: 14 }} />
        )}
      </Button>
    </>
  )
}
