import CalculatorSheet from '@/components/hospital/calculator/calculator-sheet'
import Feedback from '@/components/hospital/feedback/feedback'
import DesktopSidebarItem from '@/components/hospital/sidebar/desktop/desktop-sidebar-item'
import SidebarUserDropdown from '@/components/hospital/sidebar/sidebar-user-dropdown'
import type { Plan } from '@/constants/plans'
import type { VetoolUser } from '@/types'
import { SIDEBAR_MENUS } from '../hospital-sidebar'

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
        {SIDEBAR_MENUS.map(({ icon, isReady, name, path }) => (
          <DesktopSidebarItem
            hosId={hosId}
            name={name}
            path={path}
            key={name}
            isReady={isReady}
            icon={icon}
            isSuper={vetoolUser.is_super}
          />
        ))}
      </ul>

      <div className="flex flex-col items-center justify-end gap-1">
        <CalculatorSheet plan={plan} />

        <Feedback />

        <SidebarUserDropdown hosId={hosId} vetoolUser={vetoolUser} />
      </div>
    </aside>
  )
}
