'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getSelectedIcuChart } from './chart/get-icu-chart'

export const fetchSharedIcuData = async (
  icuIoId: string,
  targetDate: string,
) => {
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

  const sharedChartData = await getSelectedIcuChart(
    icuIoData?.hos_id as string,
    targetDate,
    icuIoData?.patient_id as string,
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
