import { Input } from '@/components/ui/input'
import { X } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

type Props = {
  createOrder: (orderName: string, orderDescription: string) => Promise<void>
  setIsArbitraryOrder: React.Dispatch<React.SetStateAction<boolean>>
  setIsAutocompleteOpen: React.Dispatch<React.SetStateAction<boolean>>
  autocompleteInputRef: React.RefObject<HTMLInputElement>
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

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.key !== 'Enter') return
    if (!arbitraryInjectionInput) return

    const [orderName, orderDescription] = arbitraryInjectionInput.split('$')

    setIsInserting(true)
    setArbitraryInjectionInput('')
    await createOrder(orderName, orderDescription ?? '')

    setIsInserting(false)
    setIsArbitraryOrder(false)
    setIsAutocompleteOpen(false)
  }

  const handleClickX = () => {
    setIsArbitraryOrder(false)
    setInputValue('')
    setTimeout(() => {
      autocompleteInputRef?.current?.focus()
    }, 0)
  }

  return (
    <div className="relative w-full">
      <Input
        className="h-11 w-full rounded-none border-0 focus-visible:ring-0"
        disabled={isInserting}
        placeholder="주사명$주사량"
        value={isInserting ? '등록 중' : arbitraryInjectionInput}
        onChange={(e) => setArbitraryInjectionInput(e.target.value)}
        onKeyDown={handleKeyDown}
        ref={inputRef}
      />
      <X
        className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer"
        onClick={handleClickX}
      />
    </div>
  )
}
