import { useZustandIcuRealtimeStore } from '@/lib/store/icu/realtime-state'
import { cn } from '@/lib/utils/utils'

export default function RealtimeStatus() {
  const isRealtimeReady = useZustandIcuRealtimeStore(
    (state) => state.isRealtimeReadyZustand,
  )
  return (
    <div className="mr-2 flex items-center gap-2">
      <div
        className={cn(
          'h-2 w-2 rounded-full',
          isRealtimeReady ? 'animate-pulse bg-green-500' : 'bg-red-500',
        )}
      />
      <span className="text-xs text-muted-foreground">실시간</span>
    </div>
  )
}
