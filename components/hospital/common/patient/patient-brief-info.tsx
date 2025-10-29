import SpeciesToIcon from '@/components/common/species-to-icon'
import { convertPascalCased } from '@/lib/utils/utils'
import type { Species } from '@/types/hospital/calculator'

type Props = {
  name: string
  species: Species
  breed: string
}

export default function PatientBriefInfo({ name, species, breed }: Props) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div className="flex items-center gap-1">
        <SpeciesToIcon species={species} />
        <span>{name}</span>
      </div>

      <div className="max-w-20 truncate text-center text-xs">
        {convertPascalCased(breed)}
      </div>
    </div>
  )
}
