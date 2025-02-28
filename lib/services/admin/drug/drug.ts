'use server'

import { type HosDrugFormSchema } from '@/lib/schemas/admin/admin-schema'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const upsertHosDrugData = async (
  data: HosDrugFormSchema,
  raw_drug_id: string,
  hosId: string,
) => {
  const supabase = await createClient()

  const { error: upsertDietError } = await supabase.from('hos_drugs').upsert({
    hos_id: hosId,
    raw_drug_id: raw_drug_id,
    hos_drug_name: data.hos_drug_name,
    hos_drug_route: data.hos_drug_route,
    mg_per_kg: data.mg_per_kg,
    ml_per_kg: data.ml_per_kg,
  })

  if (upsertDietError) {
    console.error(upsertDietError)
    redirect(`/error?message=${upsertDietError.message}`)
  }
}
