'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const getRerCalcMethod = async (hosId: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('hospitals')
    .select('rer_calc_method')
    .match({ hos_id: hosId })
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data.rer_calc_method
}

export const updateRerCalcMethod = async (
  hosId: string,
  rerCalcMethodInput: string,
) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('hospitals')
    .update({ rer_calc_method: rerCalcMethodInput })
    .match({ hos_id: hosId })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}
