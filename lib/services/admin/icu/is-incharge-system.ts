'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const updateIsInChargeSystem = async (
  hosId: string,
  currentIsInChageSystem: boolean,
) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('hospitals')
    .update({
      is_in_charge_system: currentIsInChageSystem,
    })
    .match({ hos_id: hosId })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
}
