import type { Plan } from '@/constants/plans'
import type { VetoolUser } from '@/types'
import MobileSidebar from './mobile-sidebar'

type Props = {
  hosId: string
  vetoolUser: VetoolUser
  plan: Plan
}

export default function MobileLayout({ hosId, vetoolUser, plan }: Props) {
  return (
    <div className="fixed z-30 h-12 w-full border-b bg-white 2xl:hidden">
      <MobileSidebar hosId={hosId} vetoolUser={vetoolUser} plan={plan} />
    </div>
  )
}
