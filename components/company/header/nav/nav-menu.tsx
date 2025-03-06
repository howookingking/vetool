'use client'

import { Button } from '@/components/ui/button'
import { HOMEPAGE_NAVBAR_ITEMS } from '@/constants/company/nav'
import Link from 'next/link'

export default function NavMenu() {
  return (
    <ul className="hidden items-center md:flex xl:gap-4">
      {HOMEPAGE_NAVBAR_ITEMS.map((item) => (
        <li key={item.href}>
          <Button
            className="text-sm font-semibold leading-6 text-gray-900"
            asChild
            variant="link"
          >
            <Link href={`/${item.href}`}>{item.label}</Link>
          </Button>
        </li>
      ))}
    </ul>
  )
}
