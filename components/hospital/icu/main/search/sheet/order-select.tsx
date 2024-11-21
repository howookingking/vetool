import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Dispatch, SetStateAction } from 'react'
import type { SearchOptions } from '@/components/hospital/icu/main/search/icu-search-chart'

export default function OrderSelect({
  order,
  setOptions,
}: {
  order: string
  setOptions: Dispatch<SetStateAction<SearchOptions>>
}) {
  const handleValueChange = (value: 'desc' | 'asc') => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      order: value,
    }))
  }

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="username" className="text-left">
        정렬
      </Label>

      <Select defaultValue={order} onValueChange={handleValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="desc">최신순</SelectItem>
            <SelectItem value="asc">과거순</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
