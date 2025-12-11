'use server'

import { createClient } from '@/lib/supabase/server'

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
