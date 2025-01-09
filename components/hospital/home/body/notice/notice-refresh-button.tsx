'use client'

import { Button } from '@/components/ui/button'
import { RefreshCcw } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function NoticeRefreshButton() {
  const { refresh } = useRouter()

  return (
    <Button size="icon" variant="ghost" onClick={refresh}>
      <RefreshCcw />
    </Button>
  )
}
