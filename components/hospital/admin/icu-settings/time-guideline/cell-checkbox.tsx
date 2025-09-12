import { Checkbox } from '@/components/ui/checkbox'
import { TableCell } from '@/components/ui/table'
import type { Dispatch } from 'react'

type Props = {
  time: number
  isGuidelineTime: boolean
  setLocalTimeGuideline: Dispatch<React.SetStateAction<number[]>>
}

export default function CellCheckbox({
  time,
  isGuidelineTime,
  setLocalTimeGuideline,
}: Props) {
  const handleCheckedChange = () => {
    setLocalTimeGuideline((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time],
    )
  }
  return (
    <TableCell className="text-center [&:has([role=checkbox])]:pr-2">
      <Checkbox
        checked={isGuidelineTime}
        onCheckedChange={handleCheckedChange}
      />
    </TableCell>
  )
}
