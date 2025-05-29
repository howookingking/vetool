'use server'

import { createClient } from '@/lib/supabase/server'
import { type SelectedChart } from '@/types/icu/chart'

export const getDayChecklistChart = async (
  hosId: string,
  targetDate: string,
  patient_id: string,
) => {
  const supabase = await createClient()
  const {data,error} = await supabase.from('checklist').select().eq('due_data',targetDate);
//   const { data, error } = await supabase
//     .rpc('get_icu_chart_data', {
//       hos_id_input: hosId,
//       target_date_input: targetDate,
//       patient_id_input: patient_id,
//     })
//     .overrideTypes<SelectedChart>()

  if (error) {
    throw new Error(error.message)
  }

  return data 
}

// export const getPrevChecklistChartData = async (patientId: string) => {
//   const supabase = await createClient()

//   const { data, error } = await supabase
//     .from('icu_charts')
//     .select('icu_chart_id, target_date')
//     .match({ patient_id: patientId })
//     .order('created_at', { ascending: false })
//     .limit(2)

//   if (error) {
//     throw new Error(error.message)
//   }

//   return data[1] ?? null
// }
