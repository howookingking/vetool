'use server'

import { createClient } from '@/lib/supabase/server'
import { getDaysSince } from '@/lib/utils/utils'
import type {
  ChecklistData,
  ChecklistProtocol,
  Checklistset,
  PreInfo,
} from '@/types/checklist/checklist-type'
import { redirect } from 'next/navigation'

export const registerChecklist = async (
  hosId: string,
  patientId: string,
  birth: string,
  targetDate: string,
  species: string,
  breed: string,
  gender: string,
  patientName: string,
  hosPatientId: string,
) => {
  const supabase = await createClient()

  const pretag = `#${species}#${breed}#${gender}#${patientName}#${hosPatientId}}`

  const { data, error } = await supabase
    .from('checklist')
    .insert({
      checklist_title: '',
      checklist_type: '일반',
      hos_id: hosId,
      age_in_days: getDaysSince(birth),
      checklist_tag: pretag,
      patient_id: patientId,
      due_date: targetDate,
    })
    .select('checklist_id')
    .single()

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }

  return data.checklist_id
}

export const registerEmergencyChecklist = async (
  hosId: string,
  targetDate: string,
) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('checklist')
    .insert({
      hos_id: hosId,
      checklist_title: '응급처치',
      due_date: targetDate,
      checklist_type: '응급',
      checklist_tag: '#응급처치',
      start_time: new Date().toISOString(), // 시간 이거 맞는지 봐야함
      is_txing: true,
    })
    .select('checklist_id')
    .single()

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }

  return data.checklist_id
}

type Prechecklist = {
  hos_id: string
  patient_id: string | null
  checklist_type: string
  checklist_protocol?: ChecklistProtocol
  checklist_set?: Checklistset
  preinfo?: PreInfo
  due_date: string
  checklist_tag?: string
}

export const ChecklistCopy = async (
  checklistchart: ChecklistData,
  targetDate: string,
) => {
  const supabase = await createClient()
  const pretagarray: string[] = checklistchart.checklist_tag
    ? checklistchart.checklist_tag.split('#')
    : ['', '', '', '', '', '']
  const pretag =
    '#' +
    pretagarray[1] +
    '#' +
    pretagarray[2] +
    '#' +
    pretagarray[3] +
    '#' +
    pretagarray[4] +
    '#' +
    pretagarray[5] +
    '#' +
    pretagarray.splice(7, pretagarray.length)

  const prepreset = { ...checklistchart.checklist_set } as Checklistset
  prepreset.result && delete prepreset.result

  const postprotocol: ChecklistProtocol = []
  checklistchart.checklist_protocol &&
    checklistchart.checklist_protocol.forEach((protocol) => {
      const protocol2 = { ...protocol }
      protocol2.txEnd = null
      postprotocol.push(protocol2)
    })

  const prechecklist = {
    hos_id: checklistchart.hos_id,
    patient_id:
      checklistchart.patient_id === '' ? null : checklistchart.patient_id,
    checklist_type: checklistchart.checklist_type,
    checklist_protocol: postprotocol,
    checklist_set: prepreset,
    preinfo: checklistchart.preinfo,
    due_date: targetDate,
    checklist_tag: pretag,
  } as Prechecklist

  // const { error } = await supabase.from('checklist').insert(prechecklist)

  // if (error) {
  //   console.error(error)
  //   redirect(`/error?message=${error.message}`)
  // }
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
