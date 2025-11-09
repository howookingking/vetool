import { ButtonHTMLAttributes } from 'react'
import { Button } from '../ui/button'
import { Spinner } from '../ui/spinner'

type Props = {
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  isPending: boolean
  buttonText: string
  onClick?: () => void
  className?: string
}

export default function SubmitButton({
  isPending,
  type = 'submit',
  buttonText,
  onClick,
  className,
}: Props) {
  return (
    <Button
      type={type}
      disabled={isPending}
      onClick={onClick}
      size="sm"
      className={className}
    >
      {buttonText}
      {isPending && <Spinner />}
    </Button>
  )
}
