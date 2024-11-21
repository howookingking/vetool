'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

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
      <ArrowLeft />
      목록으로 가기
    </Button>
  )
}
