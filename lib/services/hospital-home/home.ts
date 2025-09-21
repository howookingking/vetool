import { createClient } from '@/lib/supabase/server'
import type { Hospital } from '@/types'

export const fetchHosName = async (hosId: string) => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('hospitals')
    .select('name')
    .match({ hos_id: hosId })
    .single()

  if (error) {
    console.error(error)
    throw new Error(error.message)
  }

  return data.name
}

export type HospitalList = Pick<
  Hospital,
  'hos_id' | 'name' | 'city' | 'district' | 'plan'
>

export const fetchHospitalList = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('hospitals')
    .select(
      `
        hos_id,
        name,
        city,
        district,
        plan
      `,
    )
    .order('created_at')

  if (error) {
    console.log(error)
    throw new Error(error.message)
  }

  return data as HospitalList[]
}
