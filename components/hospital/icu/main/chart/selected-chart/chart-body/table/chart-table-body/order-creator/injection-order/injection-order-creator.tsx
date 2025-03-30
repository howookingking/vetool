import { Button } from '@/components/ui/button'
import {
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/components/ui/use-toast'
import { getHosDrugs } from '@/lib/services/admin/icu/hos-drugs'
import { cn } from '@/lib/utils/utils'
import { Command as CommandPrimitive } from 'cmdk'
import { Plus } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import ArbitraryInjectionOrder from './arbitrary-injection-order'

type Props = {
  weight: string
  createOrder: (orderName: string, orderDescription: string) => Promise<void>
}

type Option = Record<'value' | 'label', string> & Record<string, string>

export function InjectionOrderCreator({ weight, createOrder }: Props) {
  const { hos_id } = useParams()

  const [isArbitraryOrder, setIsArbitraryOrder] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [isAutocompleteOpen, setIsAutocompleteOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [hosDrugOptions, setHosDrugOptions] = useState<
    {
      value: string // 0.2 (mlPerKg)
      label: string // AMC 12.5mg/kg IV 익스텐션
    }[]
  >([])

  const autocompleteInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setIsFetching(true)

    getHosDrugs(hos_id as string).then((data) => {
      const drugOptions = data.map((drug) => ({
        value: `${drug.ml_per_kg}`,
        label:
          `${drug.hos_drug_name} ${drug.unit_per_kg}${drug.unit}/kg ${drug.hos_drug_route} ${drug.caution}`.trim(),
      }))
      setHosDrugOptions(drugOptions)
    })

    setIsFetching(false)
  }, [hos_id])

  const handleInsertArbitraryOrder = async () => {
    const [drugName, totalDose] = inputValue.split('$')

    setInputValue('')
    setIsAutocompleteOpen(false)

    await createOrder(drugName, totalDose)

    setTimeout(() => {
      autocompleteInputRef?.current?.blur()
    }, 0)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const input = autocompleteInputRef.current
    if (!input) {
      return
    }
    if (
      event.nativeEvent.isComposing ||
      (event.key !== 'Enter' && event.key !== 'Escape')
    )
      return

    // Keep the options displayed when the user is typing
    if (!isAutocompleteOpen) {
      setIsAutocompleteOpen(true)
    }

    if (event.key === 'Escape') {
      input.blur()
      setInputValue('')
    }
  }

  const handleSelectOption = (selectedOption: Option) => {
    if (!weight) {
      toast({
        title: '체중을 입력해주세요',
        variant: 'destructive',
      })
      return
    }

    createOrder(
      selectedOption.label,
      `${(Number(selectedOption.value) * Number(weight)).toFixed(2)}ml`,
    )
    setInputValue('')

    // This is a hack to prevent the input from being focused after the user selects an option
    // We can call this hack: "The next tick"
    setTimeout(() => {
      autocompleteInputRef?.current?.blur()
    }, 0)
  }

  const handleClickArbitraryOrder = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault()
    event.stopPropagation()
    handleInsertArbitraryOrder()
  }

  if (isArbitraryOrder) {
    return (
      <ArbitraryInjectionOrder
        createOrder={createOrder}
        setIsArbitraryOrder={setIsArbitraryOrder}
        setIsAutocompleteOpen={setIsAutocompleteOpen}
        autocompleteInputRef={autocompleteInputRef}
        setInputValue={setInputValue}
      />
    )
  }

  return (
    <CommandPrimitive className="w-full" onKeyDown={handleKeyDown}>
      <CommandInput
        noIcon
        ref={autocompleteInputRef}
        value={inputValue}
        onValueChange={isFetching ? undefined : setInputValue}
        onBlur={() => setIsAutocompleteOpen(false)}
        onFocus={() => setIsAutocompleteOpen(true)}
        placeholder="자주 사용하는 약물선택 혹은 직접추가"
        disabled={isFetching}
        className="h-11 w-full border-b-0"
      />

      <div className="relative">
        <div
          className={cn(
            'absolute top-1 z-10 w-full rounded-xl bg-white outline-none animate-in fade-in-0 zoom-in-95',
            isAutocompleteOpen ? 'block' : 'hidden',
          )}
        >
          <CommandList className="rounded-lg ring-1 ring-slate-200">
            {isFetching && (
              <CommandPrimitive.Loading>
                <div className="p-1">
                  <Skeleton className="h-8 w-full" />
                </div>
              </CommandPrimitive.Loading>
            )}

            {hosDrugOptions.length === 0 && !isFetching && (
              <CommandGroup>
                <CommandItem
                  onMouseDown={(event) => {
                    event.preventDefault()
                    event.stopPropagation()
                    setIsArbitraryOrder(true)
                  }}
                >
                  <Plus className="h-4 w-4" />
                  직접 추가
                </CommandItem>
              </CommandGroup>
            )}

            {hosDrugOptions.length > 0 && !isFetching && (
              <CommandGroup>
                <CommandItem
                  onMouseDown={(event) => {
                    event.preventDefault()
                    event.stopPropagation()
                    setIsArbitraryOrder(true)
                  }}
                >
                  <Plus className="h-4 w-4" />
                  직접 추가
                </CommandItem>
                {hosDrugOptions.map((option) => {
                  return (
                    <CommandItem
                      key={option.label}
                      value={option.label}
                      onMouseDown={(event) => {
                        event.preventDefault()
                        event.stopPropagation()
                      }}
                      onSelect={() => handleSelectOption(option)}
                      className="flex justify-between gap-2"
                    >
                      <span className="text-sm">{option.label}</span>
                      <span className="shrink-0 text-[10px] text-muted-foreground">
                        {weight
                          ? `${(Number(option.value) * Number(weight)).toFixed(2)}ml`
                          : '체중입력'}
                      </span>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            )}

            {!isFetching && (
              <CommandPrimitive.Empty className="select-none rounded-sm p-1 text-center text-sm">
                <Button
                  className="flex w-full items-center gap-2"
                  variant="ghost"
                  onMouseDown={handleClickArbitraryOrder}
                >
                  <Plus className="h-4 w-4" /> {inputValue.split('$')[0]}{' '}
                  <span className="text-xs text-muted-foreground">
                    {inputValue.split('$')[1]}
                  </span>
                </Button>
              </CommandPrimitive.Empty>
            )}
          </CommandList>
        </div>
      </div>
    </CommandPrimitive>
  )
}
