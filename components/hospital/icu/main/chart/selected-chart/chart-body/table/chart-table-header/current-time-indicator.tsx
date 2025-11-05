import PulsingDot from '@/components/hospital/common/pulsing-dot'

export const CurrentTimeIndicator = ({ minutes }: { minutes: number }) => {
  const minutesPerHour = (minutes / 60) * 100

  return (
    <div
      className="pointer-events-none absolute bottom-0 top-0"
      style={{ left: `${minutesPerHour}%` }}
    >
      <div className="relative z-50 h-full w-0.5">
        {/* Pulsing dot */}
        <PulsingDot className="left-1/2 -translate-x-1/2" />

        {/* Line */}
        <div className="absolute bottom-0 top-0 h-full w-full bg-destructive" />
      </div>
    </div>
  )
}
