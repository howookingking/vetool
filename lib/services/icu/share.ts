'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getIcuChart } from './chart/get-icu-chart'

export const getSharedIcuData = async (icuIoId: string, targetDate: string) => {
  const supabase = await createClient()

  const { data: icuIoData, error: icuIoDataError } = await supabase
    .from('icu_io')
    .select('hos_id, patient_id')
    .match({ icu_io_id: icuIoId })
    .maybeSingle()

  if (icuIoDataError) {
    console.error(icuIoDataError)
    redirect(`/error?message=${icuIoDataError.message}`)
  }

  const sharedChartData = await getIcuChart(
    icuIoData?.hos_id,
    targetDate,
    icuIoData?.patient_id,
  )

  return sharedChartData
}

export const checkIfUserIsVisitor = async () => {
  const supabase = await createClient()
  const {
    data: { user: supabaseUser },
    error,
  } = await supabase.auth.getUser()

  if (!supabaseUser) {
    return true
  }

  return false
}
