import { LogIn } from 'lucide-react'

export default function Indate({ inDate }: { inDate: string }) {
  return (
    <div className="flex h-9 w-full select-none items-center gap-2 rounded-md border p-2 font-medium">
      <LogIn className="shrink-0 text-muted-foreground" size={16} />

      <span className="truncate text-xs 2xl:text-sm">
        <span className="hidden 2xl:inline">{inDate}</span>

        <span className="2xl:hidden">{inDate.slice(2)}</span>
      </span>
    </div>
  )
}
