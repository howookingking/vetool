'use server'

import { createClient } from '@/lib/supabase/server'
import type {
  NotOutDuePatientsData,
  OutDuePatientsData,
  VisitablePatientsData,
  VisitPatientData,
} from '@/types/icu/movement'
import { redirect } from 'next/navigation'

export const getNotOutDuePatients = async (
  hosId: string,
  targetDate: string,
) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .rpc('get_not_out_due_patients', {
      hos_id_input: hosId,
      target_date_input: targetDate,
    })
    .returns<NotOutDuePatientsData[] | null>()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const getVisitablePatients = async (
  hosId: string,
  targetDate: string,
) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .rpc('get_icu_visitable_patients', {
      hos_id_input: hosId,
      target_date_input: targetDate,
    })
    .returns<VisitablePatientsData[]>()

  if (error) {
    throw new Error(error.message)
  }

  return data || []
}

export const deleteVisitPatient = async (visitId: string) => {
  const supabase = await createClient()

  const { error } = await supabase.from('icu_visit').delete().match({
    icu_visit_id: visitId,
  })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error?.message}`)
  }
}

export const getVisitPatients = async (hosId: string, targetDate: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .rpc('get_icu_visit_patients', {
      hos_id_input: hosId,
      target_date_input: targetDate,
    })
    .returns<VisitPatientData[]>()

  if (error) {
    throw new Error(error.message)
  }

  return data || []
}

export const getIcuOutDuePatients = async (
  hosId: string,
  targetDate: string,
) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .rpc('get_icu_out_due_patients', {
      hos_id_input: hosId,
      target_date_input: targetDate,
    })
    .returns<OutDuePatientsData[]>()

  if (error) {
    throw new Error(error.message)
  }

  return data || []
}

export const updatePatientOutDueDate = async (
  icuIoId: string,
  hosId: string,
  targetDate: string,
) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('icu_io')
    .update({ out_due_date: targetDate })
    .match({ hos_id: hosId, icu_io_id: icuIoId })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error?.message}`)
  }
}
