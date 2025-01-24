import { type SelectedChart } from '@/types/icu/chart'
import { create } from 'zustand'

type CopiedChartState = {
  copiedChartId?: string
  setCopiedChartId: (icuChartId?: string) => void

  copiedChart?: SelectedChart
  setCopiedChart: (copiedChart: SelectedChart) => void

  reset: () => void
}

export const useCopiedChartStore = create<CopiedChartState>((set) => ({
  copiedChartId: undefined,
  setCopiedChartId: (icuChartId?: string) => set({ copiedChartId: icuChartId }),

  copiedChart: undefined,
  setCopiedChart: (copiedChart) => {
    set({ copiedChart })
  },

  reset: () =>
    set({
      copiedChartId: undefined,
      copiedChart: undefined,
    }),
}))
