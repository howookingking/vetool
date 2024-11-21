import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import { CircleHelp, CircleAlert } from 'lucide-react'

export default function HelperTooltip({
  children,
  className,
  variant,
}: {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'destructive'
}) {
  const IconComponent = variant === 'default' ? CircleHelp : CircleAlert

  const tooltipTriggerVariants = cva('cursor-pointer text-primary', {
    variants: {
      variant: {
        default: 'text-primary',
        destructive: 'text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  })

  const tooltipContentVariants = cva('', {
    variants: {
      variant: {
        default: 'text-white',
        destructive: 'text-white bg-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  })

  return (
    <TooltipProvider delayDuration={70}>
      <Tooltip>
        <TooltipTrigger
          asChild
          className={cn(tooltipTriggerVariants({ variant, className }))}
        >
          <IconComponent className="cursor-pointer" size={18} />
        </TooltipTrigger>

        <TooltipContent className={cn(tooltipContentVariants({ variant }))}>
          <p>{children}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
