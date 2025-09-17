import { calculateAge, convertPascalCased } from '@/lib/utils/utils'
import { Cat, Dog } from 'lucide-react'

type Props = {
  species: string
  name: string
  breed: string | null
  gender: string
  birth: string
  weight: string | null
  weightMeasuredDate?: string | null
  isAlive?: boolean
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
      {species === 'canine' ? <Dog size={20} /> : <Cat size={20} />}
      <div>
        <span>{name}</span>
        {!isAlive && <span className="ml-1">🌈</span>}
      </div>
      ·
      <span className="w-12 truncate sm:w-auto">
        {convertPascalCased(breed)}
      </span>
      ·<span className="uppercase">{gender}</span>·
      <span>{calculateAge(birth)} </span>
      <span>·</span>
      <span>
        {/* TODO: icu에서도 로직 변경시 여기 부분 수정해야함 */}
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
