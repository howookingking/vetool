'use client'

import { HOMEPAGE_NAVBAR_ITEMS } from '@/constants/company/nav'
import Link from 'next/link'

export default function NavMenu() {
  return (
    <ul className="hidden items-center gap-8 whitespace-nowrap md:flex">
      {HOMEPAGE_NAVBAR_ITEMS.map((item) => (
        <li key={item.href}>
          <Link
            href={`/${item.href}`}
            className="group relative flex flex-col items-center"
          >
            <span className="invisible font-bold" aria-hidden="true">
              {item.label}
            </span>
            <span className="absolute inset-0 flex items-center justify-center group-hover:font-bold">
              {item.label}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
