import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DEFAULT_ICU_ORDER_TYPE } from '@/constants/hospital/icu/chart/order'
import { cn } from '@/lib/utils/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import { Dispatch, SetStateAction } from 'react'

export default function TxTableFilter({
  localFilterState,
  setLocalFilterState,
}: {
  localFilterState: string
  setLocalFilterState: Dispatch<SetStateAction<string>>
}) {
  const {
    basicHosData: { orderColorsData },
  } = useBasicHosDataContext()

  return (
    <Select value={localFilterState} onValueChange={setLocalFilterState}>
      <SelectTrigger
        className={cn(
          'fixed left-2 top-[54px] z-30 w-[calc(100vw-16px)] 2xl:left-auto 2xl:right-2 2xl:top-1.5 2xl:w-[240px]',
        )}
      >
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectItem key="all" value="all">
          전체
        </SelectItem>

        {DEFAULT_ICU_ORDER_TYPE.map((type) => (
          <SelectItem
            key={type.value}
            value={type.value}
            className="rounded-none transition hover:opacity-70"
          >
            <div className="flex items-center gap-2">
              <div
                className="h-4 w-4 rounded-full border"
                style={{
                  backgroundColor: orderColorsData[type.value],
                }}
              />
              {type.label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
