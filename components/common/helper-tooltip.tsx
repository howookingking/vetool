import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils/utils'
import { CircleAlert, CircleHelp } from 'lucide-react'

export default function HelperTooltip({
  children,
  className,
  side = 'top',
  variant = 'help',
}: {
  children: React.ReactNode
  className?: string
  side?: 'top' | 'bottom' | 'left' | 'right'
  variant?: 'help' | 'warning'
}) {
  return (
    <TooltipProvider delayDuration={70}>
      <Tooltip>
        <TooltipTrigger asChild className={className}>
          {variant === 'help' ? (
            <CircleHelp className="cursor-pointer text-primary" size={18} />
          ) : (
            <CircleAlert
              className="cursor-pointer text-destructive"
              size={18}
            />
          )}
        </TooltipTrigger>
        <TooltipContent
          side={side}
          className={cn(variant === 'help' ? '' : 'bg-destructive')}
        >
          <div>{children}</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
