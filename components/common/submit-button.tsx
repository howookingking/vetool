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
  ref?: React.RefObject<HTMLButtonElement | null>
}

export default function SubmitButton({
  isPending,
  type = 'submit',
  buttonText,
  onClick,
  variant,
  className,
  disabled,
  ref,
}: Props) {
  return (
    <Button
      type={type}
      disabled={isPending || disabled}
      onClick={onClick}
      size="sm"
      variant={variant}
      className={className}
      ref={ref}
    >
      {buttonText}
      {isPending ? <Spinner /> : null}
    </Button>
  )
}
