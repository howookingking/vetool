import { Badge } from '@/components/ui/badge'

export default function GroupBadge({
  currentGroups,
}: {
  currentGroups: string[]
}) {
  return (
    <ul className="flex flex-wrap items-center gap-1">
      {currentGroups.map((group) => (
        <li key={group}>
          <Badge variant="outline">{group}</Badge>
        </li>
      ))}
    </ul>
  )
}
