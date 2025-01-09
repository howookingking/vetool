'use server'

import { createClient } from '@/lib/supabase/server'
import type { DrugProductsJoined } from '@/types/icu/chart'
import { HosDrugWithRawDrug } from '@/types/icu/drugs'
import { redirect } from 'next/navigation'

// TODO : 삭제예정
export const getDrugs = async (hosId: string) => {
  const supabase = await createClient()

  const { data: searchedDrugData, error: searchedDrugDataError } =
    await supabase
      .rpc('get_drugs', {
        hos_id_input: hosId,
      })
      .returns<DrugProductsJoined[]>()

  if (searchedDrugDataError) {
    console.error(searchedDrugDataError)
    redirect(`/error?message=${searchedDrugDataError.message}`)
  }

  return searchedDrugData
}

export const getHosDrugs = async (hosId: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('hos_drugs')
    .select(
      `
        *,
        raw_drug_id(*)
      `,
    )
    .match({ hos_id: hosId })
    .returns<HosDrugWithRawDrug[]>()

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }

  return data
}
export const getRawDrugs = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase.from('raw_drugs').select('*')

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }

  return data
}
