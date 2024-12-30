'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { cache } from 'react'

export const getSupabaseUser = cache(async () => {
  const supabase = await createClient()
  const {
    data: { user: supabaseUser },
    error: supabaseUserError,
  } = await supabase.auth.getUser()

  if (supabaseUserError) {
    console.error(supabaseUserError)
    redirect('/login')
  }

  if (!supabaseUser) {
    redirect('/login')
  }

  return supabaseUser
})

export const getVetoolUserData = cache(async () => {
  const supabase = await createClient()
  const supabaseUser = await getSupabaseUser()

  const { data: vetoolUser, error: vetoolUserError } = await supabase
    .from('users')
    .select(
      `
        email,
        name, 
        avatar_url, 
        position, 
        is_admin, 
        user_id, 
        hos_id, 
        is_super, 
        is_admin
      `,
    )
    .match({ user_id: supabaseUser.id })
    .single()

  if (vetoolUserError) {
    console.error(vetoolUserError)
    redirect(`/error?message=${vetoolUserError.message}`)
  }

  return vetoolUser
})
