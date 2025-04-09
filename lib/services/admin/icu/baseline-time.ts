'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const updateBaselineTime = async (
  hosId: string,
  selectedBaselineTime: number,
) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('hospitals')
    .update({
      baseline_time: selectedBaselineTime,
    })
    .match({ hos_id: hosId })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
}
