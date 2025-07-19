import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { useAutoScroll } from '@/hooks/use-auto-scroll'
import { createClient } from '@/lib/supabase/client'
import type { Message as MessageType, VetoolUser } from '@/types'
import { SendHorizonal } from 'lucide-react'
import { useEffect, useState } from 'react'
import SingleMessage from './single-message'

type Props = {
  localMessages: MessageType[]
  loggdedInUser: VetoolUser
  hosId: string
  setLocalMessages: React.Dispatch<React.SetStateAction<MessageType[]>>
}

export default function MessageWindow({
  localMessages,
  loggdedInUser,
  hosId,
  setLocalMessages,
}: Props) {
  const messageEndRef = useAutoScroll(localMessages)

  const [messageInput, setMessageInput] = useState('')
  const [isCreating, setIsCreating] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    const channel = supabase
      .channel(`chat:${hosId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `hos_id=eq.${hosId}`,
        },
        (payload) => {
          const newMessage = payload.new as MessageType

          if (newMessage.user_id === loggdedInUser.user_id) {
            return
          }

          setLocalMessages((prevMessages) =>
            prevMessages.find(
              (message) => message.message_id === newMessage.message_id,
            )
              ? prevMessages
              : [...prevMessages, newMessage],
          )
        },
      )
      .subscribe((status, err) => {
        if (status === 'SUBSCRIBED') {
          console.log('Connected to chat channel!')
        } else if (status === 'TIMED_OUT') {
          toast({
            title: '연결 시간이 초과되었습니다',
            variant: 'destructive',
          })
        } else if (status === 'CHANNEL_ERROR') {
          toast({
            title: '실시간 채팅 연결에 실패했습니다',
            variant: 'destructive',
          })
        }

        if (err) {
          toast({
            title: '에러가 발생했습니다',
            description: err.message,
            variant: 'destructive',
          })
        }
      })

    return () => {
      supabase.removeChannel(channel)
    }
  }, [hosId])

  const handleCreateMessage = async () => {
    if (!messageInput.trim()) {
      setMessageInput('')
      return
    }
    setIsCreating(true)

    const tempId = Math.random().toString()
    const optimisticMessage: MessageType = {
      avatar_url: loggdedInUser.avatar_url!,
      content: messageInput,
      created_at: new Date().toISOString(),
      hos_id: hosId,
      message_id: tempId,
      position: loggdedInUser.position,
      user_id: loggdedInUser.user_id,
      user_name: loggdedInUser.name,
    }

    setLocalMessages((prevMessages) => [...prevMessages, optimisticMessage])

    const { data, error } = await supabase
      .from('messages')
      .insert({
        content: messageInput,
        hos_id: hosId,
        avatar_url: loggdedInUser.avatar_url!,
        user_id: loggdedInUser.user_id,
        position: loggdedInUser.position,
        user_name: loggdedInUser.name,
      })
      .select()

    if (error) {
      setLocalMessages((prevMessages) =>
        prevMessages.filter((message) => message.message_id !== tempId),
      )
      return
    }

    const newMessage = data?.[0] as MessageType

    setLocalMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.message_id === tempId ? newMessage : message,
      ),
    )

    setMessageInput('')
    setIsCreating(false)
  }

  return (
    <div className="flex h-[60vh] flex-col bg-green-200">
      <ScrollArea className="flex-1 px-3 pt-5">
        <div className="space-y-4">
          {localMessages.map((message) => (
            <SingleMessage
              key={message.message_id}
              message={message}
              isSender={message.user_id === loggdedInUser.user_id}
            />
          ))}
          <div ref={messageEndRef} />
        </div>
      </ScrollArea>

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
    </div>
  )
}
