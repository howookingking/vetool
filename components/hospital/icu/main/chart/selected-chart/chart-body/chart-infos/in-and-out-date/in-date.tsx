import { LogIn } from 'lucide-react'
import { Label } from '@/components/ui/label'

type Props = {
  inDate: string
  noIcon?: boolean
}

export default function Indate({ inDate, noIcon }: Props) {
  return (
    <div className="flex h-9 w-full select-none items-center gap-2 rounded-md border p-2 font-medium">
      {noIcon ? (
        <Label className="text-xs text-muted-foreground" htmlFor="inDate">
          입원일
        </Label>
      ) : (
        <LogIn className="shrink-0 text-muted-foreground" size={16} />
      )}

      <span className="truncate text-sm sm:text-sm">
        <span>{inDate}</span>
      </span>
    </div>
  )
}
