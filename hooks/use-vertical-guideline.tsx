import { useCallback, useState } from 'react'

export default function useVerticalGuideline() {
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null)
  const handleColumnHover = useCallback(
    (columnIndex: number) => setHoveredColumn(columnIndex),
    [],
  )
  const handleColumnLeave = useCallback(() => setHoveredColumn(null), [])
  return {
    hoveredColumn,
    handleColumnHover,
    handleColumnLeave,
  }
}
