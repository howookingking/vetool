'use client'

import AdminSidebarItem from '@/components/hospital/admin/admin-sidebar-item'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ADMIN_SIDEBAR_ITEMS } from '@/constants/admin/admin-sidebar-items'
import { Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function MobileAdminSidebar() {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const path = usePathname()
  const currentAdminPath = path.split('/').at(-1)

  return (
    <div className="flex items-center gap-2 border-b md:hidden">
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button
            className="fixed top-0 z-20 h-12 w-12 rounded-none"
            size="icon"
          >
            <Menu size={18} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-4">
          <SheetHeader>
            <SheetTitle />
            <SheetDescription />
          </SheetHeader>
          <ul className="flex flex-col gap-2 p-2">
            {ADMIN_SIDEBAR_ITEMS.map((item) => (
              <AdminSidebarItem
                key={item.name}
                icon={item.icon}
                name={item.name}
                path={item.path}
                isReady={item.isReady}
                setIsSheetOpen={setIsSheetOpen}
              />
            ))}
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  )
}
