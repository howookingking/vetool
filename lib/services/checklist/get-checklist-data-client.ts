import {
  ChecklistPatinet,
  FilteredTxChart,
  TxchartData,
} from './../../../types/checklist/checklistchart'
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
        console.log('Realtime change:')

        onDataChange(payload.new)
      },
    )
    .subscribe()

  return channel
}
export const getTodayTxDataRealtime = async (
  targetdate: string,
  hosId: string,
  onDataChange: (payload: any) => void,
) => {
  const channel = supabase
    .channel(`realtime:allchecklist:${hosId}`)
    .on(
      'postgres_changes',
      {
        event: '*', // 'INSERT' | 'UPDATE' | 'DELETE'
        schema: 'public',
        table: 'checklist',
        filter: `hos_id=eq.${hosId}`,
      },
      (payload) => {
        console.log('Realtime change: all re-upload')
        // if (payload.eventType === 'DELETE') {
        //   onDataChange(payload.old)
        // } else if (
        //   payload.old?.starttime !== payload.new?.starttime ||
        //   payload.old?.endtime !== payload.new?.endtime
        // ) {
        //   console.log('change sidebar msg')
        //   onDataChange(payload.new)
        // }
        payload.new ? onDataChange(payload.new) : onDataChange(payload.old)
      },
    )
    .subscribe()

  return channel
}
export const getTodayTxData = async (targetdate: string, hosId: string) => {
  const { data, error } = await supabase
    .from('checklist')
    .select('*')
    .eq('hos_id', hosId)

  if (error) {
    console.error("Error fetching today's tx data:", error)
    return null
  }
  if (data) {
    const predata: FilteredTxChart = { today: [], todaydone: [], ing: [] }

    data.map((tx: any) => {
      if (tx.istxing) {
        predata.ing.push(tx)
      } else if (tx.enddate === targetdate) {
        predata.todaydone.push(tx)
      } else if (tx.due_date === targetdate && !tx.enddate) {
        predata.today.push(tx)
      }
    })
    return predata
  }
}
export const getAllTxChartReal = async (
  hosId: string,
  onDataChange: (payload: any) => void,
) => {
  const channel = supabase
    .channel(`realtime:checklist:${hosId}`)
    .on(
      'postgres_changes',
      {
        event: '*', // 'INSERT' | 'UPDATE' | 'DELETE'
        schema: 'public',
        table: 'checklist',
        filter: `hos_id=eq.${hosId}`,
      },
      (payload) => {
        console.log('Realtime change: all re-upload')
        if (
          payload.old.starttime !== payload.new.starttime ||
          payload.old.endtime !== payload.new.endtime
        ) {
          console.log('change sidebar msg')
          onDataChange(payload.new)
        } else if (payload.eventType === 'DELETE') {
          onDataChange({ msg: 'delete' })
        }
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

export const getPatientById = async (
  patientId: string,
): Promise<ChecklistPatinet | null> => {
  const { data, error } = await supabase
    .from('patients')
    .select(
      `
      patient_id,
      name,
      species,
      gender,
      birth,
      breed,
      hos_patient_id
    `,
    )
    .eq('patient_id', patientId)
    .single()

  if (error) {
    console.error('getPatientByHosId error:', error)
    return null
  }

  return data
}

export const deleteChecklist = async (checklistId: string) => {
  const { data, error } = await supabase
    .from('checklist')
    .delete()
    .eq('checklist_id', checklistId)

  if (error) {
    console.error('삭제 실패:', error.message)
  } else {
    console.log('삭제 완료:', data)
  }
}
