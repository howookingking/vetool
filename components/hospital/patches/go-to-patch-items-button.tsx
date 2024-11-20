'use client'

import { Button } from '@/components/ui/button'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

export default function GotoPatchItemsButton() {
  const { push } = useRouter()
  const pathname = usePathname()

  return (
    <Button
      variant={'outline'}
      onClick={() =>
        push(`/${pathname.split('/').slice(1, 3).join('/')}/patches`)
      }
    >
      목록으로 가기
    </Button>
  )
}
