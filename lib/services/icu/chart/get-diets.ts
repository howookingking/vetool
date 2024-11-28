'use server'

import { createClient } from '@/lib/supabase/server'
import type { PinnedDiet } from '@/types/icu/chart'
import { redirect } from 'next/navigation'

export const getPinnedDietData = async (hosId: string, species: string) => {
  const supabase = await createClient()

  const { data: dietData, error: dietsDataError } = await supabase
    .rpc('get_pinned_diet_data', {
      hos_id_input: hosId,
      species_input: species,
    })
    .returns<PinnedDiet[]>()

  if (dietsDataError) {
    console.log(dietsDataError)
    redirect(`/error?message=${dietsDataError.message}`)
  }

  return dietData ?? []
}
