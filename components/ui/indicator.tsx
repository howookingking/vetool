import * as React from 'react'
import { cn } from '@/lib/utils/utils'

interface Indicator extends React.HTMLAttributes<HTMLDivElement> {
  steps: number
  currentStep: number
  onStepClick?: (step: number) => void
}

/**
 * 스텝 인디케이터
 * @param steps 스텝 수
 * @param currentStep 현재 스텝
 * @param onStepClick 스텝 클릭 시 호출되는 함수
 * @param className 추가적인 클래스 이름
 * @returns
 */
const Indicator = ({
  steps,
  currentStep,
  onStepClick,
  className,
  ...props
}: Indicator) => {
  return (
    <div className={cn('flex w-full gap-2', className)} {...props}>
      {Array.from({ length: steps }).map((_, index) => (
        <button
          key={index}
          onClick={() => onStepClick?.(index)}
          className={cn(
            'h-2 w-2 rounded-full transition-colors',
            'hover:bg-primary/80',
            index === currentStep
              ? 'bg-primary'
              : 'bg-muted hover:bg-muted-foreground/20',
          )}
          disabled={!onStepClick}
        />
      ))}
    </div>
  )
}

export { Indicator }
