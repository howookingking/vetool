import LargeLoaderCircle from '@/components/common/large-loader-circle'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useAutoScroll } from '@/hooks/use-auto-scroll'
import useMessage from '@/hooks/use-message'
import type { VetoolUser } from '@/types'
import MessageInput from './message-input'
import SingleMessage from './single-message'
import MessageSidebar from './message-sidebar'

import { useState } from 'react'

type Props = {
  loggdedInUser: VetoolUser
  hosId: string
}

export default function MessageWindow({ loggdedInUser, hosId }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('home')

  const {
    handleCreateMessage,
    isCreating,
    isFetching,
    localMessages,
    messageInput,
    setMessageInput,
    isConnected,
  } = useMessage(hosId, loggdedInUser, selectedCategory)

  const messageEndRef = useAutoScroll(localMessages)

  const filteredMessages = localMessages.filter(
    (message) => message.category === selectedCategory,
  )

  return (
    <div className="flex h-[60vh] flex-row md:min-w-[600px]">
      <MessageSidebar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        isConnected={isConnected}
      />

      <div className="relative flex flex-1 flex-col bg-green-200">
        {isFetching ? (
          <LargeLoaderCircle className="flex-1 animate-spin" />
        ) : (
          <>
            {/* draggable */}
            <div className="handle absolute left-1/2 top-1 z-50 h-1.5 w-12 -translate-x-1/2 cursor-move rounded-md bg-gray-50 transition hover:bg-gray-200" />

            <ScrollArea className="flex-1 px-3 pt-5">
              <div className="space-y-4">
                {filteredMessages.map((message) => (
                  <SingleMessage
                    key={message.ui_id}
                    message={message}
                    isSender={message.user_id === loggdedInUser.user_id}
                  />
                ))}
                <div ref={messageEndRef} />
              </div>
            </ScrollArea>
          </>
        )}

        <MessageInput
          isConnected={isConnected}
          messageInput={messageInput}
          setMessageInput={setMessageInput}
          isCreating={isCreating}
          handleCreateMessage={handleCreateMessage}
          selectedCategory={selectedCategory}
        />
      </div>
    </div>
  )
}
