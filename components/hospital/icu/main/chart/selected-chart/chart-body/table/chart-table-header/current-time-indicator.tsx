export const CurrentTimeIndicator = ({ minutes }: { minutes: number }) => {
  const minutesPerHour = (minutes / 60) * 100

  return (
    <div
      className="absolute bottom-0 top-0"
      style={{ left: `${minutesPerHour}%` }}
    >
      <div className="relative z-[100] h-full w-0.5">
        {/* Pulsing dot */}
        <div className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 transform">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
          <div className="absolute left-0 top-0 h-2.5 w-2.5 animate-ping rounded-full bg-red-500" />
        </div>

        {/* Line */}
        <div className="absolute bottom-0 top-0 h-full w-full bg-red-500" />
      </div>
    </div>
  )
}
