import { cn } from '@/lib/utils/utils'
import { Squirrel } from 'lucide-react'

const ICON_SIZE_DIC = {
  sm: 20,
  md: 28,
  lg: 50,
} as const

const TEXT_SIZE_DIC = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-xl font-bold',
} as const

type Props = {
  text: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function NoResultSquirrel({
  text,
  className,
  size = 'md',
}: Props) {
  return (
    <div
      className={cn(
        'flex items-center justify-center gap-2 text-sm text-slate-800',
        TEXT_SIZE_DIC[size],
        className,
      )}
    >
      <Squirrel
        className="transition-transform hover:scale-x-[-1]"
        size={ICON_SIZE_DIC[size]}
      />
      <div>{text}</div>
    </div>
  )
}
