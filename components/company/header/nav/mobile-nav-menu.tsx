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
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { MenuIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function MobileNavMenu() {
  const { push } = useRouter()

  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const handleClick = (href: string) => {
    push(`/${href}`)
    // setIsSheetOpen(false)
  }
  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent noCloseButton>
        <SheetHeader className="mb-10">
          <VisuallyHidden>
            <SheetTitle />
            <SheetDescription />
          </VisuallyHidden>
        </SheetHeader>

        <ul className="flex flex-col gap-4">
          {HOMEPAGE_NAVBAR_ITEMS.map((item) => (
            <li key={item.href}>
              <Button
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700"
                variant="link"
                onClick={() => handleClick(item.href)}
              >
                {item.label}
              </Button>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  )
}
