'use server'

import { createClient } from '@/lib/supabase/server'
import { AdminDietData } from '@/types/adimin'
import { redirect } from 'next/navigation'

export const getDiets = async (hosId: string) => {
  const supabase = await createClient()

  const { data: dietData, error: dietDataError } = await supabase
    .from('diets')
    .select(
      `
        name, 
        company, 
        description, 
        mass_vol, 
        unit, 
        diet_id, 
        species,
        hos_id(hos_id, name)
      `,
    )
    .or(`hos_id.eq.${hosId},hos_id.eq.00fd3b03-9f70-40f2-bfb5-f2e34eb44ae5`)
    .order('hos_id', {
      ascending: false,
    })
    .order('created_at', {
      ascending: false,
    })
    .returns<AdminDietData[]>()

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
  diet_id?: string
}

export const upsertDietData = async (data: UpsertDietData) => {
  const supabase = await createClient()

  const { error } = await supabase.from('diets').upsert(data)

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
}

export const deleteDietData = async (dietProductId: string) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('diets')
    .delete()
    .match({ diet_id: dietProductId })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
}

export const getPinnedDiets = async (hosId: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('hospital_diet_pin')
    .select('*')
    .match({ hos_id: hosId })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }

  return data
}

export const toggleHospitalDietPin = async (
  isPinned: boolean,
  dietProductid: string,
  hosId: string,
) => {
  const supabase = await createClient()

  if (isPinned) {
    const { error: deletePinError } = await supabase
      .from('hospital_diet_pin')
      .delete()
      .match({
        hos_id: hosId,
        diet_id: dietProductid,
      })

    if (deletePinError) {
      console.error(deletePinError)
      redirect(`/error?message=${deletePinError.message}`)
    }
  } else {
    const { error: insertPinError } = await supabase
      .from('hospital_diet_pin')
      .insert({
        hos_id: hosId,
        diet_id: dietProductid,
      })

    if (insertPinError) {
      console.error(insertPinError)
      redirect(`/error?message=${insertPinError.message}`)
    }
  }
}
