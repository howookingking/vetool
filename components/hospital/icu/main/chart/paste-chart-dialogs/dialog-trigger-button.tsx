import NewFeature from '@/components/common/new-feature'
import { Button } from '@/components/ui/button'
import { DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils/utils'
import type { LucideProps } from 'lucide-react'
import type { ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react'

type Props = {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
  title: ReactNode
  className?: string
  disabled?: boolean
}

export default function DialogTriggerButton({
  icon: Icon,
  title,
  className,
  disabled,
}: Props) {
  return (
    <DialogTrigger asChild className="relative">
      <Button
        disabled={disabled}
        size="lg"
        variant="outline"
        className={cn('flex w-60 py-6', className)}
      >
        <Icon
          className="absolute left-4 top-1/2 -translate-y-1/2"
          style={{ width: 20, height: 20 }}
        />
        <NewFeature
          className={
            title === '과거 차트 붙여넣기' ? '-right-2 -top-1' : 'hidden'
          }
        >
          <span className="ml-6 text-base">{title}</span>
        </NewFeature>
      </Button>
    </DialogTrigger>
  )
}
