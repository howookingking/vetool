'use server'

import { createClient } from '@/lib/supabase/server'

export const getIoDateRange = async (ioId: string) => {
  const supabase = await createClient()

  const { data: IcuIoDateRange, error: IcuIoDateRangeError } = await supabase
    .from('icu_charts')
    .select('target_date')
    .match({ icu_io_id: ioId })
    .order('target_date')

  if (IcuIoDateRangeError) {
    throw new Error(IcuIoDateRangeError.message)
  }

  return IcuIoDateRange
}
