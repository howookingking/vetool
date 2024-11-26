'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const getDiet = async (hosId: string) => {
  const supabase = await createClient()

  const { data: dietsData, error: dietsDataError } = await supabase
    .from('diet_vetool')
    .select('name, mass_vol, unit')
    .or(`hos_id.eq.${hosId},hos_id.eq.00fd3b03-9f70-40f2-bfb5-f2e34eb44ae5`)

  if (dietsDataError) {
    console.log(dietsDataError)
    redirect(`/error?message=${dietsDataError.message}`)
  }

  return dietsData
}
