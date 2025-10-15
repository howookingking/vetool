import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { SendHorizonal } from 'lucide-react'
import { type Dispatch, type SetStateAction, useEffect, useRef } from 'react'

type Props = {
  isConnected: boolean
  messageInput: string
  setMessageInput: Dispatch<SetStateAction<string>>
  isCreating: boolean
  handleCreateMessage: () => Promise<void>
  selectedCategory: string
}

export default function MessageInput({
  isConnected,
  messageInput,
  setMessageInput,
  isCreating,
  handleCreateMessage,
  selectedCategory,
}: Props) {
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!isCreating) {
      inputRef.current?.focus()
    }
  }, [isCreating])

  return (
    <div className="flex items-end gap-2 border-t bg-white p-3">
      <Textarea
        ref={inputRef}
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.nativeEvent.isComposing || e.key !== 'Enter') return
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleCreateMessage()
          }
        }}
        placeholder="줄 추가 : Shift + Enter ⏎"
        className="resize-none"
        disabled={isCreating || !isConnected}
      />
      <Button
        onClick={handleCreateMessage}
        size="icon"
        className="text-black' shrink-0 rounded-full bg-yellow-300"
        disabled={!messageInput.trim() || isCreating}
      >
        <SendHorizonal />
      </Button>
    </div>
  )
}
