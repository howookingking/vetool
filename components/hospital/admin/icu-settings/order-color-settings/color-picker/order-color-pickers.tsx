import OrderColorPicker from './order-color-picker'

export default function OrderColorPickers({
  sortedOrders,
  handleOrderColor,
}: {
  sortedOrders: [string, string][]
  handleOrderColor: (orderType: string, color: string) => void
}) {
  return (
    <section className="space-y-2">
      <h3 className="font-semibold">오더타입별 색상 선택</h3>
      <ul className="flex flex-wrap items-end gap-3">
        {sortedOrders.map(([key, value]) => (
          <li key={key}>
            <OrderColorPicker
              color={value}
              orderType={key}
              handleChangeOrderTypeColor={handleOrderColor}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
