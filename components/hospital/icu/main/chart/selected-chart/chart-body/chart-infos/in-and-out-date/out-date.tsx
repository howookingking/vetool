import { LogOut } from 'lucide-react'
import { Label } from '@/components/ui/label'

export default function OutDate({
  outDate,
  noIcon,
}: {
  outDate: string | null
  noIcon?: boolean
}) {
  return (
    <div className="flex h-9 w-full select-none items-center gap-2 rounded-md border px-2 text-xs font-medium md:col-span-1 md:text-sm">
      {noIcon ? (
        <Label className="text-xs text-muted-foreground" htmlFor="outDate">
          퇴원일
        </Label>
      ) : (
        <LogOut className="text-muted-foreground" size={16} />
      )}
      <span className="truncate text-xs sm:text-sm">
        <span className="2xl:hidden">{outDate?.slice(2)}</span>
        <span className="hidden 2xl:inline">{outDate}</span>
      </span>
    </div>
  )
}
