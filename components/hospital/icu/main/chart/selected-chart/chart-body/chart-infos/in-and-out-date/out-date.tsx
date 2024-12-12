import { LogOut } from 'lucide-react'

export default function OutDate({ outDate }: { outDate: string | null }) {
  return (
    <div className="flex h-9 w-full select-none items-center gap-2 rounded-md border px-2 text-xs md:text-sm">
      <LogOut className="text-muted-foreground" size={16} />
      <span className="md:hidden">{outDate?.slice(2)}</span>
      <span className="hidden md:inline">{outDate}</span>
    </div>
  )
}
