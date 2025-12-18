import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export function TxDetailHover({ txComment }: { txComment: string }) {
  return (
    <TooltipProvider delayDuration={10}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="absolute right-0 top-0 z-10 m-0 h-0 w-0 cursor-pointer rounded-none border-l-[10px] border-t-[10px] border-l-transparent border-t-amber-400" />
        </TooltipTrigger>
        <TooltipContent
          side="right"
          sideOffset={0}
          className="border border-amber-400 bg-white text-inherit"
        >
          <p className="max-w-[200px]">{txComment}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
