import { cn } from '@/lib/utils/utils'
import { SearchX } from 'lucide-react'

export default function NoResult({
  title,
  className,
  ...rest
}: {
  title: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex w-full flex-col items-center justify-center gap-4 text-center text-xl font-bold',
        className,
      )}
      {...rest}
    >
      <SearchX className="text-primary" size={64} />
      <span>{title}</span>
    </div>
  )
}
