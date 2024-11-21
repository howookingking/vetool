import type { IcuReadOnlyOrderData, SelectedChart } from '@/types/icu/chart'
import { create } from 'zustand'

type CopiedChartState = {
  copiedChartId?: string
  setCopiedChartId: (icuChartId?: string) => void

  // 명칭 바꿔야 할듯?
  copiedChart?: SelectedChart
  setCopiedChart: (copiedChart: SelectedChart) => void

  readOnlyOrders?: IcuReadOnlyOrderData[]
  setReadOnlyOrders: (readOnlyOrders: IcuReadOnlyOrderData[]) => void

  isConfirmCopyDialogOpen: boolean
  setIsConfirmCopyDialogOpen: (isCopyDialogOpen: boolean) => void

  isReadOnly: boolean
  setIsReadOnly: (isReadOnly: boolean) => void

  reset: () => void
}

export const useCopiedChartStore = create<CopiedChartState>((set) => ({
  copiedChartId: undefined,
  setCopiedChartId: (icuChartId?: string) => set({ copiedChartId: icuChartId }),

  copiedChart: undefined,
  setCopiedChart: (copiedChart) => {
    set({ copiedChart })
  },

  readOnlyOrders: undefined,
  setReadOnlyOrders: (readOnlyOrders) => set({ readOnlyOrders }),

  isConfirmCopyDialogOpen: false,
  setIsConfirmCopyDialogOpen: (isCopyDialogOpen) =>
    set({ isConfirmCopyDialogOpen: isCopyDialogOpen }),

  isReadOnly: false,
  setIsReadOnly: (isReadOnly) => set({ isReadOnly }),
  reset: () =>
    set({
      copiedChartId: undefined,
      copiedChart: undefined,
      isConfirmCopyDialogOpen: false,
    }),
}))
