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
          'md: fixed left-2 top-[54px] z-30 w-[calc(100vw-16px)] md:left-auto md:right-2 md:top-1.5 md:w-[240px]',
          localFilterState !== 'all' && 'pl-8',
        )}
      >
        {localFilterState !== 'all' && (
          <span className="absolute left-3 top-[13px] inline-flex h-2 w-2 animate-ping rounded-full bg-primary" />
        )}
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectItem key={'all'} value={'all'}>
          {'전체'}
        </SelectItem>

        {DEFAULT_ICU_ORDER_TYPE.map((type) => (
          <SelectItem
            key={type.value}
            value={type.value}
            style={{
              backgroundColor: orderColorsData[type.value],
            }}
            className="rounded-none transition hover:opacity-70"
          >
            {type.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
