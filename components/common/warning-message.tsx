import { cn } from '@/lib/utils/utils'
import { AlertCircle } from 'lucide-react'

export default function WarningMessage({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  return (
    <span className={cn(className, 'flex items-center gap-1 text-destructive')}>
      <AlertCircle size={18} /> {text}
    </span>
  )
}
