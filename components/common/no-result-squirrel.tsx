import { cn } from '@/lib/utils/utils'
import { Squirrel } from 'lucide-react'

const ICON_SIZE_DIC = {
  sm: 18,
  md: 24,
  lg: 30,
} as const

const TEXT_SIZE_DIC = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
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
        'flex items-center justify-center gap-2 text-sm',
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
