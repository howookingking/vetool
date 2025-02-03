import { calculateAge, convertPascalCased } from '@/lib/utils/utils'
import { Cat, Dog } from 'lucide-react'

type PatientDetailInfoProps = {
  species: string
  name: string
  breed: string | null
  gender: string
  birth: string
  weight: string
  weightMeasuredDate?: string | null
}

export default function PatientDetailInfo({
  species,
  name,
  breed,
  gender,
  birth,
  weight,
  weightMeasuredDate,
}: PatientDetailInfoProps) {
  return (
    <div className="flex items-center gap-2">
      {species === 'canine' ? <Dog size={20} /> : <Cat size={20} />}
      <span>{name}</span>·
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
