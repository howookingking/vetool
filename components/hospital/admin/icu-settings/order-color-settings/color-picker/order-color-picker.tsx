import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select'
import { ORDER_COLORS } from '@/constants/hospital/icu/chart/colors'
import { DEFAULT_ICU_ORDER_TYPE } from '@/constants/hospital/icu/chart/order'

type Props = {
  color: string
  orderType: string
  handleChangeOrderTypeColor: (orderType: string, color: string) => void
}

export default function OrderColorPicker({
  color,
  orderType,
  handleChangeOrderTypeColor,
}: Props) {
  const orderTypeLabel = DEFAULT_ICU_ORDER_TYPE.find(
    (item) => item.value === orderType,
  )?.label

  return (
    <div className="flex flex-col space-y-2">
      <Label htmlFor={orderType}>{orderTypeLabel}</Label>

      <Select
        onValueChange={(selectedColor) =>
          handleChangeOrderTypeColor(orderType, selectedColor)
        }
        value={color}
      >
        <SelectTrigger className="w-32" id={orderType}>
          <div
            className="h-5 w-full rounded-full border"
            style={{
              backgroundColor: color,
            }}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {Object.entries(ORDER_COLORS).map(([key, value]) => (
              <SelectItem
                key={key}
                value={value}
                className="flex h-8 w-full justify-between"
              >
                <div
                  style={{ backgroundColor: value }}
                  className="h-4 w-20 rounded-full border"
                />
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
