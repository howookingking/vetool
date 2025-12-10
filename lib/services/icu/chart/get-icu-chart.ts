'use server'

import { createClient } from '@/lib/supabase/server'
import type { SelectedIcuChart } from '@/types/icu/chart'

export const getSelectedIcuChart = async (
  targetDate: string,
  patient_id: string,
) => {
  const supabase = await createClient()

  const { data, error } = await supabase.rpc('get_selected_icu_chart', {
    target_date_input: targetDate,
    patient_id_input: patient_id,
  })

  if (error) {
    throw new Error(error.message)
  }

  return data as SelectedIcuChart | null
}

export const getPrevIoChartData = async (patientId: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('icu_charts')
    .select('icu_chart_id, target_date')
    .match({ patient_id: patientId })
    .order('created_at', { ascending: false })
    .limit(2)

  if (error) {
    throw new Error(error.message)
  }

  return data[1] ?? null
}
