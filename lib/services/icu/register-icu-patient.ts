'use server'

import { createClient } from '@/lib/supabase/server'
import { getDaysSince } from '@/lib/utils/utils'
import { redirect } from 'next/navigation'

/**
 * 입원 환자 등록
 * @param hosId 병원 ID
 * @param patientId 환자 ID
 * @param birth 생년월일
 * @param in_date 입원일
 * @param out_due_date 퇴원 예정일
 * @param group_list 그룹 리스트
 * @param main_vet 주치의 ID
 */
export const registerIcuPatient = async (
  hosId: string,
  patientId: string,
  birth: string,
  in_date: string,
  out_due_date: string,
  group_list: string[],
  main_vet: string,
) => {
  const supabase = await createClient()

  const { error } = await supabase.rpc('register_icu', {
    hos_id_input: hosId,
    icu_io_dx_input: '',
    icu_io_cc_input: '',
    in_date_input: in_date,
    out_due_date_input: out_due_date,
    group_list_input: JSON.stringify(group_list),
    age_in_days_input: getDaysSince(birth),
    patient_id_input: patientId,
    main_vet_input: main_vet,
    sub_vet_input: '',
  })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
}
