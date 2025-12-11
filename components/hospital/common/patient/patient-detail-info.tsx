import SpeciesToIcon from '@/components/common/species-to-icon'
import { Species } from '@/constants/hospital/register/signalments'
import { calculateAge, convertPascalCased } from '@/lib/utils/utils'
import type { SelectedIcuChart } from '@/types/icu/chart'

type Props = {
  species: SelectedIcuChart['patient']['species']
  name: SelectedIcuChart['patient']['name']
  breed: SelectedIcuChart['patient']['breed']
  gender: SelectedIcuChart['patient']['gender']
  birth: SelectedIcuChart['patient']['birth']
  weight: SelectedIcuChart['weight']
  weightMeasuredDate: SelectedIcuChart['weight_measured_date']
  isAlive: SelectedIcuChart['patient']['is_alive']
}

export default function PatientDetailInfo({
  species,
  name,
  breed,
  gender,
  birth,
  weight,
  weightMeasuredDate,
  isAlive = true,
}: Props) {
  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <SpeciesToIcon species={species as Species} />
      <div>
        <span>{name}</span>
        {isAlive ? null : <span className="ml-1">🌈</span>}
      </div>
      ·
      <span className="w-12 truncate sm:w-auto">
        {convertPascalCased(breed)}
      </span>
      ·<span className="uppercase">{gender}</span>·
      <span>{calculateAge(birth)} </span>
      <span>·</span>
      <span>
        {weight === '' ? '체중 입력' : `${weight}kg`}

        {weightMeasuredDate && (
          <span className="hidden md:inline">
            {weightMeasuredDate ? `(${weightMeasuredDate})` : ''}
          </span>
        )}
      </span>
    </div>
  )
}
