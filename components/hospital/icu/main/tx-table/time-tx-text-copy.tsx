import { Button } from '@/components/ui/button'
import { Clipboard, ClipboardCheck } from 'lucide-react'

type Props = {
  handleClick: () => void
  isCopied: boolean
}

export default function TimeTxTextCopy({ handleClick, isCopied }: Props) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="ml-1 h-7 w-7"
      onClick={handleClick}
    >
      {isCopied ? <ClipboardCheck /> : <Clipboard />}
    </Button>
  )
}
