import { ButtonHTMLAttributes } from 'react'
import { Button } from '../ui/button'
import { Spinner } from '../ui/spinner'

type Props = {
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  isPending: boolean
  buttonText: string
  onClick?: () => void
}

export default function SubmitButton({
  isPending,
  type = 'submit',
  buttonText,
  onClick,
}: Props) {
  return (
    <Button type={type} disabled={isPending} onClick={onClick}>
      {buttonText}
      {isPending && <Spinner />}
    </Button>
  )
}
