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
    <aside className="item-center fixed z-50 hidden h-screen w-10 flex-col justify-between border-r py-1 2xl:flex">
      <ul className="flex flex-col items-center gap-1">
        {SIDEBAR_ITEMS.map((item) => (
          <DesktopSidebarItem
            hosId={hosId}
            name={item.name}
            path={item.path}
            key={item.name}
            isReady={item.isReady}
            icon={item.icon}
            isSuper={vetoolUser.is_super}
          />
        ))}
      </ul>

      <div className="flex flex-col items-center justify-end gap-1">
        <CalculatorSheet plan={plan} />
        <Feedback />
        <SidebarUserInfo hosId={hosId} vetoolUser={vetoolUser} />
      </div>
    </aside>
  )
}
