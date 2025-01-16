export default function RerDerDisplay({
  calcuatedVal,
  prefix,
}: {
  calcuatedVal: string
  prefix: string
}) {
  return (
    <div className="col-span-4 flex h-9 cursor-not-allowed items-center justify-between rounded-md border px-2.5 sm:col-span-3">
      <span className="text-[11px] font-semibold text-muted-foreground md:text-sm">
        {prefix}
      </span>
      <div className="flex items-center gap-2 text-sm">
        <span className={`${calcuatedVal === '숫자입력' && 'text-rose-500'}`}>
          {calcuatedVal}
        </span>
        <span className="text-[11px] leading-6 text-muted-foreground md:text-sm">
          kcal/day
        </span>
      </div>
    </div>
  )
}
