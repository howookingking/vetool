import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { SendHorizonal } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'

type Props = {
  messageInput: string
  setMessageInput: Dispatch<SetStateAction<string>>
  isCreating: boolean
  handleCreateMessage: () => Promise<void>
}

export default function MessageInput({
  messageInput,
  setMessageInput,
  isCreating,
  handleCreateMessage,
}: Props) {
  return (
    <div className="flex items-end gap-2 border-t bg-white p-3">
      <Textarea
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
        disabled={isCreating}
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
