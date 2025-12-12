'use server'

import { createClient } from '@/lib/supabase/server'
import type { VitalData } from '@/types/icu/chart'
import { redirect } from 'next/navigation'

export const fetchChartableVitalsData = async (icuIoId: string) => {
  const supabase = await createClient()

  const { data: vitalTxData, error: vitalTxDataError } = await supabase.rpc(
    'get_chartable_vitals_data',
    {
      icu_io_id_input: icuIoId,
    },
  )

  if (vitalTxDataError) {
    console.error(vitalTxDataError)
    redirect(`/error?message=${vitalTxDataError.message}`)
  }

  return (vitalTxData as Record<string, VitalData[]>) ?? {}
}
