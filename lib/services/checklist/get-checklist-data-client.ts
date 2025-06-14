import { createClient } from '@/lib/supabase/client' // 클라이언트 컴포넌트용
import { TxChart } from '@/types/checklist/checklistchart'
import { createBrowserClient } from '@supabase/ssr'
const supabase = createClient()

export const getEachTxChartReal = async (
  checklistId: string,
  onDataChange: (payload: any) => void,
) => {
  const channel = supabase
    .channel(`realtime:checklist:${checklistId}`)
    .on(
      'postgres_changes',
      {
        event: '*', // 'INSERT' | 'UPDATE' | 'DELETE'
        schema: 'public',
        table: 'checklist',
        filter: `checklist_id=eq.${checklistId}`,
      },
      (payload) => {
        console.log('Realtime change:', payload)

        onDataChange(payload.new)
      },
    )
    .subscribe()

  return channel
}

export const getEachTxChart = async (
  checklistId: string,
  setData: (payload: any) => void,
) => {
  const { data, error } = await supabase
    .from('checklist')
    .select('*')
    .eq('checklist_id', checklistId)
    .single()

  if (!error && data) setData(data)
}

export const updateEachTxChart = async (txdata: TxChart) => {
  const { data, error } = await supabase
    .from('checklist')
    .update(txdata) // ← 여기에 업데이트할 데이터 객체가 필요
    .eq('checklist_id', txdata.checklist_id)

  if (error) {
    console.error('Update failed:', error.message)
    return
  }

  return data
}
