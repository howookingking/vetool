import OrderTypeColorDot from '@/components/hospital/common/order/order-type-color-dot'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  DEFAULT_ICU_ORDER_TYPE,
  type OrderType,
} from '@/constants/hospital/icu/chart/order'
import { cn } from '@/lib/utils/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import { CheckIcon, FilterIcon, RotateCcwIcon } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'

type Props = {
  orderTypeFilter: OrderType | null
  setOrderTypeFilters: Dispatch<SetStateAction<OrderType | null>>
}

export default function TxTableOrderTypeFilter({
  orderTypeFilter,
  setOrderTypeFilters,
}: Props) {
  const {
    basicHosData: { orderColorsData },
  } = useBasicHosDataContext()

  const isFilterActive = orderTypeFilter !== null

  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            className={cn(
              'absolute bottom-4 right-4 rounded-full',
              isFilterActive && 'animate-pulse',
            )}
          >
            <FilterIcon />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-[136px]" align="end">
          <DropdownMenuLabel>오더타입</DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            {DEFAULT_ICU_ORDER_TYPE.map(({ label, value }) => {
              const selectedFilter = orderTypeFilter === value
              return (
                <DropdownMenuItem
                  key={value}
                  onClick={() => setOrderTypeFilters(value)}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <OrderTypeColorDot
                      orderColorsData={orderColorsData}
                      orderType={value}
                    />
                    {label}
                  </div>

                  {selectedFilter && <CheckIcon size={14} />}
                </DropdownMenuItem>
              )
            })}

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => setOrderTypeFilters(null)}
              className="flex items-center gap-1"
            >
              <RotateCcwIcon size={14} />
              초기화
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
