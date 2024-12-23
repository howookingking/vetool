'use server'

import { createClient } from '@/lib/supabase/server'
import { IcuOrderColors } from '@/types/adimin'
import { redirect } from 'next/navigation'

export const getHosOrderColor = async (hosId: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('hospitals')
    .select('order_color')
    .match({ hos_id: hosId })
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data.order_color
}

export const getHosOrderColorSettings = async (hosId: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('hospitals')
    .select('order_color, order_color_display')
    .match({ hos_id: hosId })
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const updateOrderColorSettings = async (
  hosId: string,
  orderTypeColorsInput: IcuOrderColors,
  orderColorDisplayMethodInput: string,
) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('hospitals')
    .update({
      order_color: orderTypeColorsInput,
      order_color_display: orderColorDisplayMethodInput,
    })
    .match({ hos_id: hosId })

  if (error) {
    console.error(error)
    redirect(`/error?message=${error.message}`)
  }
}
