import { Input } from '@/components/ui/input'
import { Dispatch, SetStateAction } from 'react'

export default function DerInput({
  derLocalValue,
  setDerLocalValue,
}: {
  derLocalValue: string
  setDerLocalValue: Dispatch<SetStateAction<string>>
}) {
  return (
    <div className="relative flex items-center">
      <div className="relative w-full">
        <Input
          className={`pr-18 cursor-not-allowed select-none focus-visible:ring-0 ${derLocalValue === '숫자 입력' && 'text-rose-500'}`}
          value={derLocalValue}
          onChange={(e) => {
            setDerLocalValue(e.target.value)
          }}
          readOnly
        />
        <span className="absolute right-2 top-1/2 -translate-y-1/2 cursor-not-allowed select-none text-sm text-muted-foreground">
          kcal/day
        </span>
      </div>
    </div>
  )
}
