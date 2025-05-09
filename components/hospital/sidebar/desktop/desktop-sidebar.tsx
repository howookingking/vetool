import CalculatorSheet from '@/components/hospital/calculator/calculator-sheet'
import Feedback from '@/components/hospital/feedback/feedback'
import DesktopSidebarItem from '@/components/hospital/sidebar/desktop/desktop-sidebar-item'
import SidebarUserInfo from '@/components/hospital/sidebar/sidebar-user-info'
import { SIDEBAR_ITEMS } from '@/constants/hospital/sidebar-items'
import type { Plan } from '@/constants/plans'
import type { VetoolUser } from '@/types'

type Props = {
  hosId: string
  vetoolUser: VetoolUser
  plan: Plan
}

export default async function DesktopSidebar({
  hosId,
  vetoolUser,
  plan,
}: Props) {
  return (
    <aside className="item-center fixed left-0 top-0 z-50 hidden h-screen w-10 flex-col justify-between border-r bg-white 2xl:flex">
      <ul className="mt-1 flex flex-col items-center gap-2">
        {SIDEBAR_ITEMS.map((item) => (
          <DesktopSidebarItem
            name={item.name}
            path={item.path}
            key={item.name}
            isReady={item.isReady}
            icon={item.icon}
            isSuper={vetoolUser.is_super}
          />
        ))}
      </ul>

      <div className="mb-2 flex flex-col items-center justify-end gap-2">
        <CalculatorSheet plan={plan} />
        <Feedback />
        <SidebarUserInfo hosId={hosId} vetoolUser={vetoolUser} />
      </div>
    </aside>
  )
}
