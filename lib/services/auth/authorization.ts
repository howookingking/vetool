'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function getSupabaseUser() {
  const supabase = await createClient()
  const {
    data: { user: supabaseUser },
    error,
  } = await supabase.auth.getUser()

  if (error) {
    console.error(error)
    redirect('/login')
  }

  if (!supabaseUser) {
    redirect('/login')
  }

  return supabaseUser
}

export async function checkIsAdmin(userId: string) {
  const supabase = await createClient()

  const { data: vetoolUserData, error } = await supabase
    .from('users')
    .select('is_admin')
    .match({ user_id: userId })
    .single()

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }

  const isAdmin = vetoolUserData.is_admin

  return isAdmin
}

export const getVetoolUserData = async () => {
  const supabase = await createClient()
  const supabaseUser = await getSupabaseUser()

  const { data: vetoolUserData, error: vetoolUserDataError } = await supabase
    .from('users')
    .select(
      'email, name, avatar_url, position, is_admin, user_id, hos_id, is_super',
    )
    .match({ user_id: supabaseUser.id })
    .single()

  if (vetoolUserDataError) {
    console.error(vetoolUserDataError)
    redirect(`/error?message=${vetoolUserDataError.message}`)
  }

  return vetoolUserData
}
