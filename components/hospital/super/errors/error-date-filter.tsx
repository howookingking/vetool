'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export const DATE_FILTER_OPTIONS = [
  { value: '1', label: '1개월' },
  { value: '2', label: '2개월' },
  { value: '3', label: '3개월' },
  { value: '6', label: '6개월' },
  { value: '12', label: '1년' },
  { value: 'all', label: '전체' },
] as const

type ErrorDateFilterProps = {
  value: string
  onChange: (value: string) => void
}

export default function ErrorDateFilter({
  value,
  onChange,
}: ErrorDateFilterProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="조회 기간 선택" />
      </SelectTrigger>
      <SelectContent>
        {DATE_FILTER_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
