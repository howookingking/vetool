import OrderTypeColorDot from '@/components/hospital/common/order/order-type-color-dot'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { TableCell, TableRow } from '@/components/ui/table'
import { toast } from '@/components/ui/use-toast'
import {
  BG_CANDIDATES,
  CHECKLIST_ORDERS,
  DEFAULT_ICU_ORDER_TYPE,
  type OrderType,
} from '@/constants/hospital/icu/chart/order'
import { upsertOrder } from '@/lib/services/icu/chart/order-mutation'
import type { IcuOrderColors } from '@/types/adimin'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { Plus } from 'lucide-react'
import { useParams } from 'next/navigation'
import {
  type Dispatch,
  type FormEvent,
  type SetStateAction,
  useRef,
  useState,
} from 'react'
import { OrderTypeLabel } from '../../order/order-form-field'
import ChecklistOrderCreator from './checklist-order-creator'
import { InjectionOrderCreator } from './injection-order/injection-order-creator'
import UserKeyGuideMessage from './user-key-guide-message'

type Props = {
  icuChartId: string
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
  sortedOrders: SelectedIcuOrder[]
  orderColorsData: IcuOrderColors
  weight: string
}

export default function OrderCreatorRow({
  icuChartId,
  setSortedOrders,
  sortedOrders,
  orderColorsData,
  weight,
}: Props) {
  const { hos_id } = useParams()

  const inputRef = useRef<HTMLInputElement | null>(null)

  const [newOrderInput, setNewOrderInput] = useState('')
  const [orderType, setOrderType] = useState<OrderType>('manual')
  const [isInserting, setIsInserting] = useState(false)

  const availableCheckListOrders = getAvailableChecklistOrders(sortedOrders)

  const createOrder = async (
    orderName: string,
    orderType: OrderType,
    orderDescription: string,
  ) => {
    setIsInserting(true)

    const emptyOrderTimes = Array(24).fill('0')

    const newOrder = {
      id: 999,
      order_id: `temp_order_id_${new Date().getTime()}`,
      order_name: orderName.trim(),
      order_comment: orderDescription ? orderDescription.trim() : '',
      order_type: orderType as OrderType,
      order_times: emptyOrderTimes,
      treatments: [],
      is_bordered: false,
    }

    setSortedOrders((prev) => [...prev, newOrder])

    await upsertOrder(
      hos_id as string,
      icuChartId,
      undefined, // insert
      emptyOrderTimes,
      {
        icu_chart_order_name: orderName.trim(),
        icu_chart_order_comment: orderDescription
          ? orderDescription.trim()
          : '',
        icu_chart_order_type: orderType,
      },
    )

    toast({
      title: `${orderName} 오더를 생성하였습니다`,
    })

    setNewOrderInput('')
    setIsInserting(false)

    setTimeout(() => {
      inputRef?.current?.focus()
    }, 100)
  }

  // const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.nativeEvent.isComposing || e.key !== 'Enter') return
  //   if (!newOrderInput) return

  //   const [orderName, orderDescription] = newOrderInput.split('$')

  //   // 체크리스트후보군을 INPUT에 입력했을 경우(혈당, bg, 혈압 등...) 체크리스트애 있음을 안내
  //   // if (
  //   //   CHECKLIST_ORDER_CANDIDATES.some((name) =>
  //   //     name.includes(orderName.toLowerCase()),
  //   //   )
  //   // ) {
  //   //   setIsChecklistOrder(true)
  //   //   setOrderType('checklist')
  //   //   setNewOrderInput('')
  //   //   return
  //   // }

  //   await createOrder(orderName, orderDescription ?? '')
  // }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!newOrderInput) return

    const [orderName, orderDescription] = newOrderInput.split('$')

    if (
      BG_CANDIDATES.some(
        (name) => name.toLowerCase() === orderName.toLowerCase(),
      )
    ) {
      createOrder('혈당', 'checklist', orderDescription ?? '')
      return
    }

    await createOrder(orderName, orderType, orderDescription ?? '')
  }

  const orderTypeLabel = OrderTypeLabel(orderType as OrderType)
  const OrderTypePlaceholder = `${orderTypeLabel.orderName}$${orderTypeLabel.orderComment} + Enter ⏎`

  return (
    <TableRow className="hover:bg-transparent">
      <TableCell className="p-0">
        <div className="relative flex w-full items-center">
          <Select
            onValueChange={(value: string) => {
              setOrderType(value as OrderType)
            }}
            value={orderType}
          >
            <SelectTrigger className="h-11 w-[128px] shrink-0 rounded-none border-0 border-r px-2 shadow-none ring-0 focus:ring-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="p-0">
              {DEFAULT_ICU_ORDER_TYPE.filter((order) =>
                availableCheckListOrders.length > 0
                  ? order
                  : order.value !== 'checklist',
              ).map((item) => (
                <SelectItem
                  key={item.value}
                  value={item.value}
                  className="rounded-none p-1 transition hover:opacity-70"
                >
                  <div className="flex items-center gap-2">
                    <OrderTypeColorDot
                      orderType={item.value}
                      orderColorsData={orderColorsData}
                    />
                    <span>{item.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {orderType === 'checklist' && (
            <ChecklistOrderCreator
              createOrder={createOrder}
              setOrderType={setOrderType}
              availableCheckListOrders={availableCheckListOrders}
            />
          )}

          {orderType === 'injection' && (
            <InjectionOrderCreator weight={weight} createOrder={createOrder} />
          )}

          {orderType !== 'checklist' && orderType !== 'injection' && (
            <form
              className="relative flex w-full items-center gap-2"
              onSubmit={handleSubmit}
            >
              <Input
                className="h-11 rounded-none border-0 pr-11 focus-visible:ring-0"
                disabled={isInserting}
                placeholder={OrderTypePlaceholder}
                value={isInserting ? '등록 중' : newOrderInput}
                onChange={(e) => setNewOrderInput(e.target.value)}
                ref={inputRef}
              />
              <Button
                className="absolute right-2"
                size="icon"
                disabled={isInserting}
                type="submit"
                variant="ghost"
              >
                <Plus />
              </Button>
            </form>
          )}
        </div>
      </TableCell>

      <UserKeyGuideMessage />
    </TableRow>
  )
}

function getAvailableChecklistOrders(orders: SelectedIcuOrder[]) {
  const currentChecklistTypeOrderNames = orders
    .filter((order) => order.order_type === 'checklist')
    .map((order) => order.order_name)

  return CHECKLIST_ORDERS.filter(
    (order) => !currentChecklistTypeOrderNames.includes(order),
  )
}
