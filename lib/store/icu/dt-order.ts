import { create } from 'zustand'

export type DtOrderTimePendingQueue = {
  orderTime: number
  orderId: string
}

type DtOrderTimePendingQueueState = {
  orderTimePendingQueue: DtOrderTimePendingQueue[]
  setOrderTimePendingQueue: (
    updater:
      | DtOrderTimePendingQueue[]
      | ((prev: DtOrderTimePendingQueue[]) => DtOrderTimePendingQueue[]),
  ) => void

  resetTimePendingQueue: () => void
}

export const useDtOrderTimePendingQueueStore =
  create<DtOrderTimePendingQueueState>((set) => ({
    orderTimePendingQueue: [],
    setOrderTimePendingQueue: (updater) =>
      set((state) => ({
        orderTimePendingQueue:
          typeof updater === 'function'
            ? updater(state.orderTimePendingQueue)
            : updater,
      })),

    resetTimePendingQueue: () =>
      set({
        orderTimePendingQueue: [],
      }),
  }))
