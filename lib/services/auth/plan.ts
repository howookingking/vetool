'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const getPlan = async (hosId: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('hospitals')
    .select('plan')
    .match({ hos_id: hosId })
    .single()

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }

  return data?.plan
}
