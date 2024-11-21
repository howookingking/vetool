'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function getUser() {
  const supabase = await createClient()
  const {
    data: { user: authUser },
    error,
  } = await supabase.auth.getUser()

  if (error) {
    console.error(error)
    redirect('/login')
  }

  return authUser
}

export async function checkIsAdmin(hosId: string, userId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('users')
    .select('is_admin')
    .match({ user_id: userId })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }

  const isAdmin = data[0].is_admin ?? false

  if (!isAdmin) {
    redirect(`/hospital/${hosId}`)
  }
}

export const getUserData = async () => {
  const supabase = await createClient()
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError) {
    console.error(userError)
    redirect(`/error?message=${userError.message}`)
  }

  const { data: userData, error: userDataError } = await supabase
    .from('users')
    .select('email, name, avatar_url, position, is_admin, user_id, hos_id')
    .match({ user_id: user?.id })
    .single()

  if (userDataError) {
    console.error(userDataError)
    redirect(`/error?message=${userDataError.message}`)
  }

  return userData
}

export const isSuperAccount = async () => {
  const authUser = await getUser()

  return authUser?.email === process.env.NEXT_PUBLIC_SUPER_SHY
}
