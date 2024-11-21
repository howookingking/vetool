'use server'

import { createClient } from '@/lib/supabase/server'
import type { TemplateChart } from '@/types/icu/template'

export const getBookmarkedChartData = async (hosId: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .rpc('get_icu_bookmarked_data', {
      hos_id_input: hosId,
    })
    .returns<TemplateChart[]>()

  if (error) {
    throw new Error(error.message)
  }

  return data
}
