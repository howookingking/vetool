'use server'

import { createClient } from '@/lib/supabase/server'
import { getDaysSince } from '@/lib/utils/utils'
import { redirect } from 'next/navigation'

export const registerIcuPatient = async (
  hosId: string,
  patientId: string,
  birth: string,
  dx: string,
  cc: string,
  in_date: string,
  out_due_date: string,
  group_list: string[],
  main_vet: string,
  sub_vet?: string,
) => {
  const supabase = await createClient()

  const { error } = await supabase.rpc('register_icu', {
    hos_id_input: hosId,
    icu_io_dx_input: dx,
    icu_io_cc_input: cc,
    in_date_input: in_date,
    out_due_date_input: out_due_date,
    group_list_input: JSON.stringify(group_list),
    age_in_days_input: getDaysSince(birth),
    patient_id_input: patientId,
    main_vet_input: main_vet,
    sub_vet_input: sub_vet ?? '',
  })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
}
