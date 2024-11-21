'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const getMaintenaceRateCalcMethod = async (hosId: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('hospitals')
    .select('maintenance_rate_calc_method')
    .match({ hos_id: hosId })
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data.maintenance_rate_calc_method
}

export const updateMaintenanceRateCalcMethod = async (
  hosId: string,
  maintenanceRateCalcMethodInput: string,
) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('hospitals')
    .update({ maintenance_rate_calc_method: maintenanceRateCalcMethodInput })
    .match({ hos_id: hosId })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}`)
  }
}
