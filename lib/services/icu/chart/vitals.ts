'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const getWeightData = async (patientId: string) => {
  const supabase = await createClient()

  const { data: weightData, error: weightDataError } = await supabase
    .from('vitals')
    .select('body_weight, created_at, vital_id')
    .match({ patient_id: patientId })
    .order('created_at', { ascending: false })

  if (weightDataError) {
    console.log(weightDataError)
    redirect(`/error?message=${weightDataError.message}`)
  }

  return weightData ?? []
}

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
