'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const getDiet = async (hosId: string) => {
  const supabase = await createClient()

  const { data: dietData, error: dietDataError } = await supabase
    .from('diet_vetool')
    .select(
      'name, company, description, hos_id, mass_vol, unit, diet_products_id, species',
    )
    .or(`hos_id.eq.${hosId},hos_id.eq.00fd3b03-9f70-40f2-bfb5-f2e34eb44ae5`)
    .order('hos_id', {
      ascending: false,
    })
    .order('created_at', {
      ascending: false,
    })

  if (dietDataError) {
    console.log(dietDataError)
    redirect(`/error?message=${dietDataError.message}`)
  }

  return dietData
}

type UpsertDietData = {
  name: string
  description: string | null
  company: string | null
  mass_vol: number
  unit: string | null
  hos_id: string
  diet_products_id?: string
}

export const upsertDietData = async (data: UpsertDietData) => {
  const supabase = await createClient()

  const { error } = await supabase.from('diet_vetool').upsert(data)

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
}

export const deleteDietData = async (dietProductId: string) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('diet_vetool')
    .delete()
    .match({ diet_products_id: dietProductId })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
}
