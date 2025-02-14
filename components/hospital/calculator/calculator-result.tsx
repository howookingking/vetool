import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { Copy, CopyCheck } from 'lucide-react'
import { useState } from 'react'

type Props = {
  displayResult: React.ReactNode
  copyResult: string
  comment?: string
}

export default function CalculatorResult({
  displayResult,
  copyResult,
  comment,
}: Props) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopyResult = () => {
    setIsCopied(true)

    if (copyResult) {
      navigator.clipboard.writeText(copyResult.toString())

      toast({
        title: '계산 결과가 클립보드에 복사되었습니다.',
      })
    }
  }

  return (
    <div className="flex w-full flex-col items-center justify-center rounded-md bg-slate-100 py-4 text-lg">
      <div className="flex items-center gap-1">
        {displayResult}

        <Button
          onClick={handleCopyResult}
          className="xl:text-xs 2xl:text-sm"
          variant="ghost"
          size="icon"
        >
          {isCopied ? (
            <CopyCheck className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>

      {comment && <span className="text-sm font-normal">{comment}</span>}
    </div>
  )
}
