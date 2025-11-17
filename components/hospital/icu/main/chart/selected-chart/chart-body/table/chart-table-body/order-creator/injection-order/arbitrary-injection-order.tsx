import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { OrderType } from '@/constants/hospital/icu/chart/order'
import { Plus, X } from 'lucide-react'
import { type RefObject, useEffect, useRef, useState } from 'react'

type Props = {
  createOrder: (
    orderName: string,
    orderType: OrderType,
    orderDescription: string,
  ) => Promise<void>
  setIsArbitraryOrder: React.Dispatch<React.SetStateAction<boolean>>
  setIsAutocompleteOpen: React.Dispatch<React.SetStateAction<boolean>>
  autocompleteInputRef: RefObject<HTMLInputElement | null>
  setInputValue: React.Dispatch<React.SetStateAction<string>>
}

export default function ArbitraryInjectionOrder({
  createOrder,
  setIsArbitraryOrder,
  setIsAutocompleteOpen,
  autocompleteInputRef,
  setInputValue,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const [arbitraryInjectionInput, setArbitraryInjectionInput] = useState('')
  const [isInserting, setIsInserting] = useState(false)

  useEffect(() => {
    inputRef?.current?.focus()
  }, [])

  const handleClickX = () => {
    setIsArbitraryOrder(false)
    setInputValue('')
    setTimeout(() => {
      autocompleteInputRef?.current?.focus()
    }, 0)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!arbitraryInjectionInput) return

    const [orderName, orderDescription] = arbitraryInjectionInput.split('$')

    setIsInserting(true)
    setArbitraryInjectionInput('')

    await createOrder(orderName, 'injection', orderDescription ?? '')

    setIsInserting(false)
    setIsArbitraryOrder(false)
    setIsAutocompleteOpen(false)
  }

  return (
    <form className="relative w-full" onSubmit={handleSubmit}>
      <Input
        className="h-11 w-full rounded-none border-0 pr-10 focus-visible:ring-0"
        disabled={isInserting}
        placeholder="주사오더$주사량 + Enter ⏎"
        value={isInserting ? '등록 중' : arbitraryInjectionInput}
        onChange={(e) => setArbitraryInjectionInput(e.target.value)}
        ref={inputRef}
      />
      <Button
        className="absolute right-8 top-1 2xl:hidden"
        size="icon"
        disabled={isInserting}
        type="submit"
        variant="ghost"
      >
        <Plus />
      </Button>
      <X
        className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer"
        onClick={handleClickX}
      />
    </form>
  )
}
