'use server'

import { createClient } from '@/lib/supabase/server'
import { type AdminDietData } from '@/types/adimin'
import { type Diet } from '@/types/hospital/calculator'
import { redirect } from 'next/navigation'

export const getHosDiets = async (hosId: string) => {
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
        created_at,
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
    console.error(dietDataError)
    redirect(`/error?message=${dietDataError.message}`)
  }

  return dietData
}

type UpsertDietData = {
  name: string
  description: string | null
  company: string
  mass_vol: number
  unit: string
  hos_id: string
  diet_id?: string
  species: string
}

export const upsertDietData = async (
  data: UpsertDietData,
  isEdit?: boolean,
) => {
  const supabase = await createClient()

  const { data: upsertDietData, error: upsertDietError } = await supabase
    .from('diets')
    .upsert({
      company: data.company,
      description: data.description,
      mass_vol: data.mass_vol,
      name: data.name,
      species: data.species,
      unit: data.unit,
      hos_id: data.hos_id,
    })
    .select('diet_id')
    .single()

  if (upsertDietError) {
    console.error(upsertDietError)
    redirect(`/error?message=${upsertDietError.message}`)
  }

  // 수정이 아닌 추가인 경우에는 'hospital_diet_pin' table에 추가
  if (!isEdit) {
    const { error: insertDietPinnError } = await supabase
      .from('hospital_diet_pin')
      .insert({
        hos_id: data.hos_id,
        diet_id: upsertDietData.diet_id,
      })

    if (insertDietPinnError) {
      console.error(insertDietPinnError)
      redirect(`/error?message=${insertDietPinnError.message}`)
    }
  }
}

export const deleteDietData = async (dietProductId: string) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('diets')
    .delete()
    .match({ diet_id: dietProductId })

  const { error: deletePinError } = await supabase
    .from('hospital_diet_pin')
    .delete()
    .match({ diet_id: dietProductId })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }

  if (deletePinError) {
    console.error(deletePinError)
    redirect(`/error?message=${deletePinError.message}`)
  }
}

export const getPinnedDiets = async (hosId: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('hospital_diet_pin')
    .select('*')
    .match({ hos_id: hosId })
    .order('created_at', { ascending: false })

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

export const addEntireDietPin = async (hosId: string) => {
  const supabase = await createClient()

  const { error: insertPinError } = await supabase.rpc(
    'insert_entire_hospital_diet_pin',
    {
      hos_id_input: hosId,
    },
  )

  if (insertPinError) {
    console.error(insertPinError)
    redirect(`/error?message=${insertPinError.message}`)
  }
}
