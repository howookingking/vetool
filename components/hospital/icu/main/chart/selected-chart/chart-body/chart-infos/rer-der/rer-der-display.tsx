export default function RerDerDisplay({
  calcuatedVal,
  prefix,
}: {
  calcuatedVal: string
  prefix: string
}) {
  return (
    <div className="col-span-3 flex h-9 cursor-not-allowed items-center justify-between rounded-md border px-2.5">
      <span className="text-sm font-semibold text-muted-foreground">
        {prefix}
      </span>
      <div className="flex items-end gap-2">
        <span className={`${calcuatedVal === '숫자입력' && 'text-rose-500'}`}>
          {calcuatedVal}
        </span>
        <span className="text-sm leading-6 text-muted-foreground">
          kcal/day
        </span>
      </div>
    </div>
  )
}
