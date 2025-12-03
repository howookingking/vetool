import { Button } from '@/components/ui/button'
import { DialogTrigger } from '@/components/ui/dialog'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils/utils'
import type { LucideProps } from 'lucide-react'
import type { ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react'

type Props = {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
  title: ReactNode
  isLoading?: boolean
  className?: string
  disabled?: boolean
}

export default function DialogTriggerButton({
  icon: Icon,
  title,
  isLoading = false,
  className,
  disabled,
}: Props) {
  return (
    <DialogTrigger asChild className="relative">
      <Button
        disabled={isLoading || disabled}
        size="lg"
        variant="outline"
        className={cn('flex w-60 py-6', className)}
      >
        {isLoading ? (
          <Spinner
            className="absolute left-4 top-4"
            style={{ width: 20, height: 20 }}
          />
        ) : (
          <Icon
            className="absolute left-4 top-1/2 -translate-y-1/2"
            style={{ width: 20, height: 20 }}
          />
        )}

        <span className="ml-6 text-base">{title}</span>
      </Button>
    </DialogTrigger>
  )
}
