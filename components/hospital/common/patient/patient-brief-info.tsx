import SpeciesToIcon from '@/components/common/species-to-icon'
import { convertPascalCased } from '@/lib/utils/utils'
import type { Species } from '@/types/hospital/calculator'

type Props = {
  name: string
  species: Species
  breed: string
  iconSize?: number
}

export default function PatientBriefInfo({
  name,
  species,
  breed,
  iconSize = 16,
}: Props) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div className="flex items-center gap-1">
        <SpeciesToIcon species={species} size={iconSize} />
        <span>{name}</span>
      </div>

      <div className="max-w-20 truncate text-center text-xs">
        {convertPascalCased(breed)}
      </div>
    </div>
  )
}
