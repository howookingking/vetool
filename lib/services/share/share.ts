'use server'

import { createClient } from '@/lib/supabase/server'
import { IcuShareData } from '@/types/icu/chart'
import { redirect } from 'next/navigation'

export const getIcuShareData = async (icuIoId: string, targetDate: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .rpc('get_icu_share_data', {
      icu_io_id_input: icuIoId,
      target_date_input: targetDate,
    })
    .returns<IcuShareData>()

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }

  return data
}
