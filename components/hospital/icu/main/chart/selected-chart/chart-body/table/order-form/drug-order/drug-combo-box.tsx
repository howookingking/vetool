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
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ChevronsUpDown } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export default function DrugComboBox({
  drugName,
  setDrugName,
  setDrugMassVolume,
  setIsAutoCalculate,
  drugs,
}: {
  drugName: string
  setDrugName: Dispatch<SetStateAction<string>>
  setDrugMassVolume: Dispatch<SetStateAction<number | null>>
  setIsAutoCalculate: Dispatch<SetStateAction<boolean>>
  drugs?: any[]
}) {
  const [isPopoverOpen, setIsPopOverOpen] = useState(false)

  const drugProducts = drugs?.flatMap((drug) => drug.drug_products)
  const selectedDrug = drugProducts?.find((drug) => drug.name === drugName)

  useEffect(() => {
    if (selectedDrug) setDrugMassVolume(selectedDrug.mass_vol)
  }, [selectedDrug, setDrugMassVolume])

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopOverOpen}>
      <Label htmlFor="drugName" className="h-5">
        약물명 <span className="text-destructive">*</span>
      </Label>
      <PopoverTrigger asChild style={{ marginTop: 0 }}>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isPopoverOpen}
          className="relative w-full justify-between"
          id="drugName"
        >
          {selectedDrug ? selectedDrug.name : '약물명 검색'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0 sm:w-[718px]">
        <Command className="w-full">
          <CommandInput placeholder="약물명 검색" />
          <CommandList>
            <CommandEmpty>검색된 약물이 존재하지 않습니다</CommandEmpty>
            <CommandGroup>
              {drugProducts?.map((drug) => (
                <CommandItem
                  key={drug.drug_products_id}
                  value={drug.name}
                  onSelect={(currentValue) => {
                    setDrugName(currentValue)
                    setDrugMassVolume(drug.mass_vol)
                    setIsAutoCalculate(true)
                    setIsPopOverOpen(false)
                  }}
                >
                  {drug.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
