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
      <MultiSelectorTrigger
        className={cn(
          'fixed left-2 top-[48px] z-40 w-[calc(100vw-16px)] 2xl:left-auto 2xl:right-2 2xl:top-[-4px] 2xl:w-[640px]',
        )}
      >
        <MultiSelectorInput placeholder="오더 타입 선택" />
      </MultiSelectorTrigger>

      <MultiSelectorContent>
        <MultiSelectorList className="fixed left-2 top-[104px] z-40 w-[calc(100vw-16px)] 2xl:left-auto 2xl:right-2 2xl:top-12 2xl:w-[640px]">
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
