import type { LucideProps } from 'lucide-react'
import type { ForwardRefExoticComponent, RefAttributes } from 'react'
import { Badge } from '../ui/badge'

type Props = {
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
  label: string
}

export default function StepBadge({ icon: Icon, label }: Props) {
  return (
    <Badge variant="secondary" className="h-8">
      {Icon && <Icon style={{ width: 12 }} className="mr-1" />}
      {label}
    </Badge>
  )
}
