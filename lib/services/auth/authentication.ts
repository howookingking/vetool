'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function googleLogin(formData: FormData) {
  const path = formData.get('path') as string

  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${path}/auth/callback`,
      queryParams: {
        // Force account selection even when one account is available
        prompt: 'select_account',
        // Don't use OAuth browser state to prevent auto-login
        access_type: 'offline',
        // Clear any login hints
        login_hint: '',
      },
    },
  })

  if (error) {
    throw new Error(`구글 로그인 중 에러 발생 : ${error.message}`)
  }

  if (data.url) {
    redirect(data.url)
  }
}

export async function logout() {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    throw new Error(`로그아웃 중 에러 발생 : ${error.message}`)
  }

  redirect('/')
}
