'use server'

import { createClient } from '@/lib/supabase/server'

export const getHosOrderFontSize = async (hosId: string) => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('hospitals')
    .select('order_font_size')
    .match({ hos_id: hosId })
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data.order_font_size
}

export const updateOrderFontSize = async (hosId: string, fontSize: string) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('hospitals')
    .update({ order_font_size: Number(fontSize) })
    .match({ hos_id: hosId })

  if (error) {
    throw new Error(error.message)
  }
}
