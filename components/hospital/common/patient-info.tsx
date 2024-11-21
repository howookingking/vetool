import { convertPascalCased, cn } from '@/lib/utils/utils'
import { Cat, Dog } from 'lucide-react'

export default function PatientInfo({
  name,
  species,
  breed,
  iconSize = 16,
  className,
  col = false,
  isDone = false,
}: {
  name: string
  species: string
  breed: string | null
  iconSize?: number
  className?: string
  col?: boolean
  isDone?: boolean
}) {
  const Icon = species === 'canine' ? Dog : Cat

  return (
    <div
      className={cn(`${className}`, !col && 'flex w-full items-center gap-1')}
    >
      <div className={cn('flex items-center gap-1', col && 'justify-center')}>
        <Icon size={iconSize} />

        <div className={cn('flex items-center gap-1', !col && 'line-clamp-1')}>
          <span className={cn(isDone && 'line-through')}>{name}</span>
          {!col && (
            <span
              className={cn(
                'pl-1 text-xs text-muted-foreground',
                isDone && 'line-through',
              )}
            >
              {convertPascalCased(breed)}
            </span>
          )}
        </div>
      </div>
      {col && (
        <div className="line-clamp-1 text-[10px] text-muted-foreground">
          {convertPascalCased(breed)}
        </div>
      )}
    </div>
  )
}
