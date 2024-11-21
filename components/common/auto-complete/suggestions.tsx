import type { Keyword } from '@/types/hospital/keywords'
import { useCallback } from 'react'

export default function Suggestions({
  suggestions,
  insertSuggestion,
  selectedIndex,
  setSelectedIndex,
}: {
  suggestions: Keyword[]
  insertSuggestion: (keyword: string) => void
  selectedIndex: number
  setSelectedIndex: (index: number) => void
}) {
  const handleSuggestionClick = useCallback(
    (suggestion: Keyword) => {
      insertSuggestion(suggestion.mainKeyword)
    },
    [insertSuggestion],
  )

  // onClick시에 prevent default해도 input요소의 포커스가 풀림
  const handleMouseDown = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    suggestion: Keyword,
  ) => {
    e.preventDefault()
    handleSuggestionClick(suggestion)
  }

  return (
    <ul className="absolute top-10 z-30 w-full overflow-y-auto border bg-white shadow">
      {suggestions.map((suggestion, index) => (
        <li
          key={suggestion.id}
          onMouseOver={() => setSelectedIndex(index)}
          onMouseDown={(e) => handleMouseDown(e, suggestion)}
          className="cursor-pointer bg-white p-2 text-xs"
          style={{
            backgroundColor: selectedIndex === index ? '#f0f0f0' : '',
          }}
        >
          {suggestion.keyword} ({suggestion.mainKeyword})
        </li>
      ))}
    </ul>
  )
}
