import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function SortFilter({
  selectedSort,
  setSelectedSort,
}: {
  selectedSort: string
  setSelectedSort: (value: string) => void
}) {
  const path = usePathname()
  const searchParams = useSearchParams()
  const currentParams = new URLSearchParams(searchParams.toString())

  const [isSelectorOpen, setIsSelectorOpen] = useState(false)

  const { push } = useRouter()

  const handleValueChange = (value: string) => {
    currentParams.set('sort', value)
    setSelectedSort(value)

    const newUrl = `${path}${currentParams.toString() ? '?' : ''}${currentParams.toString()}`

    push(newUrl)
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-muted-foreground">정렬</span>
      <Select
        open={isSelectorOpen}
        value={selectedSort}
        onValueChange={handleValueChange}
        onOpenChange={setIsSelectorOpen}
      >
        <SelectTrigger>
          <SelectValue placeholder="정렬 기준 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="date">입원일순</SelectItem>
          <SelectItem value="vet">수의사순</SelectItem>
          <SelectItem value="name">환자 가나다순</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
