'use server'

import { createClient } from '@/lib/supabase/server'
import { type Diet } from '@/types'
import { redirect } from 'next/navigation'

// export const getPinnedDietData = async (hosId: string, species: string) => {
//   const supabase = await createClient()

//   const { data: dietData, error: dietsDataError } = await supabase
//     .rpc('get_pinned_diet_data', {
//       hos_id_input: hosId,
//       species_input: species,
//     })
//     .returns<PinnedDiet[]>()

//   if (dietsDataError) {
//     console.error(dietsDataError)
//     redirect(`/error?message=${dietsDataError.message}`)
//   }

//   return dietData ?? []
// }

export const getDiets = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('diets')
    .select('diet_id, name, unit, mass_vol')
    .returns<Diet[]>()

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }

  return data
}
