'use server'

import { createClient } from '@/lib/supabase/server'
import type { IcuOrderColors } from '@/types/adimin'
import { redirect } from 'next/navigation'

export const updateOrderColorSettings = async (
  hosId: string,
  orderTypeColorsInput: IcuOrderColors,
) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('hospitals')
    .update({
      order_color: orderTypeColorsInput,
    })
    .match({ hos_id: hosId })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
}
