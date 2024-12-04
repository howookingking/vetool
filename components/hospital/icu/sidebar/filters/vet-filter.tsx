import { Command } from '@/components/ui/command'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Vet } from '@/types/icu/chart'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function VetFilter({
  vetsListData,
  selectedVet,
  setSelectedVet,
}: {
  vetsListData: Vet[]
  selectedVet: string
  setSelectedVet: (vet: string) => void
}) {
  const path = usePathname()
  const searchParams = useSearchParams()
  const currentParams = new URLSearchParams(searchParams.toString())

  const [isSelectorOpen, setIsSelectorOpen] = useState(false)

  const { push } = useRouter()

  const handleValueChange = (value: string) => {
    if (value === 'reset') {
      currentParams.delete('vet')
      setSelectedVet('')
    } else {
      currentParams.set('vet', value)
      setSelectedVet(value)
    }

    const newUrl = `${path}${currentParams.toString() ? '?' : ''}${currentParams.toString()}`

    push(newUrl)
  }

  return (
    <Select
      open={isSelectorOpen}
      onOpenChange={setIsSelectorOpen}
      onValueChange={handleValueChange}
      value={selectedVet}
    >
      <SelectTrigger className="flex h-8 w-full justify-center gap-1">
        <SelectValue placeholder="수의사" />
      </SelectTrigger>
      <SelectContent className="p-0">
        <Command>
          <SelectGroup>
            {vetsListData.map((vet) => (
              <SelectItem key={vet.user_id} value={vet.user_id}>
                <div className="flex items-center gap-1">
                  <Image
                    unoptimized
                    src={vet.avatar_url ?? ''}
                    alt={vet.name}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  {vet.name}
                </div>
              </SelectItem>
            ))}
            <SelectItem value="reset">
              <div className="text-center text-muted-foreground">
                선택 초기화
              </div>
            </SelectItem>
          </SelectGroup>
        </Command>
      </SelectContent>
    </Select>
  )
}
