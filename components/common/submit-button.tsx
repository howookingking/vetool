import { cn } from '@/lib/utils/utils'
import { VariantProps } from 'class-variance-authority'
import { ButtonHTMLAttributes } from 'react'
import { Button, buttonVariants } from '../ui/button'
import { Spinner } from '../ui/spinner'

type Props = {
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  isPending: boolean
  buttonText: string
  onClick?: () => void
  className?: string
  variant?: VariantProps<typeof buttonVariants>['variant']
  disabled?: boolean
}

export default function SubmitButton({
  isPending,
  type = 'submit',
  buttonText,
  onClick,
  variant,
  className,
  disabled,
}: Props) {
  return (
    <Button
      type={type}
      disabled={isPending || disabled}
      onClick={onClick}
      size="sm"
      className={cn(buttonVariants({ variant }), className)}
    >
      {buttonText}
      {isPending ? <Spinner /> : null}
    </Button>
  )
}
