'use client'

import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

export default function GotoPatchItemsButton() {
  const { push } = useRouter()
  const pathname = usePathname()

  return (
    <Button
      className="fixed left-6 top-6 z-20 h-10 w-10 rounded-full bg-white shadow-md transition-all hover:bg-muted sm:left-20"
      variant={'outline'}
      onClick={() =>
        push(`/${pathname.split('/').slice(1, 3).join('/')}/patches`)
      }
    >
      <Menu className="h-5 w-5 text-gray-600" />
    </Button>
  )
}
