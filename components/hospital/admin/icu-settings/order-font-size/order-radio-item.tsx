import { Label } from '@/components/ui/label'
import { RadioGroupItem } from '@/components/ui/radio-group'
import React from 'react'

export default function OrderRadioItem({
  title,
  desc,
  value,
}: {
  title: string
  desc: string
  value: string
}) {
  return (
    <div className="flex items-center space-x-4 py-2">
      <RadioGroupItem value={value} id={title} className="peer" />
      <Label
        htmlFor={title}
        className={`w-4/5 border bg-primary/20 transition-all duration-200 ease-in-out hover:ring hover:ring-primary peer-data-[state=checked]:ring peer-data-[state=checked]:ring-primary`}
      >
        <div className="flex h-11 items-center justify-between px-2">
          <span className="truncate font-semibold" style={{ fontSize: title }}>
            Metronidazole IV BID
          </span>
          <span
            className="truncate font-semibold text-muted-foreground"
            style={{ fontSize: desc }}
          >
            7.2ml
          </span>
        </div>
      </Label>
      {value === '14' && (
        <span className="text-sm font-semibold text-rose-600">(기본 설정)</span>
      )}
    </div>
  )
}
