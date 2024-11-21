'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const getMemoNames = async (hosId: string) => {
  const supabase = await createClient()

  const { data, error: error } = await supabase
    .from('hospitals')
    .select('icu_memo_names')
    .match({ hos_id: hosId })
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data.icu_memo_names
}

export const updateMemoNames = async (memoNames: string[], hosId: string) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('hospitals')
    .update({ icu_memo_names: memoNames })
    .match({ hos_id: hosId })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}
