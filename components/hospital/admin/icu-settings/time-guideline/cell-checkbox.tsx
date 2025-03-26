import { Checkbox } from '@/components/ui/checkbox'
import { TableCell } from '@/components/ui/table'
import { type Dispatch, useState } from 'react'

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
  const [isChecked, setIsChecked] = useState(isGuidelineTime)

  const handleCheckedChange = () => {
    setIsChecked((prev) => !prev)
    setLocalTimeGuideline((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time],
    )
  }
  return (
    <TableCell className="text-center [&:has([role=checkbox])]:pr-2">
      <Checkbox checked={isChecked} onCheckedChange={handleCheckedChange} />
    </TableCell>
  )
}
