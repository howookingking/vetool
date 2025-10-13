import { Star } from 'lucide-react'

export default function UrgencyStarts({ urgency }: { urgency: number | null }) {
  if (!urgency) return null

  return (
    <div className="absolute right-[1px] top-0 flex">
      {[...Array(urgency)].map((_, index) => (
        <Star
          key={index}
          style={{ width: 8, height: 8 }}
          className="fill-yellow-400 text-yellow-400"
        />
      ))}
    </div>
  )
}
