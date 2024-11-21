'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const insertVisitPatient = async (
  icuIoId: string,
  hosId: string,
  targetDate: string,
  mainVet: string,
  patientId: string,
) => {
  const supabase = await createClient()

  const { error } = await supabase.from('icu_visit').insert({
    icu_io_id: icuIoId,
    hos_id: hosId,
    target_date: targetDate,
    main_vet: mainVet,
    patient_id: patientId,
  })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error?.message}`)
  }
}

export const updateIsVisitDone = async (visitId: string, isDone: boolean) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('icu_visit')
    .update({
      is_done: isDone,
    })
    .match({ icu_visit_id: visitId })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error?.message}`)
  }
}
