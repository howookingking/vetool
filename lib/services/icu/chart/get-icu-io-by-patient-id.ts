'use server'

import { createClient } from '@/lib/supabase/server'

export const getLatestIoByPatientId = async (patientId: string) => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('icu_io')
    .select('in_date, out_date')
    .match({ patient_id: patientId })
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) {
    throw new Error(error.message)
  }

  return data
}
