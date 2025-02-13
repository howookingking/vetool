import { HOMEPAGE_NAVBAR_ITEMS } from '@/constants/company/nav/nav'
import FlyoutMenu from '@/components/ui/flyout-menu'

export default function NavMenu() {
  return (
    <ul className="hidden items-center gap-6 md:flex">
      {HOMEPAGE_NAVBAR_ITEMS.map((menu) => (
        <li key={menu.href}>
          <FlyoutMenu href={menu.href} label={menu.label}>
            {menu.label}
          </FlyoutMenu>
        </li>
      ))}
    </ul>
  )
}
