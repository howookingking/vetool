import { Button } from '@/components/ui/button'
import { CopyCheckIcon, CopyIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export default function CopyButton({ copyResult }: { copyResult: string }) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopyResult = () => {
    setIsCopied(true)

    if (copyResult) {
      navigator.clipboard.writeText(copyResult.toString())

      toast.success('계산 결과가 클립보드에 복사되었습니다')
    }
  }

  return (
    <Button
      onClick={handleCopyResult}
      className="xl:text-xs 2xl:text-sm"
      variant="ghost"
      size="icon"
    >
      {isCopied ? (
        <CopyCheckIcon className="h-4 w-4" />
      ) : (
        <CopyIcon className="h-4 w-4" />
      )}
    </Button>
  )
}
