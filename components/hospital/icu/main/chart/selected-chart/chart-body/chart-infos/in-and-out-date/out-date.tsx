import { LogOutIcon } from 'lucide-react'

export default function OutDate({ outDate }: { outDate: string | null }) {
  return (
    <div className="flex h-9 select-none items-center gap-2 whitespace-nowrap rounded-md border p-2 shadow-sm">
      <LogOutIcon className="text-muted-foreground" size={16} />
      <span className="text-sm">{outDate}</span>
    </div>
  )
}
