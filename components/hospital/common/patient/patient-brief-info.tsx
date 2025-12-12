import SpeciesToIcon from '@/components/common/species-to-icon'
import type { Species } from '@/constants/hospital/register/signalments'
import { cn, convertPascalCased } from '@/lib/utils/utils'

type Props = {
  name: string
  species: Species
  breed: string
  width?: number
  className?: string
}

export default function PatientBriefInfo({
  name,
  species,
  breed,
  width = 80,
  className,
}: Props) {
  return (
    <div
      className={cn('mx-auto flex flex-col items-center gap-0.5', className)}
      style={{
        width,
      }}
    >
      <div className="flex items-center gap-1">
        <SpeciesToIcon species={species} />
        <span>{name}</span>
      </div>

      <div className="truncate text-center text-xs" style={{ width }}>
        {convertPascalCased(breed)}
      </div>
    </div>
  )
}
