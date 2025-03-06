import { Dog } from 'lucide-react'
import { Cat } from 'lucide-react'

export default function DietSpeciesIcon({ species }: { species: string }) {
  return (
    <div className="flex items-center gap-2">
      {(species === 'canine' || species === 'both') && <Dog size={18} />}
      {(species === 'feline' || species === 'both') && <Cat size={18} />}
    </div>
  )
}
