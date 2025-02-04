import { Star } from 'lucide-react'

export default function UrgencyStarts({ urgency }: { urgency: number | null }) {
  if (!urgency) return null

  return (
    <div className="absolute right-0.5 top-0.5 flex">
      {[...Array(urgency)].map((_, index) => (
        <Star
          key={index}
          style={{ width: 9, height: 9 }}
          className="fill-yellow-400 text-yellow-400"
        />
      ))}
    </div>
  )
}
