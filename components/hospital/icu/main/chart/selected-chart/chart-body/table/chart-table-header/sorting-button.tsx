import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/utils'
import { ArrowUpDownIcon } from 'lucide-react'

type Props = {
  isSorting: boolean
  onClick: () => void
}

export default function SortingButton({ isSorting, onClick }: Props) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        isSorting ? 'animate-pulse text-primary' : null,
        'hidden shrink-0 md:flex',
      )}
      onClick={onClick}
    >
      <ArrowUpDownIcon size={18} />
    </Button>
  )
}
