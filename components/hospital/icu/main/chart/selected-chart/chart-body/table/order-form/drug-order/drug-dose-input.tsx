import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ReactNode, useCallback } from 'react'

export default function DrugDoseInput({
  value,
  label,
  onChange,
  unit,
  onFocus,
}: {
  value?: string
  label?: ReactNode
  onChange: (value: string) => void
  unit: string
  onFocus?: () => void
}) {
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value
        .trim()
        .replace(/[^0-9.]/g, '')
        .slice(0, 5)

      onChange(inputValue)
    },
    [onChange],
  )

  return (
    <div className="relative">
      <Label>{label}</Label>

      <Input
        value={value || ''}
        onChange={handleInputChange}
        onFocus={onFocus}
      />
      <span className="absolute right-2 top-[30px] text-sm text-muted-foreground">
        {unit}
      </span>
    </div>
  )
}
