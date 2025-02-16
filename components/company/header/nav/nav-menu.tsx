import FlyoutMenu from '@/components/company/header/nav/flyout-menu'
import { HOMEPAGE_NAVBAR_ITEMS } from '@/constants/company/nav'

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
