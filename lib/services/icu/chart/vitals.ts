'use server'

import { createClient } from '@/lib/supabase/server'
import { VitalTxData } from '@/types/icu/chart'
import { redirect } from 'next/navigation'

/**
 * 입원일 이후의 몸무게 바이탈 데이터를 가져옵니다.
 * @param patientId - 환자 ID
 * @param inDate - 입원일
 * @returns 몸무게 바이탈 데이터
 */
export const getWeightData = async (patientId: string, inDate: string) => {
  const supabase = await createClient()

  const { data: weightData, error: weightDataError } = await supabase
    .from('vitals')
    .select('body_weight, created_at, vital_id')
    .match({ patient_id: patientId })
    .gte('created_at', inDate)
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

export const getVitalTxData = async (patientId: string, inDate: string) => {
  const supabase = await createClient()

  const { data: vitalTxData, error: vitalTxDataError } = await supabase
    .rpc('get_icu_vital_tx_data', {
      patient_id_input: patientId,
      target_date_input: inDate,
    })
    .returns<VitalTxData[]>()

  if (vitalTxDataError) {
    console.error(vitalTxDataError)
    redirect(`/error?message=${vitalTxDataError.message}`)
  }

  return vitalTxData ?? []
}
