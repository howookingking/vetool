'use server'

import { createClient } from '@/lib/supabase/server'
import type { SummaryData } from '@/types/icu/summary'

export const fetchSummaryData = async (hosId: string, targetDate: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase.rpc('fetch_icu_summary_data', {
    hos_id_input: hosId,
    target_date_input: targetDate,
  })

  if (error) {
    throw new Error(error.message)
  }

  return data as {
    prev_summary_count: number
    target_date_summary_data: SummaryData[]
  }
}
