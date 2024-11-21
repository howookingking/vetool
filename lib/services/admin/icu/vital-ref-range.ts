'use server'

import { Json } from '@/lib/supabase/database.types'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const getVitalRefRange = async (hosId: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('hospitals')
    .select('vital_ref_range')
    .match({ hos_id: hosId })
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data.vital_ref_range
}

export const updateVitalRefRange = async (
  hosId: string,
  stringifiedVitalRefRange: Json,
) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('hospitals')
    .update({ vital_ref_range: stringifiedVitalRefRange })
    .match({ hos_id: hosId })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}
