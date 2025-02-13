'use client'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import logo from '@/public/logo.svg'
import { MenuIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '../ui/button'
import { HOMEPAGE_NAVBAR_ITEMS } from '@/constants/company/nav/nav'

export default function MobileNavMenu() {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mb-10">
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
            <li key={item.label}>
              <Link href={item.href} onClick={() => setIsSheetOpen(false)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  )
}
