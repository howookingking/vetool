import { Badge } from '@/components/ui/badge'

export default function GroupBadge({
  currentGroups,
}: {
  currentGroups: string[]
}) {
  return (
    <ul className="flex items-center gap-1">
      {currentGroups.map((group) => (
        <li key={group}>
          <Badge variant="outline" className="m-0">
            {group}
          </Badge>
        </li>
      ))}
    </ul>
  )
}
