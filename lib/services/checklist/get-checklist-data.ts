'use server'

import { createClient } from '@/lib/supabase/server'
import type {
  ChecklistSidebarData,
  Filterdcheck,
  TxChart,
} from '@/types/checklist/checklistchart'
import type { Vet } from '@/types/icu/chart'

import { redirect } from 'next/navigation'
import { format } from 'date-fns'

export const getChecklistData = async (hosId: string, targetDate: string) => {
  const supabase = await createClient()

  const promiseArray = Promise.all([
    supabase
      .from('checklist')
      .select(
        `checklist_id,
              hos_id,
  patient_id,
  patients(
    patient_id,
    name,
    gender,
    species,
    birth,
    breed,
    hos_patient_id
    ),
  checklist_type,
  checklist_vet,
  checklist_title,
  checklist_tag,
  checklist_protocol,
  checklist_group,
  checklist_set,
  checklist_timetable,
  starttime,
  endtime,
  comment,
  preinfo,
  due_date,
   age_in_days,
  weight,
  istxing`,
      )
      .or(
        `due_date.eq.${targetDate},endtime.eq.${targetDate}
  `,
      )
      .match({ hos_id: hosId })
      .order('created_at', { ascending: true }),

    supabase
      .from('users')
      .select('name, position, user_id, avatar_url, rank')
      .match({ hos_id: hosId, is_vet: true })
      .order('rank', { ascending: true }),

    supabase
      .from('hospitals')
      .select(
        `
          order_color,
          group_list,
          icu_memo_names,
          show_orderer,
          vital_ref_range,
          order_font_size,
          time_guidelines,
          order_color_display,
          show_tx_user,
          plan,
          is_in_charge_system,
          baseline_time
        `,
      )
      .match({ hos_id: hosId })
      .single(),
  ])

  const [
    { data: checklistSidebarData, error: checklistSidebarDataError },
    { data: vetsListData, error: vetsListDataError },
    { data: basicHosData, error: basicHosDataError },
  ] = await promiseArray

  if (checklistSidebarDataError || vetsListDataError || basicHosDataError) {
    console.error({
      checklistSidebarDataError,
      vetsListDataError,
      basicHosDataError,
    })
    redirect(
      `/error?message=${
        checklistSidebarDataError?.message ||
        vetsListDataError?.message ||
        basicHosDataError?.message
      }`,
    )
  }

  const filteredChecklistData: Filterdcheck = {
    todaycheck: [],
    othercheck: [],
    donecheck: [],
  }
  //   checklistSidebarData as ChecklistSidebarData[]
  checklistSidebarData.map((list) => {
    list.due_date &&
      list.due_date !== targetDate &&
      (list.endtime === null || list.endtime === '') &&
      filteredChecklistData.othercheck.push(list)

    list.due_date &&
      list.due_date === targetDate &&
      (list.endtime === null || list.endtime === '') &&
      filteredChecklistData.todaycheck.push(list)

    list.endtime !== null &&
      format(new Date(list.endtime), 'yyyy-MM-dd') === targetDate &&
      filteredChecklistData.donecheck.push(list)
  })

  return {
    checklistSidebarData: filteredChecklistData ?? {
      todaycheck: [],
      othercheck: [],
      donecheck: [],
    },
    vetsListData: vetsListData as Vet[],
    basicHosData,
  }
}

export const getPatientChecklistData = async (checklistId: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('checklist')
    .select(
      `checklist_id,
              hos_id,
  patient_id,
  patients(
    patient_id,
    name,
    gender,
    species,
    birth,
    breed,
    hos_patient_id
    ),
  checklist_type,
  checklist_vet,
  checklist_title,
  checklist_tag,
  checklist_protocol,
  checklist_group,
  checklist_set,
  checklist_timetable,
  starttime,
  endtime,
  comment,
  preinfo,
  due_date,
  age_in_days,
  weight
  `,
    )
    .match({ checklist_id: checklistId })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error}`)
  }

  return data[0] ?? null
}

export const saveTxChart = async (txdata: TxChart) => {
  const supabase = await createClient()
  const { error } = await supabase
    .from('checklist')
    .update(txdata)
    .eq('checklist_id', txdata.checklist_id)
  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
}
