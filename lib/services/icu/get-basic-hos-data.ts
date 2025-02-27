'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const getBasicHosData = async (hosId: string) => {
  const supabase = await createClient()

  const { data: basicHosData, error: basicHosDataError } = await supabase
    .from('hospitals')
    .select(
      `
          order_color,
          group_list,
          icu_memo_names,
          show_orderer,
          vital_ref_range,
          order_font_size,
          time_guidelines,
          order_color_display,
          show_tx_user,
          plan
        `,
    )
    .match({ hos_id: hosId })
    .single()

  if (basicHosDataError) {
    console.error(basicHosDataError)
    redirect(`/error?message=${basicHosDataError.message}`)
  }

  return basicHosData
}
