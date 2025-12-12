import type { Species } from '@/constants/hospital/register/signalments'
import { CatIcon, DogIcon } from 'lucide-react'

type Props = {
  species: Species
  size?: number
}

export default function SpeciesToIcon({ species, size = 16 }: Props) {
  return (
    <>
      {species === 'canine' ? (
        <DogIcon
          style={{
            width: size,
            height: size,
          }}
        />
      ) : (
        <CatIcon
          style={{
            width: size,
            height: size,
          }}
        />
      )}
    </>
  )
}
