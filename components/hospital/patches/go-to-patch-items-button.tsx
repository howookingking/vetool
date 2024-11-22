'use client'

import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

export default function GotoPatchItemsButton() {
  const { push } = useRouter()
  const pathname = usePathname()

  return (
    <Button
      className="absolute left-2 top-1.5 z-20 sm:left-16"
      variant={'outline'}
      onClick={() =>
        push(`/${pathname.split('/').slice(1, 3).join('/')}/patches`)
      }
    >
      <Menu />
      패치목록
    </Button>
  )
}
