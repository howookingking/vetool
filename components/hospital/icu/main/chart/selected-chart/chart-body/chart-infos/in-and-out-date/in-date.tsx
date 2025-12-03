import { LogInIcon } from 'lucide-react'

export default function Indate({ inDate }: { inDate: string }) {
  return (
    <div className="flex h-9 select-none items-center gap-2 whitespace-nowrap rounded-md border p-2 shadow-sm">
      <LogInIcon className="shrink-0 text-muted-foreground" size={16} />
      <span className="text-sm">{inDate}</span>
    </div>
  )
}
