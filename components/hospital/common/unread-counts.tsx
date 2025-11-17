export default function UnReadCounts({ counts }: { counts: number }) {
  return (
    <div className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#f55520] px-1.5 py-0.5">
      <span className="text-[11px] font-semibold tracking-tighter text-white">
        {counts}
      </span>
    </div>
  )
}
