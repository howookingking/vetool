'use server'

import { createClient } from '@/lib/supabase/server'
import { type PatientDataTable, type PatientWithWeight } from '@/types/patients'
import { redirect } from 'next/navigation'

export const insertPatient = async (
  newPatient: {
    species: string
    name: string
    weight: string
    owner_name: string
    birth: string
    breed: string
    gender: string
    hos_patient_id: string
    memo: string
    microchip_no: string
    hos_owner_id: string
  },
  hosId: string,
) => {
  const supabase = await createClient()

  const { data, error } = await supabase.rpc('register_patient', {
    birth_input: newPatient.birth,
    body_weight_input: newPatient.weight,
    breed_input: newPatient.breed,
    gender_input: newPatient.gender,
    hos_id_input: hosId,
    hos_patient_id_input: newPatient.hos_patient_id,
    memo_input: newPatient.memo,
    microchip_no_input: newPatient.microchip_no,
    name_input: newPatient.name,
    species_input: newPatient.species,
    owner_name_input: newPatient.owner_name,
    hos_owner_id_input: newPatient.hos_owner_id,
  })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }

  return data
}

export const getPatientsData = async (hosId: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .match({ hos_id: hosId })
    .order('is_alive', { ascending: false })
    .order('created_at', { ascending: false })
    .overrideTypes<PatientDataTable[]>()

  if (error) {
    throw new Error(error.message)
  }

  return data.map((patient) => ({
    birth: patient.birth,
    name: patient.name,
    gender: patient.gender,
    breed: patient.breed,
    species: patient.species,
    owner_id: patient.owner_id,
    created_at: patient.created_at,
    hos_id: patient.hos_id,
    patient_id: patient.patient_id,
    microchip_no: patient.microchip_no,
    hos_patient_id: patient.hos_patient_id,
    memo: patient.memo,
    is_alive: patient.is_alive,
    owner_name: patient.owner_name,
    hos_owner_id: patient.hos_owner_id,
    isIcu: false,
  })) as PatientDataTable[]
}

export const getPatientData = async (patientId: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase.rpc('get_patient_data_with_vitals', {
    patient_id_input: patientId,
  })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }

  return data as PatientWithWeight
}

export const deletePatient = async (patientId: string) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('patients')
    .delete()
    .match({ patient_id: patientId })

  if (error) {
    console.error(error.message)
    redirect(`/error/?message=${error.message}`)
  }
}

export const updatePatientFromIcu = async (
  updatePatient: {
    species: string
    name: string
    weight: string
    owner_name: string
    birth: string
    breed: string
    gender: string
    hos_patient_id: string
    memo: string
    microchip_no: string
    hos_owner_id: string
  },
  patientId: string,
  icuChartId: string,
  weightMeasuredDate: string,
  isWeightChanged: boolean,
) => {
  const supabase = await createClient()

  const { error } = await supabase.rpc('update_patient_from_icu_route', {
    birth_input: updatePatient.birth,
    breed_input: updatePatient.breed,
    gender_input: updatePatient.gender,
    patient_id_input: patientId,
    memo_input: updatePatient.memo,
    microchip_no_input: updatePatient.microchip_no,
    name_input: updatePatient.name,
    species_input: updatePatient.species,
    owner_name_input: updatePatient.owner_name,
    hos_owner_id_input: updatePatient.hos_owner_id,
    weight_input: updatePatient.weight,
    icu_chart_id_input: icuChartId,
    weight_measured_date_input: weightMeasuredDate,
    is_weight_changed_input: isWeightChanged,
    hos_patient_id_input: updatePatient.hos_patient_id,
  })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
}
export const updatePatientFromPatientRoute = async (
  updatePatient: {
    species: string
    name: string
    weight: string
    owner_name: string
    birth: string
    breed: string
    gender: string
    hos_patient_id: string
    memo: string
    microchip_no: string
    hos_owner_id: string
  },
  patientId: string,
  isWeightChanged: boolean,
) => {
  const supabase = await createClient()

  const { error } = await supabase.rpc('update_patient_from_patient_route', {
    birth_input: updatePatient.birth,
    breed_input: updatePatient.breed,
    gender_input: updatePatient.gender,
    patient_id_input: patientId,
    memo_input: updatePatient.memo,
    microchip_no_input: updatePatient.microchip_no,
    name_input: updatePatient.name,
    species_input: updatePatient.species,
    owner_name_input: updatePatient.owner_name,
    hos_owner_id_input: updatePatient.hos_owner_id,
    weight_input: updatePatient.weight,
    hos_patient_id_input: updatePatient.hos_patient_id,
    is_weight_changed_input: isWeightChanged,
  })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
}

// 너무 복잡해서 아래 함수 사용
// export const searchPatientsData = async (
//   searchTerm: string,
//   hosId: string,
//   isIcu: boolean,
//   currentPage: number,
//   itemsPerPage: number,
// ) => {
//   const supabase = await createClient()

//   const { data, error } = await supabase
//     .rpc('search_patients', {
//       search_term_input: searchTerm,
//       hos_id_input: hosId,
//       is_icu_input: isIcu,
//       page_number_input: currentPage,
//       items_per_page_input: itemsPerPage,
//     })
//     .returns<PaginatedData<SearchedPatientsData[]>>()

//   if (error) {
//     console.error(error)
//     redirect(`/error?message=${error.message}`)
//   }

//   return data
// }

export const searchPatients = async (searchTerms: string[], hosId: string) => {
  const supabase = await createClient()

  let queryBuilder = supabase.from('patients').select('*').match({
    hos_id: hosId,
  })

  searchTerms.forEach((term) => {
    queryBuilder = queryBuilder.or(
      `hos_patient_id.ilike.%${term}%,name.ilike.%${term}%,owner_name.ilike.%${term}%`,
    )
  })

  const { data, error } = await queryBuilder.order('created_at', {
    ascending: false,
  })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }

  return data
}

export const isHosPatientIdDuplicated = async (
  hosPatientId: string,
  hos_id: string,
) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('patients')
    .select('patient_id')
    .match({ hos_id: hos_id, hos_patient_id: hosPatientId })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }

  return data.length ? true : false
}

export const getHosPatientCount = async (hosId: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('patients')
    .select('count', { count: 'exact' })
    .match({ hos_id: hosId })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }

  return data[0].count
}

export const getWeightInfo = async (patientId: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('vitals')
    .select('body_weight, created_at')
    .match({ patient_id: patientId })
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
  return data
}
