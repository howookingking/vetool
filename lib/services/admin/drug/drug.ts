'use server'

import { createClient } from '@/lib/supabase/server'
import { HosDrug } from '@/types'
import { redirect } from 'next/navigation'

export const upsertHosDrugData = async (
  data: Partial<HosDrug>,
  hosId: string,
) => {
  const supabase = await createClient()

  const { error: upsertDietError } = await supabase.from('hos_drugs').upsert({
    hos_id: hosId,
    raw_drug_id: data.raw_drug_id!,
    hos_drug_name: data.hos_drug_name,
    hos_drug_indication: data.hos_drug_indication,
    hos_drug_side_effect: data.hos_drug_side_effect,
    hos_drug_description: data.hos_drug_description,
    hos_drug_dosages: data.hos_drug_dosages,
    hos_drug_tags: data.hos_drug_tags,
  })

  if (upsertDietError) {
    console.error(upsertDietError)
    redirect(`/error?message=${upsertDietError.message}`)
  }
}
