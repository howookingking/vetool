// TODO: 입원시킬 때 icu_out테이블에 등록했었는데 왜 한지 모르겠음

'use server'

import { createClient } from '@/lib/supabase/server'
import { getDaysSince } from '@/lib/utils/utils'
import { redirect } from 'next/navigation'

export const registerIcu = async (
  hosId: string,
  patientId: string,
  birth: string,
  in_date: string,
) => {
  const supabase = await createClient()

  const { error } = await supabase.rpc('register_new_patient_in_icu', {
    hos_id_input: hosId,
    in_date_input: in_date,
    age_in_days_input: getDaysSince(birth),
    patient_id_input: patientId,
  })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
}

export const checkPatientInIcu = async (
  patientId: string,
  targetDate: string,
) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('icu_io')
    .select('icu_io_id, out_date')
    .match({ patient_id: patientId })
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }

  let isPatientInIcu

  if (!data) {
    // 한번도 입원한적 없는 경우는 당연히 현재 입원중이 아니겠지
    isPatientInIcu = false
  } else {
    // 입원 한적이 있음(가장 최근꺼만 가져옴)
    if (data.out_date) {
      // 퇴원일이 있는데 targetDate과 같거나 크다면 입원중
      if (data.out_date >= targetDate) {
        isPatientInIcu = true
      } else {
        // 퇴원일이 있는데 targetDate보다 작다면 입원중이 아님
        isPatientInIcu = false
      }
    } else {
      // 입원은 했고 퇴원일이 없으면 입원중
      isPatientInIcu = true
    }
  }

  return isPatientInIcu
}
