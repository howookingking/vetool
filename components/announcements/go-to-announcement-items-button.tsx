'use client'

import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function GotoAnnouncementItemsButton() {
  const { push } = useRouter()

  return (
    <Button
      className="fixed left-6 top-6 z-20 h-10 w-10 rounded-full bg-white shadow-md transition-all hover:bg-muted"
      variant={'outline'}
      onClick={() => push(`/announcements`)}
    >
      <Menu className="h-5 w-5 text-gray-600" />
    </Button>
  )
}
