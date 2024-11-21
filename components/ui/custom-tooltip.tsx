import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip'
import { cn } from '@/lib/utils/utils'

export default function CustomTooltip({
  contents,
  children,
  sideOffset = 10,
  variant = 'primary',
  side = 'top',
  delayDuration = 10,
}: {
  contents: React.ReactNode
  children: React.ReactNode
  sideOffset?: number
  variant?: 'primary' | 'secondary'
  side?: 'top' | 'bottom' | 'left' | 'right'
  delayDuration?: number
}) {
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip>
        <TooltipTrigger asChild className="cursor-pointer">
          {children}
        </TooltipTrigger>
        <TooltipContent
          side={side}
          sideOffset={sideOffset}
          className={cn(
            variant === 'primary'
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground',
          )}
        >
          {contents}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
