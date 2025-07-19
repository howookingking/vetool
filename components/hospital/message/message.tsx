'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import type { VetoolUser } from '@/lib/services/auth/authorization'
import { fetchMessages } from '@/lib/services/message/message'
import type { Message as MessageType } from '@/types'
import { LoaderCircle, MessageCircle, X } from 'lucide-react'
import { useState } from 'react'
import MessageWindow from './message-window'

type Props = {
  loggdedInUser: VetoolUser
  hosId: string
}

export default function Message({ loggdedInUser, hosId }: Props) {
  const [localMessages, setLocalMessages] = useState<MessageType[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isFetching, setIsFetching] = useState(false)

  const handleOpenChange = async (isOpen: boolean) => {
    if (!isOpen) {
      setIsFetching(true)

      const fetchedMessages = await fetchMessages(hosId)
      setLocalMessages(fetchedMessages)

      setIsFetching(false)
    }
    setIsOpen(!isOpen)
  }

  return (
    <>
      <div className="fixed bottom-2 right-2 z-50">
        <Button
          onClick={() => handleOpenChange(isOpen)}
          size="icon"
          className="rounded-full"
          disabled={isFetching}
        >
          {isFetching ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <MessageCircle />
          )}
        </Button>
      </div>

      {isOpen && (
        <Card className="fixed bottom-2 right-2 z-50 ml-2 min-w-[300px] overflow-hidden md:min-w-[400px]">
          <X
            className="absolute right-1 top-1 z-50 h-4 w-4 cursor-pointer"
            onClick={() => setIsOpen(false)}
          />

          <MessageWindow
            localMessages={localMessages}
            loggdedInUser={loggdedInUser}
            hosId={hosId}
            setLocalMessages={setLocalMessages}
          />
        </Card>
      )}
    </>
  )
}
