'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const updateOrdererSetting = async (
  hosId: string,
  showOrderInput: boolean,
  showTxUserInput: boolean,
) => {
  const supabase = await createClient()

  const { error } = await supabase
    .from('hospitals')
    .update({ show_orderer: showOrderInput, show_tx_user: showTxUserInput })
    .match({ hos_id: hosId })

  if (error) {
    console.error(error)
    redirect(`/error/?message=${error.message}` as any)
  }
}
