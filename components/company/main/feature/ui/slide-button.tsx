import { cn } from '@/lib/utils/utils'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { type ReactNode } from 'react'

const slideButtonVariants = cva(
  'relative justify-center z-0 flex h-9 items-center gap-2 overflow-hidden rounded-md border-[2px] px-4 py-2 font-semibold uppercase transition-all duration-500 before:absolute before:inset-0 before:-z-10 before:translate-x-[150%] before:translate-y-[150%] before:scale-[2.5] before:rounded-[100%] before:transition-transform before:duration-1000 before:content-[""] hover:scale-105 active:scale-95',
  {
    variants: {
      variant: {
        primary:
          'border-primary bg-primary text-white before:bg-white hover:text-primary hover:before:translate-x-[0%] hover:before:translate-y-[0%]',
        outline:
          'border-primary text-primary before:bg-primary hover:text-white hover:before:translate-x-[0%] hover:before:translate-y-[0%]',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
)

type Props = {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'outline'
  asChild?: boolean
  className?: string
}

export default function SlideButton({
  onClick,
  children,
  variant,
  asChild,
  className,
}: Props) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      onClick={onClick}
      className={cn(slideButtonVariants({ variant }), className)}
    >
      {children}
    </Comp>
  )
}
