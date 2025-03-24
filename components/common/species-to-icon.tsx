import { type Species } from '@/types/hospital/calculator'
import { Cat, Dog } from 'lucide-react'

export default function SpeciesToIcon({ species }: { species: Species }) {
  return (
    <>
      {species === 'canine' ? (
        <Dog className="mx-auto" size={20} />
      ) : (
        <Cat className="mx-auto" size={20} />
      )}
    </>
  )
}
