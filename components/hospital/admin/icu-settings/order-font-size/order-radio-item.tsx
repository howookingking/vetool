import OrderTypeColorDot from '@/components/hospital/common/order/order-type-color-dot'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import { Label } from '@/components/ui/label'
import { RadioGroupItem } from '@/components/ui/radio-group'
import React from 'react'
import { cn } from '@/lib/utils/utils'
import { IcuOrderColors } from '@/types/adimin'

export default function OrderRadioItem({
  title,
  desc,
  value,
}: {
  title: string
  desc: string
  value: string
}) {
  const {
    basicHosData: { orderColorDisplay, orderColorsData },
  } = useBasicHosDataContext()

  return (
    <div className="flex items-center space-x-4 py-2">
      <RadioGroupItem value={value} id={title} className="peer" />
      <Label
        htmlFor={title}
        className={cn('w-4/5 border bg-primary/20')}
        style={{
          background:
            orderColorDisplay === 'full'
              ? orderColorsData['injection' as keyof IcuOrderColors]
              : 'transparent',
        }}
      >
        <div className="flex h-11 items-center justify-between px-2">
          <div className="flex items-center gap-2">
            {orderColorDisplay === 'dot' && (
              <OrderTypeColorDot
                orderColorsData={orderColorsData}
                orderType={'injection'}
              />
            )}
            <span
              className="truncate font-semibold"
              style={{ fontSize: title }}
            >
              Metronidazole IV BID
            </span>
          </div>
          <span
            className="truncate font-semibold text-muted-foreground"
            style={{ fontSize: desc }}
          >
            7.2mL
          </span>
        </div>
      </Label>
    </div>
  )
}
