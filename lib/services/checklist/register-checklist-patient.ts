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
export const registerChecklist = async (
  hosId: string,
  patientId: string | null,
  birth: string | null,
  targetDate: string,
) => {
  const supabase = await createClient()
  const checklistdata: any = {
    hos_id: hosId,
    patient_id: patientId,
    due_date: targetDate,
    age_in_days: birth ? getDaysSince(birth) : 0,
    checklist_type: patientId ? null : '응급',
    checklist_set: {
      preSet: [
        {
          setname: [
            '체온(°C)',
            '심박수',
            '호흡수',
            '혈압(mmHg)',
            'SPO2(%)',
            '비고',
          ],
          settime: '0',
        },
      ],
      interval: '1',
    },
  }
  !patientId && (checklistdata.checklist_title = '응급처치')
  !patientId && (checklistdata.starttime = new Date())
  !patientId && (checklistdata.istxing = true)
  const { error } = await supabase.from('checklist').insert([checklistdata])

  //   const { error } = await supabase.rpc('register_icu', {
  //     hos_id_input: hosId,
  //     icu_io_dx_input: '',
  //     icu_io_cc_input: '',
  //     in_date_input: in_date,
  //     out_due_date_input: out_due_date,
  //     group_list_input: JSON.stringify(group_list),
  //     age_in_days_input: getDaysSince(birth),
  //     patient_id_input: patientId,
  //     main_vet_input: main_vet,
  //     sub_vet_input: '',
  //   })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
}

export const addPatientToChecklist = async (
  checkklistId: string,
  patientId: string,
  birth: string,
) => {
  const supabase = await createClient()
  const { error } = await supabase
    .from('checklist')
    .update({
      patient_id: patientId,
      age_in_days: birth ? getDaysSince(birth) : 0,
    })
    .match({ checklist_id: checkklistId })
  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
}
