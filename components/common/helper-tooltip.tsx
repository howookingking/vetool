import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { CircleHelp } from 'lucide-react'

export default function HelperTooltip({
  children,
  className,
  side = 'top',
}: {
  children: React.ReactNode
  className?: string
  side?: 'top' | 'bottom' | 'left' | 'right'
}) {
  return (
    <TooltipProvider delayDuration={70}>
      <Tooltip>
        <TooltipTrigger asChild className={className}>
          <CircleHelp className="cursor-pointer text-primary" size={18} />
        </TooltipTrigger>
        <TooltipContent side={side}>
          <div>{children}</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
