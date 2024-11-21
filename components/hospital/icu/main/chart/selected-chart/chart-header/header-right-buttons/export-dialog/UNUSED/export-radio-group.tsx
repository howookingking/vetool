import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import type { Dispatch, SetStateAction } from 'react'

export default function ExportRadioGroup({
  isEntireChecked,
  setIsEntireChecked,
}: {
  isEntireChecked: boolean
  setIsEntireChecked: Dispatch<SetStateAction<boolean>>
}) {
  const handleToggle = (checked: boolean) => {
    setIsEntireChecked(checked)
  }

  return (
    <div className="mr-auto flex items-center space-x-2">
      <Checkbox
        id="entire-chart"
        checked={isEntireChecked}
        onCheckedChange={handleToggle}
      />
      <Label htmlFor="entire-chart">전체 차트 저장</Label>
    </div>
  )
}
