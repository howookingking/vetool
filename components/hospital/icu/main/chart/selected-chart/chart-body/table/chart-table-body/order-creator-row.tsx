import OrderTypeColorDot from '@/components/hospital/common/order/order-type-color-dot'
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
  CHECKLIST_ORDER_CANDIDATES,
  CHECKLIST_ORDERS,
  DEFAULT_ICU_ORDER_TYPE,
} from '@/constants/hospital/icu/chart/order'
import { upsertOrder } from '@/lib/services/icu/chart/order-mutation'
import { type IcuOrderColors } from '@/types/adimin'
import { type SelectedIcuOrder } from '@/types/icu/chart'
import { useParams } from 'next/navigation'
import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import UserKeyGuideMessage from './user-key-guide-message'

type Props = {
  icuChartId: string
  setSortedOrders: Dispatch<SetStateAction<SelectedIcuOrder[]>>
  sortedOrders: SelectedIcuOrder[]
  orderColorsData: IcuOrderColors
}

function getAvailableChecklistOrders(orders: SelectedIcuOrder[]) {
  const currentChecklistTypeOrderNames = orders
    .filter((order) => order.order_type === 'checklist')
    .map((order) => order.order_name)

  return CHECKLIST_ORDERS.filter(
    (order) => !currentChecklistTypeOrderNames.includes(order),
  )
}

export default function OrderCreatorRow({
  icuChartId,
  setSortedOrders,
  sortedOrders,
  orderColorsData,
}: Props) {
  const { hos_id } = useParams()

  const inputRef = useRef<HTMLInputElement | null>(null)

  const [newOrderInput, setNewOrderInput] = useState('')
  const [orderType, setOrderType] = useState('manual')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isChecklistOrder, setIsChecklistOrder] = useState(false)

  const availableCheckListOrders = getAvailableChecklistOrders(sortedOrders)

  const createOrder = async (orderName: string, orderDescription: string) => {
    setIsSubmitting(true)

    const emptyOrderTimes = Array(24).fill('0')

    const newOrder = {
      id: 1,
      order_id: `temp_order_id_${new Date().getTime()}`,
      order_name: orderName.trim(),
      order_comment: orderDescription ? orderDescription.trim() : '',
      order_type: orderType,
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
    setIsSubmitting(false)
    setIsChecklistOrder(false)
  }

  const handleEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 맥OS 한글 마지막 중복입력 에러
    if (e.nativeEvent.isComposing || e.key !== 'Enter' || !newOrderInput) return

    const [orderName, orderDescription] = newOrderInput.split('$')

    // 체크리스트후보군을 INPUT에 입력했을 경우(혈당, bg, 혈압 등...) 체크리스트애 있음을 안내
    if (
      CHECKLIST_ORDER_CANDIDATES.some((name) =>
        name.includes(orderName.toLowerCase()),
      )
    ) {
      setIsChecklistOrder(true)
      setOrderType('checklist')
      setNewOrderInput('')
      return
    }

    await createOrder(orderName, orderDescription ?? '')
  }

  const handleOrderTypeChange = (selectedValue: string) => {
    setOrderType(selectedValue)
    setIsChecklistOrder(false)
  }

  // checklist 오더가 더이상 없는 경우 manual로 바꾸기
  useEffect(() => {
    if (availableCheckListOrders.length === 0) {
      setOrderType('manual')
    }
  }, [availableCheckListOrders.length])

  return (
    <TableRow className="hover:bg-transparent">
      <TableCell className="p-0">
        <div className="relative flex w-full items-center">
          <Select onValueChange={handleOrderTypeChange} value={orderType}>
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
            <Select
              onValueChange={async (value) => await createOrder(value, '')}
            >
              <SelectTrigger className="h-11 w-full rounded-none border-0 border-r ring-0 focus-visible:ring-0">
                <SelectValue placeholder="체크리스트 항목 선택" />
              </SelectTrigger>

              <SelectContent>
                {availableCheckListOrders.map((order) => (
                  <SelectItem key={order} value={order}>
                    {order}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {orderType !== 'checklist' && (
            <Input
              className="h-11 rounded-none border-0 border-r focus-visible:ring-0"
              disabled={isSubmitting}
              placeholder="오더명$오더설명"
              value={isSubmitting ? '등록 중' : newOrderInput}
              onChange={(e) => setNewOrderInput(e.target.value)}
              onKeyDown={handleEnter}
              ref={(node) => {
                inputRef.current = node
                inputRef.current?.focus()
              }}
            />
          )}

          {isChecklistOrder && (
            <span className="absolute -bottom-5 right-3 text-xs text-destructive">
              해당 오더는 체크리스트에 존재합니다
            </span>
          )}
        </div>
      </TableCell>

      <UserKeyGuideMessage />
    </TableRow>
  )
}
