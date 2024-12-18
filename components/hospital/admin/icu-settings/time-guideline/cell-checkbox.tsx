import { Checkbox } from '@/components/ui/checkbox'
import { TableCell } from '@/components/ui/table'
import { Dispatch, useState } from 'react'

export default function CellCheckbox({
  time,
  isGuidelineTime,
  setLocalTimeGuideline,
}: {
  time: number
  isGuidelineTime: boolean
  setLocalTimeGuideline: Dispatch<React.SetStateAction<number[]>>
}) {
  const [isChecked, setIsChecked] = useState(isGuidelineTime)

  const handleCheckedChange = () => {
    setIsChecked((prev) => !prev)
    setLocalTimeGuideline((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time],
    )
  }
  return (
    <TableCell className="text-center">
      <Checkbox checked={isChecked} onCheckedChange={handleCheckedChange} />
    </TableCell>
  )
}
