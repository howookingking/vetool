import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export function TxDetailHover({ txComment }: { txComment?: string | null }) {
  return (
    <TooltipProvider delayDuration={10}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="absolute right-0 top-0 z-10 m-0 h-0 w-0 rounded-none border-l-[10px] border-t-[10px] border-l-transparent border-t-amber-300 p-0"
            variant="ghost"
          />
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="max-w-sm bg-white text-black ring ring-amber-300"
        >
          <p className="whitespace-pre-line text-sm">{txComment}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
