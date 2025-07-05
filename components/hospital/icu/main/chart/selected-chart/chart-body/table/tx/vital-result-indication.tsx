import { ChevronDown, ChevronUp } from 'lucide-react'

export function VitalResultIndication({
  result,
}: {
  result: 'above' | 'below'
}) {
  if (result === 'below') {
    return (
      <ChevronDown
        className="pointer-events-none absolute left-0 top-0 text-blue-500"
        size={14}
        strokeWidth={4}
      />
    )
  }

  if (result === 'above') {
    return (
      <ChevronUp
        className="pointer-events-none absolute left-0 top-0 text-red-500"
        size={14}
        strokeWidth={4}
      />
    )
  }
}
