import LargeLoaderCircle from '@/components/common/large-loader-circle'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useAutoScroll } from '@/hooks/use-auto-scroll'
import useMessage from '@/hooks/use-message'
import type { VetoolUser } from '@/types'
import MessageInput from './message-input'
import SingleMessage from './single-message'

type Props = {
  loggdedInUser: VetoolUser
  hosId: string
}

export default function MessageWindow({ loggdedInUser, hosId }: Props) {
  const {
    handleCreateMessage,
    isCreating,
    isFetching,
    localMessages,
    messageInput,
    setMessageInput,
    isConnected,
  } = useMessage(hosId, loggdedInUser)

  const messageEndRef = useAutoScroll(localMessages)

  return (
    <div className="relative flex h-[60vh] flex-col bg-green-200">
      <div
        className={`absolute left-2 top-2 h-3 w-3 animate-pulse rounded-full ${
          isConnected ? 'bg-green-500' : 'bg-red-500'
        }`}
      />
      {isFetching ? (
        <LargeLoaderCircle className="flex-1 animate-spin" />
      ) : (
        <ScrollArea className="flex-1 px-3 pt-5">
          <div className="space-y-4">
            {localMessages.map((message) => (
              <SingleMessage
                key={message.ui_id}
                message={message}
                isSender={message.user_id === loggdedInUser.user_id}
              />
            ))}
            <div ref={messageEndRef} />
          </div>
        </ScrollArea>
      )}

      <MessageInput
        isConnected={isConnected}
        messageInput={messageInput}
        setMessageInput={setMessageInput}
        isCreating={isCreating}
        handleCreateMessage={handleCreateMessage}
      />
    </div>
  )
}
