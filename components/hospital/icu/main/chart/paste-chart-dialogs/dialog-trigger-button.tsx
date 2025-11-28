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
  hiddenOnMobile?: boolean
  isLoading?: boolean
  className?: string
}

export default function DialogTriggerButton({
  icon: Icon,
  title,
  hiddenOnMobile,
  isLoading = false,
  className,
}: Props) {
  return (
    <DialogTrigger asChild className="relative">
      <Button
        disabled={isLoading}
        size="default"
        variant="outline"
        className={cn(
          'flex h-60 w-60 items-center justify-center gap-2',
          hiddenOnMobile && 'hidden md:flex',
          className,
        )}
      >
        <Icon />
        {title}
        {isLoading && <Spinner />}
      </Button>
    </DialogTrigger>
  )
}
