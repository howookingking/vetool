'use client'

import Suggestions from '@/components/common/auto-complete/suggestions'
import HelperTooltip from '@/components/common/helper-tooltip'
import { Input } from '@/components/ui/input'
import { useOutsideClick } from '@/hooks/use-outside-click'
import { useKeywordTrieStore } from '@/lib/store/hospital/keyword-trie'
import { cn } from '@/lib/utils/utils'
import { Keyword } from '@/types/hospital/keywords'
import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useDebouncedCallback } from 'use-debounce'

export default function Autocomplete({
  className,
  label,
  handleUpdate,
  defaultValue,
  isUpdating,
  placeholder,
  isShare,
}: {
  className?: string
  label?: string
  handleUpdate?: (value: string) => void
  defaultValue?: string
  isUpdating?: boolean
  placeholder?: string
  isShare?: boolean
}) {
  const { trie } = useKeywordTrieStore()

  const [input, setInput] = useState(defaultValue ?? '')
  const [suggestions, setSuggestions] = useState<Keyword[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [cursorPosition, setCursorPosition] = useState(0)
  const autocompleteComponentRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useOutsideClick(autocompleteComponentRef, () => {
    if (suggestions.length === 0) return
    setSuggestions([])
  })

  useEffect(() => {
    setInput(defaultValue ?? '')
  }, [defaultValue])

  const getWordAtCursor = (keywords: string, position: number) => {
    const leftPart = keywords.slice(0, position).split(/,\s*/)
    const rightPart = keywords.slice(position).split(/,\s*/)
    const wordAtCursor = (leftPart[leftPart.length - 1] + rightPart[0]).trim()
    return wordAtCursor
  }

  const debouncedSearch = useDebouncedCallback(
    (inputValue: string, cursorPos: number) => {
      if (trie && inputValue) {
        const wordAtCursor = getWordAtCursor(inputValue, cursorPos)
        const results = trie
          .search(wordAtCursor)
          .sort((a, b) => a.keyword.length - b.keyword.length)
          .slice(0, 15)
        setSuggestions(results)
      } else {
        setSuggestions([])
      }
    },
    200,
  )

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value
      const cursorPos = event.target.selectionStart || 0
      setInput(inputValue)
      setCursorPosition(cursorPos)
      debouncedSearch(inputValue, cursorPos)
      setSelectedIndex(0)
    },
    [debouncedSearch],
  )

  const insertSuggestion = useCallback(
    (suggestion: Keyword) => {
      const beforeCursor = input.slice(0, cursorPosition).split(/,\s*/)
      const afterCursor = input.slice(cursorPosition).split(/,\s*/)

      const hasKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(
        beforeCursor[beforeCursor.length - 1],
      )
      beforeCursor[beforeCursor.length - 1] = hasKorean
        ? `${suggestion.keyword}(${suggestion.mainKeyword})`
        : suggestion.keyword

      const newInput = [...beforeCursor, ...afterCursor.slice(1)].join(', ')
      setInput(newInput)
      setSuggestions([])

      // 중간 키워드 수정 후 커서 위치 유지
      const timeoutId = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus()
          const newCursorPosition = beforeCursor.join(', ').length
          inputRef.current.setSelectionRange(
            newCursorPosition,
            newCursorPosition,
          )
        }
      }, 0)

      return () => clearTimeout(timeoutId) // 클린업 추가
    },
    [input, cursorPosition],
  )

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex((prevIndex) => (prevIndex + 1) % suggestions.length)
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(
          (prevIndex) =>
            (prevIndex - 1 + suggestions.length) % suggestions.length,
        )
        break
      case 'Escape':
        e.preventDefault()
        setSuggestions([])
        break
      case 'Tab':
        setSuggestions([])
        break
      case 'Enter':
        if (suggestions.length === 0) {
          inputRef.current?.blur()
          return
        }
        e.preventDefault()
        e.stopPropagation()
        insertSuggestion(suggestions[selectedIndex])
        break
    }
  }

  return (
    <div
      className={cn('relative w-full', className)}
      ref={autocompleteComponentRef}
    >
      {label && (
        <p className="absolute left-2 top-2.5 text-xs text-muted-foreground">
          {label}
        </p>
      )}

      <Input
        autoComplete="off"
        id={label}
        ref={inputRef}
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className={cn(label ? 'pl-8' : '')}
        onBlur={() => handleUpdate!(input)}
        disabled={isUpdating}
        placeholder={placeholder ?? ''}
        aria-label={label}
      />

      {suggestions.length > 0 && (
        <Suggestions
          suggestions={suggestions}
          insertSuggestion={insertSuggestion}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      )}

      {!isShare && (
        <HelperTooltip className="absolute right-2 top-2">
          키워드는 콤마로 구분됩니다
        </HelperTooltip>
      )}
    </div>
  )
}
