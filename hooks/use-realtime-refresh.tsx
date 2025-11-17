// realtime 상태에 따라 안전하게 새로고침을 수행하는 훅
// realtime이 준비되지 않은 경우 전체 페이지를 새로고침하여 최신 데이터를 로드하고 realtime을 재활성화함

'use client'

import { useZustandIcuRealtimeStore } from '@/lib/store/icu/realtime-state'

export function useSafeRefresh() {
  const isRealtimeReady = useZustandIcuRealtimeStore(
    (s) => s.isRealtimeReadyZustand,
  )

  const safeRefresh = () => {
    if (!isRealtimeReady) {
      window.location.reload()
    }
  }

  return safeRefresh
}
