'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const updateUserInfo = async (
  userId: string,
  name: string | null,
  avatarUrl: string | null,
) => {
  const supabase = await createClient()
  if (name === null) {
    const { error } = await supabase
      .from('users')
      .update({
        avatar_url: avatarUrl,
      })
      .match({ user_id: userId })

    if (error) {
      console.error(error)
      redirect(`/error/?message=${error.message}`)
    }
  } else {
    const { error } = await supabase
      .from('users')
      .update({
        name,
      })
      .match({ user_id: userId })

    if (error) {
      console.error(error)
      redirect(`/error/?message=${error.message}`)
    }
  }
}
