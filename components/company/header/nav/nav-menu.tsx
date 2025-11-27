'use client'

import { Button } from '@/components/ui/button'
import { HOMEPAGE_NAVBAR_ITEMS } from '@/constants/company/nav'
import Link from 'next/link'

export default function NavMenu() {
  return (
    <ul className="hidden items-center gap-2 md:flex">
      {HOMEPAGE_NAVBAR_ITEMS.map((item) => (
        <li key={item.href}>
          <Button
            asChild
            variant="link"
            size="lg"
            className="cursor-pointer px-4 text-base font-semibold text-slate-700"
          >
            <Link href={`/${item.href}`}>{item.label}</Link>
          </Button>
        </li>
      ))}
    </ul>
  )
}
