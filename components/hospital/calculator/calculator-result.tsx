import { Button } from '@/components/ui/button'
import { Copy, CopyCheck } from 'lucide-react'
import { type MouseEvent, useState } from 'react'

type CalculatorResultProps = {
  result: string
  unit?: string
  comment?: string
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
}

export default function CalculatorResult({
  result,
  unit,
  comment,
  onClick,
}: CalculatorResultProps) {
  const [isCopied, setIsCopied] = useState(false)

  return (
    <div className="col-span-2 flex flex-col gap-2 text-center">
      <div className="flex items-center justify-center gap-2">
        <span className="text-lg font-semibold">계산 결과</span>
      </div>

      <div className="flex w-full justify-center gap-2">
        <div className="flex-col">
          <div>
            <span className="text-2xl font-bold text-primary">
              {result}
              {unit && <span className="text-sm font-normal">{unit}</span>}
            </span>
            <Button
              onClick={(e) => {
                setIsCopied(true)
                onClick(e)
              }}
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
      </div>
    </div>
  )
}
