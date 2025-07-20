'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import type { VetoolUser } from '@/lib/services/auth/authorization'
import { MessageCircle, X } from 'lucide-react'
import { useState } from 'react'
import MessageWindow from './message-window'

type Props = {
  loggdedInUser: VetoolUser
  hosId: string
}

export default function Message({ loggdedInUser, hosId }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="fixed bottom-2 right-2 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="icon"
          className="rounded-full"
          aria-label={isOpen ? '채팅 닫기' : '채팅 열기'}
        >
          <MessageCircle />
        </Button>
      </div>

      {isOpen && (
        <Card className="fixed bottom-2 right-2 z-50 ml-2 min-w-[300px] overflow-hidden md:min-w-[400px]">
          <X
            className="absolute right-1 top-1 z-50 h-4 w-4 cursor-pointer"
            onClick={() => setIsOpen(false)}
            aria-label="채팅 닫기"
          />

          <MessageWindow loggdedInUser={loggdedInUser} hosId={hosId} />
        </Card>
      )}
    </>
  )
}
