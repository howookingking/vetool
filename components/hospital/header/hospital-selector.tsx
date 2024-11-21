'use client'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import type { HosListData } from '@/types/hospital'
import { ChevronsUpDown } from 'lucide-react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

export default function HospitalSelector({
  hosList,
}: {
  hosList: HosListData[]
}) {
  const { hos_id } = useParams()
  const pathname = usePathname()
  const router = useRouter()
  const currentHosName = hosList.find(
    (hospital) => hospital.hos_id === hos_id,
  )?.name

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(currentHosName)

  const handleSelect = (currentValue: string) => {
    const selectedHospital = hosList.find(
      (hospital) => hospital.name === currentValue,
    )

    if (selectedHospital) {
      setValue(currentValue === value ? '' : currentValue)
      setOpen(false)

      const newPath = pathname.replace(
        /\/hospital\/[^\/]+/,
        `/hospital/${selectedHospital.hos_id}`,
      )
      router.push(newPath)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="fixed top-1.5 z-30">
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="w-[18rem] justify-between rounded-none border-b-2 border-primary"
        >
          {value
            ? hosList.find((hospital) => hospital.name === value)?.name
            : '병원을 선택해주세요'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[18rem] p-0">
        <Command>
          <CommandInput placeholder="병원 검색" />
          <CommandList>
            <CommandEmpty>등록된 병원이 존재하지 않습니다.</CommandEmpty>
            <CommandGroup>
              {hosList.map((hospital) => (
                <CommandItem
                  key={hospital.hos_id}
                  value={hospital.name}
                  onSelect={handleSelect}
                >
                  <span className="text-xs">{hospital.name}&nbsp;</span>
                  <span className="text-[11px]">{` - ${hospital.city} ${hospital.district}`}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
