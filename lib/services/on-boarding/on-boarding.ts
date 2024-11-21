'use server'

import { getUser } from '@/lib/services/auth/authorization'
import { createClient } from '@/lib/supabase/server'
import type { UserApprovalHosJoined } from '@/types/on-boarding'
import { redirect } from 'next/navigation'

export const getUserAppoval = async () => {
  const supabase = await createClient()
  const authUser = await getUser()

  const { data, error } = await supabase
    .from('user_approvals')
    .select(
      `
          user_approval_id,
          hos_id (name)
        `,
    )
    .match({
      user_id: authUser?.id,
    })
    .returns<UserApprovalHosJoined>()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}
export const cancelApproval = async (userApprovalId: string) => {
  const supabase = await createClient()

  const { error } = await supabase.from('user_approvals').delete().match({
    user_approval_id: userApprovalId,
  })

  if (error) {
    console.error(error)
    throw new Error(error.message)
  }

  redirect('/')
}

export const getHospitals = async () => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('hospitals')
    .select('hos_id, name, city, district')
    .order('name', { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const sendApprovalToHospital = async (
  hosId: string,
  isVet: boolean,
  username: string,
) => {
  const supabase = await createClient()
  console.error(hosId)
  const { error } = await supabase.rpc(
    'update_user_info_when_sending_approval',
    {
      is_vet_input: isVet,
      name_input: username,
      hos_id_input: hosId,
    },
  )

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}

export const createHospital = async (
  name: string,
  username: string,
  isVet: boolean,
  city: string,
  district: string,
  businessNumber: string,
) => {
  const supabase = await createClient()

  const { data, error } = await supabase.rpc(
    'update_user_info_when_create_new_hospital',
    {
      hos_name_input: name,
      user_name_input: username,
      is_vet_input: isVet,
      city_input: city,
      district_input: district,
      business_number_input: businessNumber,
    },
  )

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }

  return data
}
