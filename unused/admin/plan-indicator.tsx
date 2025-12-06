import { Badge } from '@/components/ui/badge'
import type { Plan } from '@/constants/company/plans'

type Props = {
  plan: Plan
  invitableVetCount: number
  maxVets: number
}

export default function PlanIndicator({
  plan,
  invitableVetCount,
  maxVets,
}: Props) {
  const planConfig = {
    mild: {
      label: 'Mild',
      variant: 'secondary' as const,
    },
    moderate: {
      label: 'Moderate',
      variant: 'default' as const,
    },
    severe: {
      label: 'Severe',
      variant: 'destructive' as const,
    },
    free: {
      label: 'Free',
      variant: 'secondary' as const,
    },
  }

  return (
    <div className="flex h-10 w-full items-center justify-between rounded-md border bg-card px-4 text-card-foreground">
      <div className="flex items-center gap-3">
        <Badge variant={planConfig[plan].variant}>
          {planConfig[plan].label}
        </Badge>
      </div>
      <div className="text-sm text-muted-foreground">
        등록할 수 있는 수의사 수:{' '}
        <span className="font-medium text-foreground">
          {invitableVetCount}명 / {maxVets}명
        </span>
      </div>
    </div>
  )
}
