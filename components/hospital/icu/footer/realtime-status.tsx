import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils/utils'

export default function RealtimeStatus({
  isSubscriptionReady,
}: {
  isSubscriptionReady: boolean
}) {
  return (
    <TooltipProvider delayDuration={30}>
      <Tooltip>
        <TooltipTrigger asChild className="cursor-pointer">
          <div className="ml-2 flex items-center gap-1">
            <span className="text-xs text-muted-foreground">실시간</span>
            <div
              className={cn(
                'h-2 w-2 rounded-full',
                isSubscriptionReady
                  ? 'animate-pulse bg-green-500'
                  : 'bg-red-500',
              )}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent
          className={cn(
            isSubscriptionReady ? 'bg-green-500' : 'bg-red-500',
            'ml-14 px-1.5 font-semibold',
          )}
        >
          {isSubscriptionReady
            ? '실시간 변경을 감지하고 있습니다'
            : '실시간 변경을 감지하지 못하고 있습니다'}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
