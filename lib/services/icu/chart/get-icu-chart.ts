'use server'

import { createClient } from '@/lib/supabase/server'
import type { SelectedIcuChart } from '@/types/icu/chart'
import { redirect } from 'next/navigation'

export const getSelectedIcuChart = async (
  targetDate: string,
  patient_id: string,
) => {
  const supabase = await createClient()

  const { data, error } = await supabase.rpc('get_selected_icu_chart', {
    target_date_input: targetDate,
    patient_id_input: patient_id,
  })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
  return data as SelectedIcuChart | null
}

export const getPrevIoChartData = async (patientId: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('icu_charts')
    .select('icu_chart_id, target_date')
    .match({ patient_id: patientId })
    .order('created_at', { ascending: false })
    .limit(2)

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }

  return data[1] ?? null
}

export type IoHistory = Awaited<ReturnType<typeof getIoHistories>>[number]
export const getIoHistories = async (patientId: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('icu_io')
    .select('in_date, out_date')
    .match({ patient_id: patientId })
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }

  return data
}

export type PatientIo = Awaited<ReturnType<typeof getPatientIos>>[number]
export const getPatientIos = async (patientId: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('icu_io')
    .select('icu_io_id, in_date, out_date, icu_io_dx, icu_io_cc')
    .match({ patient_id: patientId })
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }

  return data
}

export type ChartByIo = Awaited<ReturnType<typeof getChartsByIoId>>[number]
export const getChartsByIoId = async (icuIoId: string) => {
  const supabase = await createClient()

  const { data, error: error } = await supabase
    .from('icu_charts')
    .select('icu_chart_id, target_date, patient_id')
    .order('target_date', { ascending: true })
    .match({ icu_io_id: icuIoId })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }

  return data
}
