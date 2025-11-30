'use server'

import {
  DEFAULT_OUT_CHART,
  type OutChart,
} from '@/constants/hospital/icu/chart/out-and-visit'
import { createClient } from '@/lib/supabase/server'
import type { IcuIo, Patient } from '@/types'
import { redirect } from 'next/navigation'

export const addPatientToOutChart = async (
  icuIoId: string,
  targetDate: string,
) => {
  const supabase = await createClient()

  // icu_io 테이블에서 퇴원예정일을 추가함
  const { error: icuIoError } = await supabase
    .from('icu_io')
    .update({
      out_due_date: targetDate,
      out_chart: { ...DEFAULT_OUT_CHART, created_at: new Date().toISOString() },
    })
    .match({ icu_io_id: icuIoId })

  if (icuIoError) {
    console.error(icuIoError)
    redirect(`/error?message=${icuIoError?.message}`)
  }
}

export const cancelOutDue = async (icuIoId: string) => {
  const supabase = await createClient()
  // icu_io 테이블에서 퇴원예정일 및 out_chart를 NULL처리
  const { error: icuIoError } = await supabase
    .from('icu_io')
    .update({ out_due_date: null, out_chart: null })
    .match({ icu_io_id: icuIoId })

  if (icuIoError) {
    console.error(icuIoError)
    redirect(`/error?message=${icuIoError?.message}`)
  }
}

export type OutDuePatientsData = IcuIo & {
  patients: Patient
  out_chart: OutChart | null
}
export const getOutDuePatients = async (hosId: string, targetDate: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('icu_io')
    .select(
      `
        *,
        patients(*)
      `,
    )
    .match({ hos_id: hosId, out_due_date: targetDate })
    .order('created_at')

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}` as any)
  }

  return data as unknown as OutDuePatientsData[]
}

export const getOutCandidates = async (hosId: string, targetDate: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('icu_io')
    .select(
      `
        icu_io_id,
        patients (
          name,
          breed,
          owner_name,
          species
        )
      `,
    )
    .eq('hos_id', hosId)
    .is('out_date', null) // 퇴원하지 않은 환자
    .or(`out_due_date.is.null,out_due_date.neq.${targetDate}`) // 퇴원예정일이 없는 환자 or 퇴원예정일이 있는데 타겟데이트가 아닌 환자(퇴원예정일을 지정했으나 퇴원예정이 바뀔수도 있으므로)
    // .order('name', { referencedTable: 'patients', ascending: false })
    .order('created_at')

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}` as any)
  }

  return data
}

export const deleteIcuOut = async (icuOutId: string) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('icu_out')
    .delete()
    .match({ icu_out_id: icuOutId })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}` as any)
  }
}

export const updateOutChart = async (icuIoId: string, input: OutChart) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('icu_io')
    .update({ out_chart: input })
    .match({ icu_io_id: icuIoId })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error?.message}`)
  }
}
