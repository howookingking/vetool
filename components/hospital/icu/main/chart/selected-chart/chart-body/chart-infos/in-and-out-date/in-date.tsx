import { LogIn } from 'lucide-react'

export default function Indate({ inDate }: { inDate: string }) {
  return (
    <div className="flex h-9 w-full select-none items-center gap-2 rounded-md border px-2">
      <LogIn className="text-muted-foreground" size={16} />
      <span className="text-xs 2xl:text-sm">
        <span className="2xl:hidden">{inDate.slice(2)}</span>
        <span className="hidden 2xl:inline">{inDate}</span>
      </span>
    </div>
  )
}
