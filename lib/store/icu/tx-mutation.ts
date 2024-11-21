import type { TxLog } from '@/types/icu/chart'
import { create } from 'zustand'

export type TxLocalState = {
  txResult?: string | null
  txComment?: string | null
  txLog?: TxLog[] | null
  time?: number
  txId?: string
  icuChartOrderId?: string
  isNotificationChecked?: boolean
} | null

type IcuUpsertTxState = {
  txStep: 'closed' | 'detailInsert' | 'seletctUser'
  setTxStep: (txStep: 'closed' | 'detailInsert' | 'seletctUser') => void

  txLocalState: TxLocalState
  setTxLocalState: (updates: Partial<TxLocalState>) => void

  txImageState: File[] | null
  setTxImageState: (txImageState: File[] | null) => void

  isDeleting: boolean
  setIsDeleting: (isDeleting: boolean) => void

  isMutationCanceled: boolean
  setIsMutationCanceled: (isMutationCanceled: boolean) => void

  reset: () => void
}

export const useTxMutationStore = create<IcuUpsertTxState>((set) => ({
  txStep: 'closed',
  setTxStep: (txStep) => set({ txStep }),

  txLocalState: null,
  setTxLocalState: (updates) =>
    set((state) => ({ txLocalState: { ...state.txLocalState, ...updates } })),

  txImageState: null,
  setTxImageState: (txImageState) => set({ txImageState }),

  isDeleting: false,
  setIsDeleting: (isDeleting) => set({ isDeleting }),

  isMutationCanceled: false,
  setIsMutationCanceled: (isMutationCanceled) => set({ isMutationCanceled }),

  reset: () =>
    set({
      txStep: 'closed',
      txLocalState: null,
    }),
}))
