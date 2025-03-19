'use server'

import { createClient } from '@/lib/supabase/server'
import { type HosDrug } from '@/types'
import { redirect } from 'next/navigation'

export const getHosDrugs = async (hosId: string) => {
  const supabase = await createClient()

  const { data: hosDrugs, error: hosDrugsError } = await supabase
    .from('hos_drugs')
    .select('*')
    .match({ hos_id: hosId })
    .order('created_at', { ascending: false })
    .returns<HosDrug[]>()

  if (hosDrugsError) {
    console.error(hosDrugsError)
    redirect(`/error?message=${hosDrugsError.message}`)
  }
  return hosDrugs
}

export const updateHosDrugName = async (
  hosDrugInput: string,
  hosDrugId: string,
) => {
  const supabase = await createClient()
  const { error } = await supabase
    .from('hos_drugs')
    .update({ hos_drug_name: hosDrugInput })
    .match({ hos_drug_id: hosDrugId })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}

export const updateMgPerKg = async (
  mgPerKgInput: string,
  hosDrugId: string,
) => {
  const supabase = await createClient()
  const { error } = await supabase
    .from('hos_drugs')
    .update({ mg_per_kg: mgPerKgInput })
    .match({ hos_drug_id: hosDrugId })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}

export const updateMlPerKg = async (mlPerKg: string, hosDrugId: string) => {
  const supabase = await createClient()
  const { error } = await supabase
    .from('hos_drugs')
    .update({ ml_per_kg: mlPerKg })
    .match({ hos_drug_id: hosDrugId })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}

export const updateRoute = async (route: string, hosDrugId: string) => {
  const supabase = await createClient()
  const { error } = await supabase
    .from('hos_drugs')
    .update({ hos_drug_route: route })
    .match({ hos_drug_id: hosDrugId })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}

export const updateCaution = async (
  catuionInput: string,
  hosDrugId: string,
) => {
  const supabase = await createClient()
  const { error } = await supabase
    .from('hos_drugs')
    .update({ caution: catuionInput })
    .match({ hos_drug_id: hosDrugId })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}

export const deleteHosDrug = async (hosDrugId: string) => {
  const supabase = await createClient()
  const { error } = await supabase
    .from('hos_drugs')
    .delete()
    .match({ hos_drug_id: hosDrugId })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}

export const insertHosDrug = async (
  hosId: string,
  hosDrugName: string,
  mgPerKg: string,
  mlPerKg: string,
  hosDrugRoute: string,
  caution: string,
) => {
  const supabase = await createClient()

  const { error } = await supabase.from('hos_drugs').insert({
    hos_id: hosId,
    hos_drug_name: hosDrugName,
    mg_per_kg: mgPerKg,
    ml_per_kg: mlPerKg,
    hos_drug_route: hosDrugRoute,
    caution: caution,
  })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}

// export const getStaffs = async (hosId: string) => {
//   const supabase = await createClient()
//   const { data, error } = await supabase
//     .from('users')
//     .select(
//       `
//         name,
//         position,
//         rank,
//         group,
//         is_admin,
//         user_id,
//         is_vet,
//         avatar_url,
//         hos_id(
//           master_user_id,
//           group_list
//         )
//       `,
//     )
//     .match({ hos_id: hosId })
//     .returns<UserHospitalJoined[]>()
//     .order('rank', { ascending: true })

//   if (error) {
//     throw new Error(error.message)
//   }

//   return data // 무조건 1명은 있음
// }

// export const updateStaffRank = async (userId: string, rankInput: string) => {
//   const supabase = await createClient()

//   const { error: rankUpdateError } = await supabase
//     .from('users')
//     .update({ rank: Number(rankInput) })
//     .match({ user_id: userId })

//   if (rankUpdateError) {
//     console.error(rankUpdateError)
//     redirect(`/error/?message=${rankUpdateError.message}`)
//   }
// }

// export const updateStaffPosition = async (
//   userId: string,
//   positionInput: string,
// ) => {
//   const supabase = await createClient()

//   const { error } = await supabase
//     .from('users')
//     .update({ position: positionInput })
//     .match({ user_id: userId })

//   if (error) {
//     console.error(error)
//     redirect(`/error/?message=${error.message}`)
//   }
// }

// export const updateStaffGroup = async (
//   userId: string,
//   groupInput: string[],
// ) => {
//   const supabase = await createClient()

//   const { error } = await supabase
//     .from('users')
//     .update({ group: groupInput })
//     .match({ user_id: userId })

//   if (error) {
//     console.error(error)
//     redirect(`/error/?message=${error.message}`)
//   }
// }

// export const updateStaffIsVet = async (userId: string, isVetInput: boolean) => {
//   const supabase = await createClient()

//   const { error } = await supabase
//     .from('users')
//     .update({ is_vet: isVetInput })
//     .match({ user_id: userId })

//   if (error) {
//     console.error(error)
//     redirect(`/error/?message=${error.message}`)
//   }
// }

// export const updateStaffIsAdmin = async (
//   userId: string,
//   isAdminInput: boolean,
// ) => {
//   const supabase = await createClient()

//   const { error } = await supabase
//     .from('users')
//     .update({ is_admin: isAdminInput })
//     .match({ user_id: userId })

//   if (error) {
//     console.error(error)
//     redirect(`/error/?message=${error.message}`)
//   }
// }

// export const deleteStaff = async (userId: string) => {
//   const supabase = await createClient()
//   const { error: deleteStaffError } = await supabase
//     .from('users')
//     .update({
//       hos_id: null,
//       position: '미분류',
//       rank: 99,
//       group: null,
//       is_admin: false,
//     })
//     .match({ user_id: userId })

//   if (deleteStaffError) {
//     console.error(deleteStaffError)
//     redirect(`/error/?message=${deleteStaffError.message}`)
//   }

//   const { error: deleteUserInApproval } = await supabase
//     .from('user_approvals')
//     .delete()
//     .match({ user_id: userId })

//   if (deleteUserInApproval) {
//     console.error(deleteUserInApproval)
//     redirect(`/error/?message=${deleteUserInApproval.message}`)
//   }
// }

// export const updateStaffName = async (userId: string, nameInput: string) => {
//   const supabase = await createClient()

//   const { error } = await supabase
//     .from('users')
//     .update({ name: nameInput })
//     .match({ user_id: userId })

//   if (error) {
//     console.error(error)
//     redirect(`/error/?message=${error.message}`)
//   }
// }
