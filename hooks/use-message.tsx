import { toast } from '@/components/ui/use-toast'
import { fetchMessages } from '@/lib/services/message/message'
import { createClient } from '@/lib/supabase/client'
import type { Message as MessageType, VetoolUser } from '@/types'
import { useEffect, useState } from 'react'

type UIMessage = MessageType & { ui_id: string }

export default function useMessage(
  hosId: string,
  loggdedInUser: VetoolUser,
  selectedCategory: string,
) {
  const supabase = createClient()

  const [localMessages, setLocalMessages] = useState<UIMessage[]>([])
  const [isFetching, setIsFetching] = useState(true)
  const [messageInput, setMessageInput] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const getInitialMessages = async () => {
      setIsFetching(true)
      try {
        const fetchedMessages = await fetchMessages(hosId)
        new Promise((resolve) => setTimeout(resolve, 1000))

        setLocalMessages(
          fetchedMessages.map((message) => ({
            ...message,
            ui_id: message.message_id,
          })),
        )
      } catch (error) {
        console.error('Failed to fetch initial messages:', error)
        toast({
          title: '메시지를 불러오는데 실패했습니다',
          variant: 'destructive',
        })
      } finally {
        setIsFetching(false)
      }
    }
    getInitialMessages()
  }, [hosId, setLocalMessages, toast])

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

          setLocalMessages((prevMessages) => {
            const isAlreadyExist = prevMessages.find(
              (message) => message.message_id === newMessage.message_id,
            )
            if (isAlreadyExist) return prevMessages
            return [
              ...prevMessages,
              { ...newMessage, ui_id: newMessage.message_id },
            ]
          })
        },
      )
      .subscribe((status, err) => {
        if (status === 'SUBSCRIBED') {
          console.log('Connected to chat channel!')
          setIsConnected(true)
        } else if (status === 'TIMED_OUT') {
          toast({
            title: '연결 시간이 초과되었습니다',
            variant: 'destructive',
          })
          setIsConnected(false)
        } else if (status === 'CHANNEL_ERROR') {
          toast({
            title: '채널 연결에 실패했습니다',
            variant: 'destructive',
          })
          setIsConnected(false)
        } else if (status === 'CLOSED') {
          setIsConnected(false)
        }

        if (err) {
          toast({
            title: '에러가 발생했습니다',
            description: err.message,
            variant: 'destructive',
          })
          setIsConnected(false)
        }
      })

    return () => {
      supabase.removeChannel(channel)
    }
  }, [hosId])

  const handleCreateMessage = async () => {
    const trimmedMessage = messageInput.trim()
    if (!trimmedMessage) {
      setMessageInput('')
      return
    }
    setIsCreating(true)

    const tempId = Math.random().toString()
    const optimisticMessage: UIMessage = {
      avatar_url: loggdedInUser.avatar_url!,
      content: trimmedMessage,
      created_at: new Date().toISOString(),
      hos_id: hosId,
      message_id: tempId,
      position: loggdedInUser.position,
      user_id: loggdedInUser.user_id,
      user_name: loggdedInUser.name,
      ui_id: tempId,
      category: selectedCategory,
    }

    setLocalMessages((prevMessages) => [...prevMessages, optimisticMessage])

    const { data, error } = await supabase
      .from('messages')
      .insert({
        content: trimmedMessage,
        hos_id: hosId,
        avatar_url: loggdedInUser.avatar_url!,
        user_id: loggdedInUser.user_id,
        position: loggdedInUser.position,
        user_name: loggdedInUser.name,
        category: selectedCategory,
      })
      .select()

    if (error) {
      setLocalMessages((prevMessages) =>
        prevMessages.filter((message) => message.ui_id !== tempId),
      )
      return
    }

    const newMessage = data?.[0] as MessageType

    setLocalMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.ui_id === tempId ? { ...message, ...newMessage } : message,
      ),
    )

    setMessageInput('')
    setIsCreating(false)
  }

  return {
    localMessages,
    messageInput,
    setMessageInput,
    handleCreateMessage,
    isCreating,
    isFetching,
    isConnected,
  }
}
