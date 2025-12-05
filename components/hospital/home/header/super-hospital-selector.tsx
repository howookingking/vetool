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
import { HospitalList } from '@/lib/services/hospital-home/home'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

type Props = {
  hosList: HospitalList[]
  hosId: string
}

export default function SuperHospitalSelector({ hosList, hosId }: Props) {
  const pathname = usePathname()
  const { push } = useRouter()

  const currentHosName = hosList.find(
    (hospital) => hospital.hos_id === hosId,
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
      push(newPath as any)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        className="fixed left-[6px] top-1.5 z-30 rounded-none 2xl:absolute 2xl:left-[46px]"
      >
        <Button
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {value
            ? hosList.find((hospital) => hospital.name === value)?.name
            : '병원을 선택해주세요'}
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
