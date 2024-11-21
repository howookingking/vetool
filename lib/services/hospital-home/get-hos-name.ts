import { createClient } from '@/lib/supabase/server'
import type { HosListData } from '@/types/hospital'

export const getHosName = async (hosId: string) => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('hospitals')
    .select('name')
    .match({ hos_id: hosId })
    .maybeSingle()

  if (error) {
    throw new Error(error.message)
  }

  return data?.name ?? '벳툴'
}

export const getHosList = async () => {
  const supabase = await createClient()

  const { data } = await supabase
    .rpc('get_hos_list_data')
    .returns<HosListData[]>()

  return data ?? []
}
