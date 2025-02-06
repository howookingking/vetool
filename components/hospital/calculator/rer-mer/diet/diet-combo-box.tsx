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
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils/utils'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useState, type Dispatch, type SetStateAction } from 'react'

type DietComboBoxProps = {
  mappedDietList: {
    value: string
    label: string
  }[]
  selectedDiet: string
  setSelectedDiet: Dispatch<SetStateAction<string>>
}

export default function DietComboBox({
  mappedDietList,
  selectedDiet,
  setSelectedDiet,
}: DietComboBoxProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  return (
    <div className="col-span-1 w-full space-y-2">
      <Label>사료</Label>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen} modal>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isPopoverOpen}
            className="flex w-full justify-between"
          >
            <span className="truncate">
              {selectedDiet
                ? mappedDietList.find((diet) => diet.value === selectedDiet)
                    ?.label
                : '계산할 사료 선택'}
            </span>
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
          <Command>
            <CommandInput placeholder="사료명 검색" className="h-9" />
            <CommandList>
              <ScrollArea className="h-64">
                <CommandEmpty>검색된 사료 없음</CommandEmpty>
                <CommandGroup>
                  {mappedDietList.map((diet, index) => (
                    <CommandItem
                      key={diet.label + index}
                      value={diet.label}
                      onSelect={(currentValue) => {
                        setSelectedDiet(currentValue)
                        setIsPopoverOpen(false)
                      }}
                    >
                      {diet.label}
                      <Check
                        className={cn(
                          'ml-auto',
                          selectedDiet === diet.value
                            ? 'opacity-100'
                            : 'opacity-0',
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </ScrollArea>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
