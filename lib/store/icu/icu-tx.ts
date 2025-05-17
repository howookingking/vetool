import type { TxLog } from '@/types/icu/chart'
import { create } from 'zustand'

export type TxLocalState = {
  txResult?: string | null
  txComment?: string | null
  txLog?: TxLog[] | null
  time?: number
  txId?: string
  icuChartOrderId?: string
  isCrucialChecked?: boolean
  icuChartOrderType?: string
  icuChartOrderName?: string
  txImages?: File[]
  bucketImagesLength?: number
} | null

type IcuTxStoreState = {
  txStep: 'closed' | 'detailInsert' | 'selectUser'
  setTxStep: (txStep: 'closed' | 'detailInsert' | 'selectUser') => void

  txLocalState: TxLocalState
  setTxLocalState: (updates: Partial<TxLocalState>) => void

  isMutationCanceled: boolean
  setIsMutationCanceled: (isMutationCanceled: boolean) => void

  reset: () => void
}

export const useIcuTxStore = create<IcuTxStoreState>((set) => ({
  txStep: 'closed',
  setTxStep: (txStep) => set({ txStep }),

  txLocalState: null,
  setTxLocalState: (updates) =>
    set((state) => ({ txLocalState: { ...state.txLocalState, ...updates } })),

  isMutationCanceled: false,
  setIsMutationCanceled: (isMutationCanceled) => set({ isMutationCanceled }),

  reset: () =>
    set({
      txStep: 'closed',
      txLocalState: null,
    }),
}))
