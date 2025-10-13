import { cn } from '@/lib/utils/utils'

type Props = {
  label: string
  name: string
}

export default function VetName({ label, name }: Props) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className={cn(name === '미선택' && 'text-muted-foreground')}>
        {name}
      </span>
    </div>
  )
}
