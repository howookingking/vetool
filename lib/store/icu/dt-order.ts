import type { SelectedIcuOrder } from '@/types/icu/chart'
import { create } from 'zustand'

export type DefaultOrderTimePengindQueue = {
  defaultOrderTime: number
  defaultOrderId: string
}

type IcuOrderState = {
  selectedDefaultOrder: Partial<SelectedIcuOrder>
  setSelectedDefaultOrder: (chartOrder: Partial<SelectedIcuOrder>) => void

  selectedOrderPendingQueue: Partial<SelectedIcuOrder>[]
  setSelectedOrderPendingQueue: (
    updater:
      | Partial<SelectedIcuOrder>[]
      | ((prev: Partial<SelectedIcuOrder>[]) => Partial<SelectedIcuOrder>[]),
  ) => void

  copiedOrderPendingQueue: Partial<SelectedIcuOrder>[]
  setCopiedOrderPendingQueue: (
    updater:
      | Partial<SelectedIcuOrder>[]
      | ((prev: Partial<SelectedIcuOrder>[]) => Partial<SelectedIcuOrder>[]),
  ) => void

  orderTimePendingQueue: DefaultOrderTimePengindQueue[]
  setOrderTimePendingQueue: (
    updater:
      | DefaultOrderTimePengindQueue[]
      | ((
          prev: DefaultOrderTimePengindQueue[],
        ) => DefaultOrderTimePengindQueue[]),
  ) => void

  reset: () => void
}

export const useDefaultOrderStore = create<IcuOrderState>((set) => ({
  selectedDefaultOrder: {} as Partial<SelectedIcuOrder>,
  setSelectedDefaultOrder: (selectedChartOrder) =>
    set({ selectedDefaultOrder: selectedChartOrder }),

  selectedOrderPendingQueue: [],
  setSelectedOrderPendingQueue: (updater) =>
    set((state) => ({
      selectedOrderPendingQueue:
        typeof updater === 'function'
          ? updater(state.selectedOrderPendingQueue)
          : updater,
    })),

  copiedOrderPendingQueue: [],
  setCopiedOrderPendingQueue: (updater) =>
    set((state) => ({
      copiedOrderPendingQueue:
        typeof updater === 'function'
          ? updater(state.copiedOrderPendingQueue)
          : updater,
    })),

  orderTimePendingQueue: [],
  setOrderTimePendingQueue: (updater) =>
    set((state) => ({
      orderTimePendingQueue:
        typeof updater === 'function'
          ? updater(state.orderTimePendingQueue)
          : updater,
    })),

  reset: () =>
    set({
      selectedDefaultOrder: {} as Partial<SelectedIcuOrder>,
      orderTimePendingQueue: [],
      copiedOrderPendingQueue: [],
      selectedOrderPendingQueue: [],
    }),
}))
