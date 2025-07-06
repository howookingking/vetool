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
import { toast } from '@/components/ui/use-toast'
import {
  CHECKLIST_ORDERS,
  DEFAULT_ICU_ORDER_TYPE,
  type OrderType,
} from '@/constants/hospital/icu/chart/order'
import { upsertDefaultChartOrder } from '@/lib/services/admin/icu/default-orders'
import { useBasicHosDataContext } from '@/providers/basic-hos-data-context-provider'
import type { SelectedIcuOrder } from '@/types/icu/chart'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import {
  type Dispatch,
  type FormEvent,
  type SetStateAction,
  useRef,
  useState,
} from 'react'
import ChecklistOrderCreator from '../../icu/main/chart/selected-chart/chart-body/table/chart-table-body/order-creator/checklist-order-creator'
import { OrderTypeLabel } from '../../icu/main/chart/selected-chart/chart-body/table/order/order-form-field'

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

  const inputRef = useRef<HTMLInputElement | null>(null)

  const [newOrderInput, setNewOrderInput] = useState('')
  const [orderType, setOrderType] = useState('manual')
  const [isCreating, setIsCreating] = useState(false)

  const availableCheckListOrders = getAvailableChecklistOrders(sortedOrders)

  const createOrder = async (orderName: string, orderDescription: string) => {
    setIsCreating(true)

    const emptyOrderTimes = Array(24).fill('0')

    isTemplate
      ? setSortedOrders!((prev) => [
          ...prev,
          {
            order_name: orderName,
            order_type: orderType as OrderType,
            order_times: emptyOrderTimes,
            treatments: [],
            order_comment: orderDescription,
            is_bordered: false,
            id: prev.length + 1,
            order_id: `temp_order_id_${new Date().getTime()}`,
          },
        ])
      : await upsertDefaultChartOrder(hos_id as string, undefined, undefined, {
          default_chart_order_name: orderName.trim(),
          default_chart_order_comment: orderDescription.trim()
            ? orderDescription.trim()
            : '',
          default_chart_order_type: orderType,
        })

    !isTemplate &&
      (toast({
        title: `${orderName} 오더를 생성하였습니다`,
      }),
      refresh()),
      setTimeout(() => {
        inputRef?.current?.focus()
      }, 100)

    setNewOrderInput('')
    setIsCreating(false)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!newOrderInput) return

    const [orderName, orderDescription] = newOrderInput.split('$')

    await createOrder(orderName, orderDescription ?? '')
  }

  const orderTypeLabel = OrderTypeLabel(orderType as OrderType)
  const OrderTypePlaceholder = `${orderTypeLabel.orderName}$${orderTypeLabel.orderComment}`

  return (
    <div className="relative flex w-full items-center">
      <Select onValueChange={setOrderType} value={orderType}>
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

      {orderType !== 'checklist' && (
        <form
          className="relative flex w-full items-center gap-2"
          onSubmit={handleSubmit}
        >
          <Input
            className="h-11 rounded-none border-0 focus-visible:ring-0"
            disabled={isCreating}
            placeholder={OrderTypePlaceholder}
            value={isCreating ? '등록 중' : newOrderInput}
            onChange={(e) => setNewOrderInput(e.target.value)}
            ref={inputRef}
          />
          <Button
            className="absolute right-2 2xl:hidden"
            size="icon"
            disabled={isCreating}
            type="submit"
            variant="ghost"
          >
            <Plus />
          </Button>
        </form>
      )}
    </div>
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
