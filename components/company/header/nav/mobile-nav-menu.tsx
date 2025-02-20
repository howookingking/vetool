'use client'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { HOMEPAGE_NAVBAR_ITEMS } from '@/constants/company/nav'
import logo from '@/public/logo.svg'
import { MenuIcon } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export default function MobileNavMenu() {
  const [isSheetOpen, setIsSheetOpen] = useState(false)

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
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mb-10">
          s
          <SheetTitle>
            <Image
              src={logo}
              alt="vetool logo"
              unoptimized
              className="h-8 w-auto"
            />
          </SheetTitle>
          <SheetDescription />
        </SheetHeader>

        <ul className="flex flex-col gap-4">
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
      </SheetContent>
    </Sheet>
  )
}
