import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import useIsMobile from '@/hooks/use-is-mobile'
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
  const isMobile = useIsMobile()
  return (
    <TooltipProvider delayDuration={70}>
      <Tooltip>
        <TooltipTrigger asChild className={cn(className, isMobile && 'hidden')}>
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
          className={cn(
            variant === 'help'
              ? 'border-2 border-primary bg-white text-black'
              : 'bg-destructive',
            className,
          )}
        >
          {children}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
