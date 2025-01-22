'use server'

import { createClient } from '@/lib/supabase/server'
import { IcuChartsInCharge } from '@/types/adimin'
import { redirect } from 'next/navigation'

export const updateDiagnosis = async (
  icuIoId: string,
  diagnosisInput: string,
) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('icu_io')
    .update({
      icu_io_dx: diagnosisInput,
    })
    .match({ icu_io_id: icuIoId })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}

export const updateChiefComplaint = async (
  icuIoId: string,
  chiefComplaint: string,
) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('icu_io')
    .update({
      icu_io_cc: chiefComplaint,
    })
    .match({ icu_io_id: icuIoId })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}

export const updateMainSubVet = async (
  icuChartId: string,
  mainVetId: string,
  inCharge: IcuChartsInCharge,
  subVetId?: string,
) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('icu_charts')
    .update({
      main_vet: mainVetId,
      sub_vet: subVetId === 'null' ? null : subVetId,
      in_charge: inCharge,
    })
    .match({ icu_chart_id: icuChartId })
  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}

export const updateGroup = async (icuIoId: string, groupList: string[]) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('icu_io')
    .update({
      group_list: groupList,
    })
    .match({ icu_io_id: icuIoId })
  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}

export const updateOutDueDate = async (
  icuIoId: string,
  outDueDate: string | null,
) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('icu_io')
    .update({ out_due_date: outDueDate })
    .match({ icu_io_id: icuIoId })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}

export const updateMemos = async (
  query: { [key: string]: string },
  icuIoId: string,
) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('icu_io')
    .update(query)
    .match({ icu_io_id: icuIoId })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}

export const toggleOutPatient = async (
  icuIoId: string,
  patientId: string,
  isPatientOut: boolean,
  hashtaggedDxCc: string,
  patientBreed: string,
  patientName: string,
  patientSpecies: string,
  ownerName: string,
  patientGender: string,
  ageInDays: number,
  isAlive: boolean,
) => {
  const supabase = await createClient()

  const { error } = await supabase.rpc('toggle_io_patient_out', {
    icu_io_id_input: icuIoId,
    patient_id_input: patientId,
    is_patient_out_input: isPatientOut,
    keywords_input: hashtaggedDxCc,
    patient_breed_input: patientBreed,
    patient_name_input: patientName,
    patient_species_input: patientSpecies,
    owner_name_input: ownerName,
    gender_input: patientGender,
    age_in_days_input: ageInDays,
    is_alive_input: isAlive,
  })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}

export const updateOwnerName = async (
  patientId: string,
  ownerNameInput: string,
) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('patients')
    .update({ owner_name: ownerNameInput })
    .match({ patient_id: patientId })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}

export const updateCpcrEtTube = async (
  icuIoId: string,
  cpcr: string,
  etTube: string | null | undefined,
) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('icu_io')
    .update({ cpcr: etTube ? `${cpcr},${etTube}` : cpcr })
    .match({ icu_io_id: icuIoId })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}
export const updateDerCalcFactor = async (
  icuChartId: string,
  factor: number,
) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('icu_charts')
    .update({ der_calc_factor: factor })
    .match({ icu_chart_id: icuChartId })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}

export const updateCage = async (icuIoId: string, cage: string) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('icu_io')
    .update({ cage })
    .match({ icu_io_id: icuIoId })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}

export const updateUrgency = async (icuChartId: string, urgency: number) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('icu_charts')
    .update({ urgency })
    .match({ icu_chart_id: icuChartId })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}
