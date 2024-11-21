import { cn } from '@/lib/utils/utils'
import { Squirrel } from 'lucide-react'

const ICON_SIZE_MAP = {
  sm: 20,
  md: 28,
  lg: 50,
} as const

const TEXT_SIZE_MAP = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-xl font-bold',
} as const

export default function NoResultSquirrel({
  text,
  className,
  size = 'md',
}: {
  text: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}) {
  return (
    <div
      className={cn(
        'flex items-center justify-center gap-2 text-sm text-slate-800',
        TEXT_SIZE_MAP[size],
        className,
      )}
    >
      <Squirrel className="hover:scale-x-[-1]" size={ICON_SIZE_MAP[size]} />
      <span>{text}</span>
    </div>
  )
}
