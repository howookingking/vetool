import type { IcuChartOrderJoined } from '@/types/icu'
import { create } from 'zustand'

type CopiedChartState = {
  copiedChartId: string
  selectedTargetDate: string
  copiedChartOrder: IcuChartOrderJoined[]
  isCopyDialogOpen: boolean

  setCopiedChartId: (icuChartId: string) => void
  setSelectedTargetDate: (selectedTargetDate: string) => void
  setCopiedChartOrder: (copiedChartOrder: IcuChartOrderJoined[]) => void
  setIsCopyDialogOpen: (isCopyDialogOpen: boolean) => void
  reset: () => void
}

const initialState = {
  copiedChartId: '',
  selectedTargetDate: '',
  copiedChartOrder: [],
  isCopyDialogOpen: false,
}

// 특정 차트의 Chart Id를 저장하는 Store
export const useCopiedChartStore = create<CopiedChartState>((set) => ({
  ...initialState,

  setCopiedChartId: (icuChartId: string) => set({ copiedChartId: icuChartId }),
  setSelectedTargetDate: (selectedTargetDate: string) =>
    set({ selectedTargetDate }),
  setCopiedChartOrder: (selectedChartOrder) => {
    set({ copiedChartOrder: selectedChartOrder })
  },
  setIsCopyDialogOpen: (isCopyDialogOpen: boolean) => set({ isCopyDialogOpen }),
  reset: () => set(initialState),
}))