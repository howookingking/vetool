import { create } from 'zustand'

type RealtimeSubscriptionState = {
  isSubscriptionReady: boolean
  setIsSubscriptionReady: (isSubscriptionReady: boolean) => void
}

export const useRealtimeSubscriptionStore = create<RealtimeSubscriptionState>(
  (set) => ({
    isSubscriptionReady: false,
    setIsSubscriptionReady: (state) => set({ isSubscriptionReady: state }),
  }),
)
