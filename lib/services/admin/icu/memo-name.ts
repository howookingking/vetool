'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const updateMemoNames = async (memoNames: string[], hosId: string) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('hospitals')
    .update({ icu_memo_names: memoNames })
    .match({ hos_id: hosId })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}` as any)
  }
}
