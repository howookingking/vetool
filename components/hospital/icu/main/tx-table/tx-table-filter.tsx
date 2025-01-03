import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorReset,
  MultiSelectorTrigger,
} from '@/components/ui/multi-select'
import { DEFAULT_ICU_ORDER_TYPE } from '@/constants/hospital/icu/chart/order'
import { cn } from '@/lib/utils/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import { Dispatch, SetStateAction } from 'react'

export default function TxTableFilter({
  localFilterState,
  setLocalFilterState,
}: {
  localFilterState: string[]
  setLocalFilterState: Dispatch<SetStateAction<string[]>>
}) {
  const {
    basicHosData: { orderColorsData },
  } = useBasicHosDataContext()

  return (
    <MultiSelector
      values={localFilterState}
      options={DEFAULT_ICU_ORDER_TYPE.map((type) => ({
        value: type.value,
        label: type.label,
      }))}
      onValuesChange={setLocalFilterState}
      className="w-full"
    >
      <div className="absolute bottom-12 right-1 z-40 w-[320px] md:right-4">
        <MultiSelectorTrigger className="relative">
          <MultiSelectorInput placeholder="오더 타입 선택" />
        </MultiSelectorTrigger>
      </div>

      <MultiSelectorContent
        direction="up"
        className="absolute bottom-[328px] right-1 z-40 w-[320px] md:right-4"
      >
        <MultiSelectorList>
          <MultiSelectorReset />
          {DEFAULT_ICU_ORDER_TYPE.map((type) => (
            <MultiSelectorItem
              key={type.value}
              value={type.value}
              label={type.label}
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
            </MultiSelectorItem>
          ))}
        </MultiSelectorList>
      </MultiSelectorContent>
    </MultiSelector>
  )
}
