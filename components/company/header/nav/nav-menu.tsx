'use client'

import { HOMEPAGE_NAVBAR_ITEMS } from '@/constants/company/nav'
import Link from 'next/link'

export default function NavMenu() {
  return (
    <ul className="hidden items-center gap-6 md:flex">
      {HOMEPAGE_NAVBAR_ITEMS.map((item) => (
        <li key={item.href}>
          <Link href={`/${item.href}`}>
            <button className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700">
              {item.label}
            </button>
          </Link>
        </li>
      ))}
    </ul>
  )
}
