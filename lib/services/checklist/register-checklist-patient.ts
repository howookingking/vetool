'use server'

import { defaultChecklistSet } from '@/constants/checklist/checklist'
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
// tag[1]: 'species'
// tag[2] : 'breed'
// tag[3] : 'gender'
// tag[4] : 'age'
// tag[5] : 'name'
// tag[6] : 'owner_name'
export const registerChecklist = async (
  hosId: string,
  patientId: string | null,
  birth: string | null,
  targetDate: string,
  isEmergency: boolean,
  species: string,
  breed: string,
  gender: string,
  patientName: string,
  hosPatientId: string,
) => {
  const supabase = await createClient()
  const pretag =
    '#' +
    species +
    '#' +
    breed +
    '#' +
    gender +
    '#' +
    patientName +
    '#' +
    hosPatientId
  const checklistdata: any = {
    hos_id: hosId,
    patient_id: patientId ?? null,
    due_date: targetDate,
    age_in_days: birth ? getDaysSince(birth) : 0,
    checklist_type: null,
    checklist_set: defaultChecklistSet,
    checklist_tag: pretag,
  }
  isEmergency && (checklistdata.checklist_title = '응급처치') //응급일경우 타이틀을 바로 지정
  isEmergency && (checklistdata.checklist_type = '응급')
  isEmergency && (checklistdata.starttime = new Date()) // 응급일경우 바로 시작시간 기록
  isEmergency && (checklistdata.istxing = true)
  const { error } = await supabase.from('checklist').insert([checklistdata])

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
}

export const addPatientToChecklist = async (
  checkklistId: string,
  patientId: string,
  birth: string,
  species: string,
  breed: string,
  gender: string,
  patientName: string,
  hosPatientId: string,
  checklist_tag: string,
) => {
  const supabase = await createClient()
  const prechecklisttag = checklist_tag.split('#')
  const prechecklisttagB = prechecklisttag.filter((tag) => tag !== '')
  let checklisttag = ''
  for (let i = 0; i < prechecklisttagB.length; i++) {
    checklisttag = checklisttag + '#' + prechecklisttagB[i]
  }
  const pretag =
    checklist_tag === '' ||
    checklist_tag === null ||
    checklist_tag === undefined
      ? '#' +
        species +
        '#' +
        breed +
        '#' +
        gender +
        '#' +
        patientName +
        '#' +
        hosPatientId
      : '#' +
        species +
        '#' +
        breed +
        '#' +
        gender +
        '#' +
        patientName +
        '#' +
        hosPatientId +
        checklisttag

  const { error } = await supabase
    .from('checklist')
    .update({
      patient_id: patientId,
      age_in_days: birth ? getDaysSince(birth) : 0,
      checklist_tag: pretag,
    })
    .match({ checklist_id: checkklistId })
  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
}
