import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils/utils'
import { CircleAlert, CircleHelp } from 'lucide-react'

type Props = {
  children: React.ReactNode
  className?: string
  side?: 'top' | 'bottom' | 'left' | 'right'
  variant?: 'help' | 'warning'
}

export default function HelperTooltip({
  children,
  className,
  side = 'top',
  variant = 'help',
}: Props) {
  return (
    <TooltipProvider delayDuration={70}>
      <Tooltip>
        <TooltipTrigger asChild className={cn(className, 'z-10')}>
          <span className="inline-flex items-center">
            {variant === 'help' ? (
              <CircleHelp className="cursor-pointer text-primary" size={18} />
            ) : (
              <CircleAlert
                className="cursor-pointer text-destructive"
                size={18}
              />
            )}
          </span>
        </TooltipTrigger>

        <TooltipContent
          side={side}
          className={cn(
            variant === 'help'
              ? 'border border-primary bg-white text-inherit'
              : 'border border-destructive bg-white text-inherit',
          )}
        >
          {children}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
