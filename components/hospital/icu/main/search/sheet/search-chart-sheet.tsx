import type { SearchOptions } from '@/components/hospital/icu/main/search/icu-search-chart'
import DateRagneSelect from '@/components/hospital/icu/main/search/sheet/date-range-select'
import OrderSelect from '@/components/hospital/icu/main/search/sheet/order-select'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { CalendarSearch } from 'lucide-react'
import { type Dispatch, type SetStateAction, useState } from 'react'

export default function SearchChartSheet({
  searchOptions,
  setSearchOptions,
}: {
  searchOptions: SearchOptions
  setSearchOptions: Dispatch<SetStateAction<SearchOptions>>
}) {
  const { timeRange, order } = searchOptions

  const [options, setOptions] = useState(searchOptions)

  const handleOkButtonClick = () => {
    setSearchOptions(options)
  }

  const handleValueChange = (value: string) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      timeRange: value,
    }))
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <CalendarSearch className="cursor-pointer text-primary" size={18} />
      </SheetTrigger>

      <SheetContent className="max-w-[400px]">
        <SheetHeader>
          <SheetTitle>검색 필터 설정</SheetTitle>
          <SheetDescription>
            기본 값은 최근 1개월 및 최신순 정렬입니다
          </SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 py-4">
          <DateRagneSelect timeRange={timeRange} onChange={handleValueChange} />
          <OrderSelect order={order} setOptions={setOptions} />
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button type="button" onClick={handleOkButtonClick}>
              확인
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
