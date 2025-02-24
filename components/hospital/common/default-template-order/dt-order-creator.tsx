import OrderTypeColorDot from '@/components/hospital/common/order/order-type-color-dot'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import {
  CHECKLIST_ORDER_CANDIDATES,
  CHECKLIST_ORDERS,
  DEFAULT_ICU_ORDER_TYPE,
} from '@/constants/hospital/icu/chart/order'
import { upsertDefaultChartOrder } from '@/lib/services/admin/icu/default-orders'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import { type SelectedIcuOrder } from '@/types/icu/chart'
import { useParams, useRouter } from 'next/navigation'
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'

function getAvailableChecklistOrders(orders: SelectedIcuOrder[]) {
  const currentChecklistTypeOrderNames = orders
    .filter((order) => order.order_type === 'checklist')
    .map((order) => order.order_name)

  return CHECKLIST_ORDERS.filter(
    (order) => !currentChecklistTypeOrderNames.includes(order),
  )
}

type Props = {
  sortedOrders: SelectedIcuOrder[]
  setSortedOrders?: Dispatch<SetStateAction<SelectedIcuOrder[]>>
  isTemplate?: boolean
}

export default function DtOrderCreator({
  sortedOrders,
  setSortedOrders,
  isTemplate,
}: Props) {
  const { hos_id } = useParams()
  const { refresh } = useRouter()

  const {
    basicHosData: { orderColorsData },
  } = useBasicHosDataContext()

  const [newOrderInput, setNewOrderInput] = useState('')
  const [orderType, setOrderType] = useState('manual')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isChecklistOrder, setIsChecklistOrder] = useState(false)

  const availableCheckListOrders = getAvailableChecklistOrders(sortedOrders)

  const createOrder = async (orderName: string, orderDescription: string) => {
    setIsSubmitting(true)

    isTemplate
      ? setSortedOrders!((prev) => [
          ...prev,
          {
            order_name: orderName,
            order_type: orderType,
            order_times: Array(24).fill('0'),
            treatments: [],
            order_comment: orderDescription,
            is_bordered: false,
            id: prev.length + 1,
            order_id: `temp_order_id_${new Date().getTime()}`,
          },
        ])
      : await upsertDefaultChartOrder(hos_id as string, undefined, {
          default_chart_order_name: orderName.trim(),
          default_chart_order_comment: orderDescription
            ? orderDescription.trim()
            : '',
          default_chart_order_type: orderType,
        })

    !isTemplate &&
      toast({
        title: `${orderName} 오더를 생성하였습니다`,
      })

    setNewOrderInput('')
    setIsSubmitting(false)
    setIsChecklistOrder(false)
    refresh()
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

  const handleOrderTypeChange = async (selectedValue: string) => {
    setOrderType(selectedValue)
    setIsChecklistOrder(false)
  }

  useEffect(() => {
    if (availableCheckListOrders.length === 0) {
      setOrderType('manual')
    }
  }, [availableCheckListOrders.length])

  return (
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
        <Select onValueChange={async (value) => await createOrder(value, '')}>
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
        />
      )}

      {isChecklistOrder && (
        <span className="absolute -bottom-5 right-3 text-xs text-destructive">
          해당 오더는 체크리스트에 존재합니다
        </span>
      )}
    </div>
  )
}
