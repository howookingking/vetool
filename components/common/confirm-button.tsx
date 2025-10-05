import { LoaderCircleIcon } from 'lucide-react'
import { Button } from '../ui/button'

type Props = {
  buttonText?: string
  onClick: () => void
  isLoading: boolean
}

export default function ConfirmButton({
  buttonText = '확인',
  onClick,
  isLoading,
}: Props) {
  return (
    <Button onClick={onClick} disabled={isLoading} className="w-14">
      {isLoading ? <LoaderCircleIcon className="animate-spin" /> : buttonText}
    </Button>
  )
}
