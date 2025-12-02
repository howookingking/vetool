import OrderTypeColorDot from '@/components/hospital/common/order/order-type-color-dot'
import { Label } from '@/components/ui/label'
import { RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils/utils'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'

type Props = {
  title: string
  desc: string
  value: string
}

export default function OrderRadioItem({ title, desc, value }: Props) {
  const {
    basicHosData: { orderColorsData },
  } = useBasicHosDataContext()

  return (
    <div className="flex items-center space-x-4 py-2">
      <RadioGroupItem value={value} id={title} className="peer" />

      <Label
        htmlFor={title}
        className={cn('w-[480px] cursor-pointer border bg-primary/20')}
      >
        <div className="flex h-11 items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <OrderTypeColorDot
              orderColorsData={orderColorsData}
              orderType={'injection'}
            />
            <span
              className="truncate font-semibold"
              style={{ fontSize: title }}
            >
              Metronidazole 10mg/kg IV CRI for 30min
            </span>
          </div>
          <span
            className="font-semibold text-muted-foreground"
            style={{ fontSize: desc }}
          >
            7.2mL
          </span>
        </div>
      </Label>
    </div>
  )
}
