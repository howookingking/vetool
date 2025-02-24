'use client'

import { HOMEPAGE_NAVBAR_ITEMS } from '@/constants/company/nav'

export default function NavMenu() {
  const handleClick = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offsetTop = element.offsetTop
      window.scrollTo({
        top: offsetTop - 64, // 헤더 높이 제거
        behavior: 'smooth',
      })
    }
  }

  return (
    <ul className="hidden items-center gap-6 md:flex">
      {HOMEPAGE_NAVBAR_ITEMS.map((item) => (
        <li key={item.sectionId}>
          <button
            onClick={() => handleClick(item.sectionId)}
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700"
          >
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  )
}
