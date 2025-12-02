import { LogOut } from 'lucide-react'

export default function OutDate({ outDate }: { outDate: string | null }) {
  return (
    <div className="flex h-9 w-full select-none items-center gap-2 rounded-md border px-2 text-xs font-medium md:col-span-1 md:text-sm">
      <LogOut className="text-muted-foreground" size={16} />
      <span className="truncate text-sm">
        <span>{outDate}</span>
      </span>
    </div>
  )
}
