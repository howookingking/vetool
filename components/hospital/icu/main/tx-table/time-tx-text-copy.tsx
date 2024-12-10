import { Button } from '@/components/ui/button'
import { Clipboard, ClipboardCheck } from 'lucide-react'

export default function TimeTxTextCopy({
  handleClick,
  isCopied,
}: {
  handleClick: () => void
  isCopied: boolean
}) {
  return (
    <Button
      variant="outline"
      size="icon"
      className="ml-1 h-7 w-7"
      onClick={handleClick}
    >
      {isCopied ? <ClipboardCheck /> : <Clipboard />}
    </Button>
  )
}
