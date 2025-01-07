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
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import { ChevronDown } from 'lucide-react'
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
    <div className="flex h-12 justify-center">
      <MultiSelector
        values={localFilterState}
        options={DEFAULT_ICU_ORDER_TYPE.map((type) => ({
          value: type.value,
          label: type.label,
        }))}
        onValuesChange={setLocalFilterState}
        className="relative h-12 w-[280px] rounded-none md:w-[560px]"
      >
        <MultiSelectorTrigger className="relative my-auto rounded-md p-0">
          <MultiSelectorInput
            placeholder="오더 타입"
            className="cursor-pointer p-2 px-3"
          />
          <ChevronDown className="absolute right-2 top-3 z-10" size={14} />
        </MultiSelectorTrigger>

        <MultiSelectorContent
          direction="down"
          className="absolute left-0 top-10 z-40 w-full"
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
    </div>
  )
}
