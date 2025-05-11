'use server'

import { createClient } from '@/lib/supabase/server'
import { VitalData } from '@/types/icu/chart'
import { redirect } from 'next/navigation'

export const updateWeightData = async (
  patientId: string,
  weight: string,
  vitalId?: number,
) => {
  if (!vitalId) return

  const supabase = await createClient()

  const { error: vitalsError } = await supabase
    .from('vitals')
    .update({
      body_weight: weight.slice(0, 4),
      patient_id: patientId,
    })
    .match({ vital_id: vitalId })

  if (vitalsError) {
    console.error(vitalsError)
    redirect(`/error?message=${vitalsError.message}`)
  }
}

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
