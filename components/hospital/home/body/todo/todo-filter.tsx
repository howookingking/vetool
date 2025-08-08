import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { type Dispatch, type SetStateAction } from 'react'

type Props = {
  activeFilter: 'all' | 'done' | 'not-done'
  setActiveFilter: Dispatch<SetStateAction<'all' | 'done' | 'not-done'>>
}

export default function TodoFilter({ activeFilter, setActiveFilter }: Props) {
  return (
    <Select
      onValueChange={(value: 'all' | 'done' | 'not-done') =>
        setActiveFilter(value)
      }
      defaultValue={activeFilter}
    >
      <SelectTrigger className="hidden w-[100px] md:block">
        <SelectValue placeholder="필터" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">모두</SelectItem>
        <SelectItem value="done">완료</SelectItem>
        <SelectItem value="not-done">미완료</SelectItem>
      </SelectContent>
    </Select>
  )
}
