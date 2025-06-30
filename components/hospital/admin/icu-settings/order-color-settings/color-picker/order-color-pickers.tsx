import { DEFAULT_ICU_ORDER_TYPE } from '@/constants/hospital/icu/chart/order'
import type { IcuOrderColors } from '@/types/adimin'
import OrderColorPicker from './order-color-picker'

type Props = {
  localColorState: IcuOrderColors
  handleOrderColor: (orderType: string, color: string) => void
}

export default function OrderColorPickers({
  localColorState,
  handleOrderColor,
}: Props) {
  const sortedOrders = Object.entries(localColorState).sort(
    (a, b) =>
      DEFAULT_ICU_ORDER_TYPE.map((order) => order.value).findIndex(
        (order) => order === a[0],
      ) -
      DEFAULT_ICU_ORDER_TYPE.map((order) => order.value).findIndex(
        (order) => order === b[0],
      ),
  )

  return (
    <section className="space-y-2">
      <h3 className="font-semibold">오더타입별 색상 선택</h3>
      <ul className="flex flex-wrap items-end gap-3">
        {sortedOrders.map(([orderType, color]) => (
          <li key={orderType}>
            <OrderColorPicker
              color={color}
              orderType={orderType}
              handleChangeOrderTypeColor={handleOrderColor}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
