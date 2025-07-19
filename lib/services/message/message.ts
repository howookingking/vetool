'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const fetchMessages = async (hosId: string) => {
  const supabase = await createClient()
  const { data: messages, error } = await supabase
    .from('messages')
    .select(`*`)
    .match({ hos_id: hosId })
    .order('created_at', { ascending: true })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }

  return messages
}
