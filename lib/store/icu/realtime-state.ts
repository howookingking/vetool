import { create } from 'zustand'

type IcuRealtimeState = {
  isRealtimeReadyZustand: boolean
  setIsRealtimeReadyZustand: (isReady: boolean) => void
}

export const useZustandIcuRealtimeStore = create<IcuRealtimeState>((set) => ({
  isRealtimeReadyZustand: false,
  setIsRealtimeReadyZustand: (isReady) =>
    set({ isRealtimeReadyZustand: isReady }),
}))
