import { Button } from '@/components/ui/button'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import { cn } from '@/lib/utils/utils'
import { LoaderCircle } from 'lucide-react'

type Props = {
  isPending: boolean
  handleClick?: () => Promise<void>
  type?: 'button' | 'submit' | 'reset'
  buttonName: string
  className?: string
}

export default function CommonDialogFooter({
  isPending,
  handleClick,
  type = 'button',
  buttonName,
  className,
}: Props) {
  return (
    <DialogFooter className={cn('ml-auto', className)}>
      <DialogClose asChild>
        <Button tabIndex={-1} variant="secondary">
          닫기
        </Button>
      </DialogClose>

      <Button type={type} onClick={handleClick} disabled={isPending}>
        {buttonName}
        <LoaderCircle
          className={cn(isPending ? 'ml-2 animate-spin' : 'hidden')}
        />
      </Button>
    </DialogFooter>
  )
}
