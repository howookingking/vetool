'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const getShowOrderer = async (hosId: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('hospitals')
    .select('show_orderer')
    .match({ hos_id: hosId })
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data.show_orderer
}

export const updateShowOrderer = async (
  hosId: string,
  showOrderInput: boolean,
) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('hospitals')
    .update({ show_orderer: showOrderInput })
    .match({ hos_id: hosId })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}
