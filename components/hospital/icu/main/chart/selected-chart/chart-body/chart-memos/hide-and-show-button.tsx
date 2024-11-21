import { Button } from '@/components/ui/button'
import { Eye, EyeOff } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'

export default function HideAndShowButton({
  showMemos,
  setShowMemos,
}: {
  showMemos: boolean
  setShowMemos: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <Button
      className="absolute -top-1 right-1 h-6 w-6 text-muted-foreground"
      size="icon"
      variant="ghost"
      onClick={() => setShowMemos((prev) => !prev)}
    >
      {showMemos ? <Eye size={14} /> : <EyeOff size={14} />}
    </Button>
  )
}
