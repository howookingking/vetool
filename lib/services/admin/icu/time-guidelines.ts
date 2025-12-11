'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const updateHosTimeGuidelines = async (
  hosId: string,
  timeGuidelines: number[],
) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('hospitals')
    .update({ time_guidelines: timeGuidelines })
    .match({ hos_id: hosId })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}` as any)
  }
}
